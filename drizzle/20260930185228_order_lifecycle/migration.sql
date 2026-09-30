ALTER TABLE "bookings" ADD COLUMN "statusHistory" jsonb DEFAULT '[]' NOT NULL;--> statement-breakpoint
UPDATE "bookings" SET "status" = 'delivered' WHERE "status" = 'completed';--> statement-breakpoint
UPDATE "bookings" SET "statusHistory" =
  jsonb_build_array(jsonb_build_object('status', 'pending', 'at', "createdAt")) ||
  CASE WHEN "status" = 'pending' THEN '[]'::jsonb
       ELSE jsonb_build_array(jsonb_build_object('status', "status", 'at', NULL)) END;
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_status_check" CHECK ("status" in ('pending', 'accepted', 'collected', 'processing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'));
