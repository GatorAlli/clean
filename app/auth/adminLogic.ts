"use server";

import { Pricing } from "./AdminPage";

import { drizzle } from "drizzle-orm/postgres-js";
import { laundries } from "@/lib/drizzle/schema";
import postgres from "postgres";

export async function submitData({
  storeName,
  location,
  about,
  prices,
}: {
  storeName: string;
  location: string;
  about: string;
  prices: Pricing[];
}) {
  //Drizzle
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });

  await db
    .insert(laundries)
    .values({ name: storeName, location, about, pricing: prices });
}
