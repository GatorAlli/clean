import {
  integer,
  pgTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const turfTable = pgTable("turfs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  about: text(),
  pricing: integer().notNull(),
});

export const turfImagesTable = pgTable("turf_images", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  turfId: integer()
    .notNull()
    .references(() => turfTable.id, { onDelete: "cascade" }),
  storagePath: text().notNull(),
  position: integer().notNull(),
});
