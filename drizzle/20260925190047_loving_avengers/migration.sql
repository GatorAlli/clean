CREATE TABLE "laundries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "laundries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"about" text,
	"pricing" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "laundry_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "laundry_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"turfId" integer NOT NULL,
	"storagePath" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "laundry_images" ADD CONSTRAINT "laundry_images_turfId_laundries_id_fkey" FOREIGN KEY ("turfId") REFERENCES "laundries"("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "laundries" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "laundry_images" ENABLE ROW LEVEL SECURITY;
