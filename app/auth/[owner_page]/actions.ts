"use server";

import { laundries } from "@/lib/drizzle/schema";
import { generateServerClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";
import { advanceBooking } from "@/lib/drizzle/booking-status";
import { canTransition, isBookingStatus, statusLabel, type BookingStatus } from "@/lib/order-lifecycle";
import { drizzle } from "drizzle-orm/postgres-js";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { db as sharedDb } from "@/lib/drizzle/db";

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
        !Number.isSafeInteger(item.unitPrice) ||
        item.unitPrice < 0,
    ) ||
    new Set(changes.pricing.map(item => item.apparelType.trim())).size !== changes.pricing.length
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


export async function updateBookingStatus(
  bookingId: number,
  status: BookingStatus,
  expectedStatus: BookingStatus,
) {
  if (!Number.isSafeInteger(bookingId) || bookingId <= 0 ||
    !isBookingStatus(status) || !isBookingStatus(expectedStatus) || !canTransition(expectedStatus, status)) {
    return { ok: false as const, message: "Invalid order update." };
  }

  try {
    const supabase = await generateServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user?.email) {
      return { ok: false as const, message: "Please sign in again." };
    }

    const updated = await advanceBooking(sharedDb, bookingId, user.email, user.id, expectedStatus, status);

    if (!updated) {
      return { ok: false as const, message: "Order changed or access denied. Refresh and try again." };
    }

    revalidatePath(`/auth/${updated.laundryId}`);
    revalidatePath("/auth");
    revalidatePath("/orders");
    return { ok: true as const, message: `Order marked ${statusLabel(status).toLowerCase()}.` };
  } catch (error) {
    console.error("Order status update failed:", error);
    return { ok: false as const, message: "Could not update the order. Please retry." };
  }
}
