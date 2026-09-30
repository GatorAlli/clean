import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "./db";
import { bookings, laundries } from "./schema";

// Select only contact fields, and only for customers who booked this owner's laundry.
export function getOwnerBookings(ownerEmail: string, laundryId: number, connection: Pick<typeof db, "select"> = db) {
  return connection.select({
    ...getTableColumns(bookings),
    customerLocation: sql<string | null>`(select case
      when nullif(trim(u.raw_user_meta_data->>'street_address'), '') is not null
        and nullif(trim(u.raw_user_meta_data->>'locality'), '') is not null
      then concat_ws(', ', trim(u.raw_user_meta_data->>'street_address'), trim(u.raw_user_meta_data->>'locality'), 'Dhaka')
      else nullif(u.raw_user_meta_data->>'location', '') end
      from auth.users u where u.id = ${bookings.customerId})`,
    customerPhone: sql<string | null>`(select coalesce(nullif(u.raw_user_meta_data->>'auth_phone', ''), nullif(u.phone, '')) from auth.users u where u.id = ${bookings.customerId})`,
  }).from(bookings).innerJoin(laundries, eq(laundries.id, bookings.laundryId))
    .where(and(eq(laundries.id, laundryId), eq(laundries.ownerEmail, ownerEmail.toLowerCase())))
    .orderBy(desc(bookings.createdAt));
}
