import assert from "node:assert/strict";
import test from "node:test";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { advanceBooking } from "./booking-status";
import { bookings, laundries } from "./schema";
import { ORDER_STAGES } from "../order-lifecycle";

test("database enforces ownership, ordered transitions, cancellation and stale updates", {
  skip: process.env.CLEAN_DB_TEST !== "1",
}, async () => {
  const client = postgres(process.env.DATABASE_URL!, { max: 1, connect_timeout: 10 });
  const connection = drizzle({ client });
  const rollback = new Error("rollback test records");
  try {
    await assert.rejects(connection.transaction(async tx => {
      const owner = "lifecycle-test@example.com";
      const actor = "00000000-0000-4000-8000-000000000001";
      const [store] = await tx.insert(laundries).values({ name: "Lifecycle test", location: "Test", ownerEmail: owner, pricing: [] }).returning();
      const [booking] = await tx.insert(bookings).values({
        laundryId: store.id, laundryName: store.name, customerId: actor,
        customerEmail: "customer@example.com", customerName: "Test", items: [], totalAmount: 0,
        requestId: crypto.randomUUID(), statusHistory: [{ status: "pending", at: new Date().toISOString() }],
      }).returning();
      assert.equal(await advanceBooking(tx, booking.id, "someone-else@example.com", actor, "pending", "accepted"), undefined);
      assert.equal(await advanceBooking(tx, booking.id, owner, actor, "pending", "ready"), undefined);
      for (let i = 0; i < ORDER_STAGES.length - 1; i++) {
        assert.ok(await advanceBooking(tx, booking.id, owner, actor, ORDER_STAGES[i], ORDER_STAGES[i + 1]));
        assert.equal(await advanceBooking(tx, booking.id, owner, actor, ORDER_STAGES[i], ORDER_STAGES[i + 1]), undefined);
      }
      assert.equal(await advanceBooking(tx, booking.id, owner, actor, "delivered", "cancelled"), undefined);
      const [saved] = await tx.select().from(bookings).where(eq(bookings.id, booking.id));
      assert.equal(saved.status, "delivered");
      assert.deepEqual(saved.statusHistory.map(event => event.status), [...ORDER_STAGES]);
      assert.ok(saved.statusHistory.every(event => event.at));

      const [cancellable] = await tx.insert(bookings).values({
        laundryId: store.id, laundryName: store.name, customerId: actor,
        customerEmail: "customer@example.com", customerName: "Test", items: [], totalAmount: 0,
        requestId: crypto.randomUUID(), status: "processing",
      }).returning();
      assert.ok(await advanceBooking(tx, cancellable.id, owner, actor, "processing", "cancelled"));
      assert.equal(await advanceBooking(tx, cancellable.id, owner, actor, "cancelled", "ready"), undefined);
      throw rollback;
    }), error => error === rollback);
  } finally { await client.end(); }
});
