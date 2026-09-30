import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { bookings } from "@/lib/drizzle/schema";
import { generateServerClient } from "@/lib/supabase/server";
import CleanNavbar from "@/app/components/CleanNavbar";
import BookingList from "@/app/components/BookingList";

export default async function OrdersPage() {
  const supabase = await generateServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");
  const rows = await db.select().from(bookings).where(eq(bookings.customerId, user.id)).orderBy(desc(bookings.createdAt));
  return <div className="min-h-screen bg-white text-black">
    <CleanNavbar isLoggedIn />
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold">My bookings</h1>
      <BookingList bookings={rows} />
    </main>
  </div>;
}
