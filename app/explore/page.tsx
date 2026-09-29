import Card from "../components/card";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { asc, inArray } from "drizzle-orm";
import { laundries, laundryImages } from "@/lib/drizzle/schema";
import CleanNavbar from "../components/CleanNavbar";

export default async function PageBody() {
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
  // ------------------------------------

  const displayStores = [...stores];

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24">
      <CleanNavbar />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-10">
        {/* Page Title with exact logo font weight */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10 text-black font-bricolage">
          Laundry services
        </h1>

        {/* CSS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStores.map((e: any, index: number) => {
            const storagePath = firstImageByLaundry.get(e.id) ?? "";

            return (
              <Card
                key={index}
                name={e.name}
                location={e.location}
                about={e.about ?? ""}
                pricing={e.pricing as any}
                url={`/explore/${e.id}`}
                storagePath={storagePath}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
