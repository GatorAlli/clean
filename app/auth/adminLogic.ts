"use server";

import { Pricing } from "./AdminPage";

import { generateServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzle/db";
import { laundries, laundryImages } from "@/lib/drizzle/schema";

export async function submitData({
  storeName,
  ownerEmail,
  location,
  about,
  prices,
  images,
}: {
  storeName: string;
  ownerEmail: string;
  location: string;
  about: string;
  prices: Pricing[];
  images: string[];
}) {
  const supabase = await generateServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== "www.joybangl@gmail.com") throw new Error("Access denied.");
  if (!Array.isArray(prices) || prices.some(item => !item || typeof item.apparelType !== "string" || !item.apparelType.trim() ||
    !Number.isSafeInteger(item.unitPrice) || item.unitPrice < 0) ||
    new Set(prices.map(item => item.apparelType.trim())).size !== prices.length) {
    throw new Error("Use unique apparel names and whole Taka prices.");
  }
  const [data] = await db
    .insert(laundries)
    .values({ name: storeName, ownerEmail, location, about, pricing: prices })
    .returning({ id: laundries.id });

  for (const [position, storagePath] of images.entries()) {
    await db.insert(laundryImages).values({
      laundryId: data.id,
      storagePath,
      position,
    });
  }
}
