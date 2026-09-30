import Card from "../components/card";
import { db } from "@/lib/drizzle/db";
import { asc, inArray } from "drizzle-orm";
import { laundries, laundryImages } from "@/lib/drizzle/schema";
import CleanNavbar from "../components/CleanNavbar";
import { generateServerClient } from "@/lib/supabase/server";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};
export default async function PageBody({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const userRequest = generateServerClient().then((supabase) =>
    supabase.auth.getUser(),
  );
  const storesRequest = (async () => {
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
    return { stores, images };
  })();

  const [
    { data: { user } },
    { stores, images },
  ] = await Promise.all([userRequest, storesRequest]);

  const firstImageByLaundry = new Map<number, string>();

  for (const image of images) {
    if (!firstImageByLaundry.has(image.laundryId)) {
      firstImageByLaundry.set(image.laundryId, image.storagePath);
    }
  }

  const normalisedQuery = q.trim().toLowerCase();

  const displayStores = stores.filter((e) => {
    const nameMatches = e.name.toLowerCase().includes(normalisedQuery);
    const locationMatches = e.location.toLowerCase().includes(normalisedQuery);
    return !normalisedQuery || nameMatches || locationMatches;
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24">
      <CleanNavbar isLoggedIn={Boolean(user)} />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-10">
        {/* Page Title */}
        <h1 className="my-15 text-4xl md:text-5xl font-bold tracking-tight mb-10 text-black font-bricolage">
          Laundry services
        </h1>

        {/* CSS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStores.map((e, index: number) => {
            const storagePath = firstImageByLaundry.get(e.id) ?? "";

            return (
              <Card
                key={index}
                name={e.name}
                location={e.location}
                about={e.about ?? ""}
                pricing={e.pricing}
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
