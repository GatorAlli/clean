import PageBody from "./PageBody";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { laundries } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: Promise<{ store_id: string }>;
}) {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });

  const { store_id } = await params;

  const result = await db
    .select()
    .from(laundries)
    .where(eq(laundries.id, Number(store_id)));

  const data = result[0];

  return (
    <div>
      <PageBody
        name={data.name}
        location={data.location}
        about={data.about ?? ""}
        prices={data.pricing}
      />
    </div>
  );
}
