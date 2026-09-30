import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const databaseGlobal = globalThis as typeof globalThis & {
  laundryDatabaseClient?: ReturnType<typeof postgres>;
};

const client =
  databaseGlobal.laundryDatabaseClient ??
  postgres(process.env.DATABASE_URL!, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });

// Reuse the pool across requests and development hot reloads.
databaseGlobal.laundryDatabaseClient = client;

export const db = drizzle({ client });
