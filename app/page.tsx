import CleanNavbar from "@/app/components/CleanNavbar";
import Card from "@/app/components/card";
import { db } from "@/lib/drizzle/db";
import { laundries, laundryImages } from "@/lib/drizzle/schema";
import { generateServerClient } from "@/lib/supabase/server";
import { asc, inArray } from "drizzle-orm";

export default async function Home() {
  const userRequest = generateServerClient().then(client => client.auth.getUser());
  const storesRequest = (async () => {
    const stores = await db.select({
      id: laundries.id,
      name: laundries.name,
      location: laundries.location,
      about: laundries.about,
      pricing: laundries.pricing,
    }).from(laundries).orderBy(asc(laundries.id));
    const images = stores.length ? await db.select({
      laundryId: laundryImages.laundryId,
      storagePath: laundryImages.storagePath,
    }).from(laundryImages).where(inArray(laundryImages.laundryId, stores.map(store => store.id)))
      .orderBy(asc(laundryImages.position), asc(laundryImages.id)) : [];
    return { stores, images };
  })();
  const [{ data: { user } }, { stores, images }] = await Promise.all([userRequest, storesRequest]);
  const firstImageByLaundry = new Map<number, string>();
  for (const image of images) {
    if (!firstImageByLaundry.has(image.laundryId)) {
      firstImageByLaundry.set(image.laundryId, image.storagePath);
    }
  }

  return (
    <div className="bg-[#0D0D0D]">
      <div className="relative min-h-screen w-full flex flex-col overflow-x-clip">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center z-0" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent z-0" />

        <CleanNavbar isLoggedIn={Boolean(user)} />

        {/* Hero Content (Flexbox prevents overlap/floating issues) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-20">
          <h1 className="text-white font-bricolage font-extrabold text-[50px] md:text-[100px] lg:text-[140px] leading-[0.9] tracking-tight mb-8">
            CLEAN CLOTHES <br />
            START HERE<span className="text-[#ff206e]">.</span>
          </h1>
          <div className="h-[2px] w-full max-w-md bg-[#white] mb-8"></div>
          <p
            className="text-gray-300 font-medium text-lg md:text-2xl max-w-2xl leading-snug"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Find laundries nearby, compare services, and{" "}
            <br className="hidden md:block" />
            get your clothes cleaned without the hassle.
          </p>
        </div>
      </div>

      {/* Laundry Services Marquee */}
      <div className="bg-[#0D0D0D] w-full pb-20 pl-6 md:pl-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight font-bricolage">
          Laundry services
        </h2>

        {stores.length === 0 ? (
          <p className="text-gray-400">No laundry services are available yet.</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-10 pr-6 md:pr-12">
            {stores.map(store => (
              <div key={store.id} className="flex-none w-[300px] md:w-[400px]">
                <Card
                  name={store.name}
                  location={store.location}
                  about={store.about ?? ""}
                  pricing={store.pricing}
                  url={`/explore/${store.id}`}
                  storagePath={firstImageByLaundry.get(store.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
