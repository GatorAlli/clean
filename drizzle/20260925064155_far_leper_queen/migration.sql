CREATE TABLE "turf_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "turf_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"turfId" integer NOT NULL,
	"storagePath" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "turfs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "turfs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"about" text,
	"pricing" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"full_name" text,
	"phone" varchar(256)
);
--> statement-breakpoint
ALTER TABLE "turf_images" ADD CONSTRAINT "turf_images_turfId_turfs_id_fkey" FOREIGN KEY ("turfId") REFERENCES "turfs"("id") ON DELETE CASCADE;