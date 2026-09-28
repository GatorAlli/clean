import PageBody from "./PageBody";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { laundries, laundryImages } from "@/lib/drizzle/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { generateServerClient } from "@/lib/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ store_id: string }>;
}) {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });

  const { store_id } = await params;
  const laundryId = Number(store_id);

  if (!Number.isInteger(laundryId)) {
    notFound();
  }

  const result = await db
    .select()
    .from(laundries)
    .where(eq(laundries.id, laundryId));

  const store = result[0];

  if (!store) {
    notFound();
  }

  const imageRows = await db
    .select()
    .from(laundryImages)
    .where(eq(laundryImages.laundryId, store.id))
    .orderBy(asc(laundryImages.position));

  const supabase = await generateServerClient();
  const imageUrls = imageRows.map(
    ({ storagePath }) =>
      supabase.storage
        .from("laundry-images")
        .getPublicUrl(storagePath).data.publicUrl,
  );

  return (
    <div>
      <PageBody
        name={store.name}
        location={store.location}
        about={store.about ?? ""}
        prices={store.pricing}
        images={imageUrls}
      />
    </div>
  );
}
