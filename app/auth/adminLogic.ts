"use server";

import { Pricing } from "./AdminPage";

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
