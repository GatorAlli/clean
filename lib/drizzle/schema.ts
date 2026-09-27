import {
  integer,
  pgTable,
  primaryKey,
  jsonb,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const laundries = pgTable.withRLS("laundries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
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
