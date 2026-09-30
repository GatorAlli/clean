"use server";

import { db } from "@/lib/drizzle/db";
import { bookings, laundries, type BookingItem } from "@/lib/drizzle/schema";
import { generateServerClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { buildBookingItems, type ItemService } from "@/lib/booking-services";
import { calculateOrderTotal } from "@/lib/order-pricing";
import { validateBookingPayment, type BookingPayment } from "@/lib/booking-payment";

type BookingInput = {
  laundryId: number;
  quantities: Record<string, number>;
  requestId: string;
  services: Record<string, ItemService[]>;
  payment: BookingPayment;
};

export async function createBooking(input: BookingInput) {
  try {
    const payment = validateBookingPayment(input?.payment);
    if (!payment) return { ok: false as const, message: "Enter your name, a valid phone number and a transaction ID before booking." };
    const supabase = await generateServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user?.email) {
      return {
        ok: false as const,
        message: "Please sign in before booking.",
        signInRequired: true,
      };
    }
    if (
      !input ||
      !Number.isSafeInteger(input.laundryId) ||
      input.laundryId <= 0 ||
      typeof input.requestId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        input.requestId,
      ) ||
      !input.quantities ||
      typeof input.quantities !== "object" ||
      Array.isArray(input.quantities) ||
      !input.services ||
      typeof input.services !== "object" ||
      Array.isArray(input.services)
    ) {
      return { ok: false as const, message: "Invalid booking details." };
    }
    const findExisting = async () => {
      const [booking] = await db
        .select({ id: bookings.id })
        .from(bookings)
        .where(
          and(
            eq(bookings.requestId, input.requestId),
            eq(bookings.customerId, user.id),
            eq(bookings.laundryId, input.laundryId),
          ),
        )
        .limit(1);
      return booking;
    };
    let booking = await findExisting();
    if (!booking) {
      const [store] = await db
        .select()
        .from(laundries)
        .where(eq(laundries.id, input.laundryId))
        .limit(1);
      if (!store) return { ok: false as const, message: "Laundry not found." };
      const entries = Object.entries(input.quantities);
      if (
        entries.length > 50 ||
        entries.some(
          ([apparelType, quantity]) =>
            !Number.isSafeInteger(quantity) ||
            quantity < 0 ||
            quantity > 1000 ||
            store.pricing.filter((p) => p.apparelType === apparelType)
              .length !== 1,
        )
      ) {
        return {
          ok: false as const,
          message: "Check your selected items and quantities.",
        };
      }
      let items: BookingItem[];
      try {
        items = buildBookingItems(store.pricing, input.quantities, input.services);
      } catch {
        return { ok: false as const, message: "Choose washing, ironing or both for every selected item." };
      }
      let pricing;
      try {
        if (!items.length) throw new Error("No items selected.");
        pricing = calculateOrderTotal(items);
      } catch {
        return {
          ok: false as const,
          message: "Select items with valid whole Taka prices.",
        };
      }
      const { totalAmount, deliveryCharge } = pricing;
      const [inserted] = await db
        .insert(bookings)
        .values({
          laundryId: store.id,
          laundryName: store.name,
          customerId: user.id,
          customerName: payment.customerName,
          customerEmail: user.email,
          bookingPhone: payment.phone,
          transactionId: payment.transactionId,
          items,
          totalAmount,
          deliveryCharge,
          requestId: input.requestId,
          statusHistory: [{ status: "pending", at: new Date().toISOString(), actorId: user.id }],
        })
        .onConflictDoNothing({ target: bookings.requestId })
        .returning({ id: bookings.id });
      booking = inserted ?? (await findExisting());
    }
    if (!booking)
      return { ok: false as const, message: "Please start a new booking." };
    revalidatePath("/auth");
    revalidatePath("/orders");
    revalidatePath(`/auth/${input.laundryId}`);
    return { ok: true as const, bookingId: booking.id };
  } catch (error) {
    const cause = (error as { cause?: { code?: string; constraint_name?: string } }).cause ?? error as { code?: string; constraint_name?: string };
    if (cause.code === "23505" && ["bookings_transactionId_unique", "bookings_transactionId_key"].includes(cause.constraint_name ?? "")) {
      return { ok: false as const, message: "This transaction ID has already been used for an order." };
    }
    console.error("Booking creation failed:", error);
    return {
      ok: false as const,
      message: "Could not save your booking. Please retry.",
    };
  }
}
