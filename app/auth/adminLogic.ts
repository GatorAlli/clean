"use server";

import { Pricing } from "./AdminPage";

import { drizzle } from "drizzle-orm/postgres-js";
import { laundries, laundryImages } from "@/lib/drizzle/schema";
import postgres from "postgres";

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
  //Drizzle
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });

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
