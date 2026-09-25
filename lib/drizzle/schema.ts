import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const turfTable = pgTable.withRLS("laundries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  about: text(),
  pricing: integer().notNull(),
});

export const turfImagesTable = pgTable.withRLS("laundry_images", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  turfId: integer()
    .notNull()
    .references(() => turfTable.id, { onDelete: "cascade" }),
  storagePath: text().notNull(),
  position: integer().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});
