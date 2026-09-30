ALTER TABLE "bookings" ADD COLUMN "bookingPhone" varchar(20);--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "transactionId" varchar(100);--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_transactionId_key" UNIQUE("transactionId");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_transaction_id_check" CHECK ("transactionId" is null or "transactionId" ~ '^[A-Z0-9_-]{1,100}$');