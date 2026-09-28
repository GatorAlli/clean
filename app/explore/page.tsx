import Card from "../components/card";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { asc, inArray } from "drizzle-orm";
import { laundries, laundryImages } from "@/lib/drizzle/schema";
import Link from "next/link";

export default async function PageBody() {
  // --- YOUR UNTOUCHED BACKEND LOGIC ---
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

  // --- MOCK DATA INJECTION ---
  const MOCK_STORES = [
    { id: 901, name: "Uttara Arena", location: "Sector 7, Uttara, Dhaka", about: "", pricing: [{ apparelType: "Standard", unitPrice: "2,400" }] },
    { id: 902, name: "Gulshan Kick Yard", location: "Road 41, Gulshan 2, Dhaka", about: "", pricing: [{ apparelType: "Standard", unitPrice: "3,000" }] },
    { id: 903, name: "Bashundhara Grand Turf", location: "Block D, Bashundhara R/A, Dhaka", about: "", pricing: [{ apparelType: "Standard", unitPrice: "4,200" }] },
    { id: 904, name: "Banani Super Clean", location: "Road 11, Banani, Dhaka", about: "", pricing: [{ apparelType: "Standard", unitPrice: "1,500" }] },
    { id: 905, name: "Dhanmondi Wash", location: "Satmasjid Road, Dhanmondi, Dhaka", about: "", pricing: [{ apparelType: "Standard", unitPrice: "2,000" }] },
  ];

  const displayStores = [...stores, ...MOCK_STORES];

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24">
      
      {/* Light Glassy Navbar */}
      <header className="sticky top-0 z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-white/70 backdrop-blur-lg border-b border-gray-200">
        {/* Logo exactly matching your snippet classes (with text-black for the white background) */}
        <Link
          href="/"
          className="text-2xl text-black font-bold hover:text-[#ff206e] transition-all duration-500 font-bricolage"
        >
          clean
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          <Link 
            href="/"
            className="border border-gray-300 text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-100 transition hidden sm:block"
          >
            ← Back
          </Link>
          <Link 
            href="/orders"
            className="text-black font-bold text-sm hover:text-[#ff206e] transition-colors"
          >
            Current Orders
          </Link>
          
          {/* Active Services Indicator */}
          <div className="hidden md:block relative cursor-default pb-1">
            <span className="text-black font-bold text-sm">Services</span>
            <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#ff206e] rounded-full"></span>
          </div>
        </div>
      </header>

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