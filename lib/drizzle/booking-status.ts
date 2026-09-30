import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "./db";
import { bookings, laundries } from "./schema";
import { canTransition, type BookingStatus } from "../order-lifecycle";

// Called only after authenticating the owner. Accepting a DB also permits rollback tests.
export async function advanceBooking(
  connection: Pick<typeof db, "update" | "select">,
  bookingId: number,
  ownerEmail: string,
  actorId: string,
  expectedStatus: BookingStatus,
  status: BookingStatus,
) {
  if (!canTransition(expectedStatus, status)) return undefined;
  const event = { status, at: new Date().toISOString(), actorId };
  const [updated] = await connection.update(bookings).set({
    status,
    statusHistory: sql`${bookings.statusHistory} || ${JSON.stringify([event])}::jsonb`,
  }).where(and(
    eq(bookings.id, bookingId),
    eq(bookings.status, expectedStatus),
    inArray(bookings.laundryId, connection.select({ id: laundries.id }).from(laundries)
      .where(eq(laundries.ownerEmail, ownerEmail.toLowerCase()))),
  )).returning({ laundryId: bookings.laundryId });
  return updated;
}
