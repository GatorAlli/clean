ALTER TABLE "bookings" ADD COLUMN "deliveryCharge" integer DEFAULT 100 NOT NULL;--> statement-breakpoint
UPDATE "bookings" SET "totalAmount" = COALESCE(
  (SELECT SUM((item->>'quantity')::bigint * (item->>'unitPrice')::bigint)
   FROM jsonb_array_elements("bookings"."items") AS item), 0
) + "deliveryCharge";--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_delivery_charge_check" CHECK ("deliveryCharge" = 100);
