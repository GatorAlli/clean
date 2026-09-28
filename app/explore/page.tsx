import Card from "../components/card";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { asc, inArray } from "drizzle-orm";

import { laundries, laundryImages } from "@/lib/drizzle/schema";

export default async function PageBody() {
  //Drizzle
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });
  const stores = await db.select().from(laundries);
  const images = stores.length
    ? await db
        .select()
        .from(laundryImages)
        .where(
          inArray(
            laundryImages.laundryId,
            stores.map((e) => e.id),
          ),
        )
        .orderBy(asc(laundryImages.position))
    : [];

  const firstImageByLaundry = new Map<number, string>();

  for (const image of images) {
    if (!firstImageByLaundry.has(image.laundryId)) {
      firstImageByLaundry.set(image.laundryId, image.storagePath);
    }
  }
  return (
    <div>
      {stores.map((e, index) => (
        <Card
          key={index}
          name={e.name}
          location={e.location}
          about={e.about ?? ""}
          pricing={e.pricing}
          url={`/explore/${e.id}`}
          storagePath={firstImageByLaundry.get(e.id) ?? ""}
        />
      ))}
    </div>
  );
}
