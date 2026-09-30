import type { ItemService } from "@/lib/booking-services";
import type { BookingStatus, StatusEvent } from "@/lib/order-lifecycle";
import { sql } from "drizzle-orm";
import { DELIVERY_CHARGE } from "@/lib/order-pricing";
import {
  check,
  integer,
  pgTable,
  jsonb,
  uuid,
  timestamp,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const laundries = pgTable.withRLS("laundries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ownerEmail: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  location: text().notNull(),
  about: text(),
  pricing: jsonb()
    .$type<{ apparelType: string; unitPrice: number }[]>()
    .notNull(),
});

export const laundryImages = pgTable.withRLS("laundry_images", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  laundryId: integer()
    .notNull()
    .references(() => laundries.id, { onDelete: "cascade" }),
  storagePath: text().notNull(),
  position: integer().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export type BookingItem = {
  apparelType: string;
  quantity: number;
  unitPrice: number; // Whole Taka
  services?: ItemService[]; // Optional for bookings made before service selection.
};

export const bookings = pgTable.withRLS("bookings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  laundryId: integer()
    .notNull()
    .references(() => laundries.id, { onDelete: "restrict" }),

  customerId: uuid().notNull(),
  customerName: text().notNull(),
  customerEmail: text().notNull(),
  bookingPhone: varchar({ length: 20 }),
  transactionId: varchar({ length: 100 }).unique(),

  laundryName: text().notNull(),
  items: jsonb().$type<BookingItem[]>().notNull(),

  totalAmount: integer().notNull(),
  deliveryCharge: integer().notNull().default(DELIVERY_CHARGE),
  status: text().$type<BookingStatus>().notNull().default("pending"),
  statusHistory: jsonb().$type<StatusEvent[]>().notNull().default([]),

  requestId: uuid().notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  check("bookings_status_check", sql`${table.status} in ('pending', 'accepted', 'collected', 'processing', 'ready', 'out_for_delivery', 'delivered', 'cancelled')`),
  check("bookings_delivery_charge_check", sql`${table.deliveryCharge} = 100`),
  check("bookings_transaction_id_check", sql`${table.transactionId} is null or ${table.transactionId} ~ '^[A-Z0-9_-]{1,100}$'`),
]);

export type Booking = typeof bookings.$inferSelect;
export type OwnerBooking = Booking & { customerLocation?: string | null; customerPhone?: string | null };
