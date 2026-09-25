ALTER TABLE "laundries" ALTER COLUMN "pricing" SET DATA TYPE jsonb USING '[]'::jsonb;
