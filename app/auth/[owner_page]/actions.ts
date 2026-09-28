"use server";

import { laundries } from "@/lib/drizzle/schema";
import { generateServerClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { revalidatePath } from "next/cache";
import postgres from "postgres";

type StoreChanges = {
  id: number;
  name: string;
  location: string;
  about: string;
  pricing: { apparelType: string; unitPrice: number }[];
};

export async function updateStore(changes: StoreChanges) {
  const supabase = await generateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, message: "Please sign in again." };
  }

  if (
    !changes ||
    !Number.isSafeInteger(changes.id) ||
    changes.id <= 0 ||
    typeof changes.name !== "string" ||
    typeof changes.location !== "string" ||
    typeof changes.about !== "string" ||
    !Array.isArray(changes.pricing)
  ) {
    return { ok: false, message: "Check the store details and prices." };
  }

  const name = changes.name.trim();
  const location = changes.location.trim();
  const about = changes.about.trim();

  if (
    !name ||
    name.length > 255 ||
    !location ||
    changes.pricing.some(
      (item) =>
        !item ||
        typeof item.apparelType !== "string" ||
        !item.apparelType.trim() ||
        typeof item.unitPrice !== "number" ||
        !Number.isFinite(item.unitPrice) ||
        item.unitPrice < 0,
    )
  ) {
    return { ok: false, message: "Check the store details and prices." };
  }

  const client = postgres(process.env.DATABASE_URL!);

  try {
    const db = drizzle({ client });
    const [updated] = await db
      .update(laundries)
      .set({ name, location, about, pricing: changes.pricing })
      .where(
        and(
          eq(laundries.id, changes.id),
          eq(laundries.ownerEmail, user.email.toLowerCase()),
        ),
      )
      .returning({
        id: laundries.id,
        name: laundries.name,
        location: laundries.location,
        about: laundries.about,
        pricing: laundries.pricing,
      });

    if (!updated) {
      return { ok: false, message: "Store not found or access denied." };
    }

    revalidatePath(`/auth/${updated.id}`);
    return { ok: true, message: "Changes saved.", store: updated };
  } finally {
    await client.end();
  }
}
