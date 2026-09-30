import assert from "node:assert/strict";
import test from "node:test";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import { bookings, laundries } from "./schema";
import { getOwnerBookings } from "./customer-bookings";

test("owners see only their customers' current contact details, including profile edits", {
  skip: process.env.CLEAN_DB_TEST !== "1",
}, async () => {
  const client = postgres(process.env.DATABASE_URL!, { max: 1, connect_timeout: 10 });
  const connection = drizzle({ client });
  const rollback = new Error("rollback contact test");
  try {
    await assert.rejects(connection.transaction(async tx => {
      const customerId = crypto.randomUUID();
      const owner = `owner-${crypto.randomUUID()}@example.com`;
      await tx.execute(sql`insert into auth.users (id, email, raw_user_meta_data) values (${customerId}::uuid, ${`customer-${customerId}@example.com`}, ${JSON.stringify({ location: "Motijheel", auth_phone: "+8801712345678" })}::jsonb)`);
      const [store] = await tx.insert(laundries).values({ name: "Contact test", location: "Dhaka", ownerEmail: owner, pricing: [] }).returning();
      await tx.insert(bookings).values({ laundryId: store.id, laundryName: store.name, customerId, customerName: "Test", customerEmail: "test@example.com", items: [], totalAmount: 0, requestId: crypto.randomUUID() });
      const [first] = await getOwnerBookings(owner, store.id, tx);
      assert.equal(first.customerLocation, "Motijheel");
      assert.equal(first.customerPhone, "+8801712345678");
      assert.deepEqual(await getOwnerBookings("different-owner@example.com", store.id, tx), []);
      await tx.execute(sql`update auth.users set raw_user_meta_data = raw_user_meta_data || ${JSON.stringify({ street_address: "House 10, Road 2", locality: "Banani", auth_phone: "+8801812345678" })}::jsonb where id = ${customerId}::uuid`);
      const [updated] = await getOwnerBookings(owner, store.id, tx);
      assert.equal(updated.customerLocation, "House 10, Road 2, Banani, Dhaka");
      assert.equal(updated.customerPhone, "+8801812345678");
      throw rollback;
    }), error => error === rollback);
  } finally { await client.end(); }
});
