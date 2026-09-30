CREATE TABLE "bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"laundryId" integer NOT NULL,
	"customerId" uuid NOT NULL,
	"customerName" text NOT NULL,
	"customerEmail" text NOT NULL,
	"laundryName" text NOT NULL,
	"items" jsonb NOT NULL,
	"totalAmount" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"requestId" uuid NOT NULL UNIQUE,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_laundryId_laundries_id_fkey" FOREIGN KEY ("laundryId") REFERENCES "laundries"("id") ON DELETE RESTRICT;