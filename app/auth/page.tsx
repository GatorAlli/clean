import { generateServerClient } from "@/lib/supabase/server";
import { AuthPageBody, ProfilePageBody } from "./PageBody";
import { AdminPage } from "./AdminPage";
import { db } from "@/lib/drizzle/db";
import { laundries, bookings } from "@/lib/drizzle/schema";
import { getContactDetails } from "@/lib/contact-details";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
  // Supabase
  const supabase = await generateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Site Admin Email Address
  const isAdmin = user?.email === "www.joybangl@gmail.com";

  if (user?.email) {
    // Store Fetching
    const [ownedStore] = await db
      .select()
      .from(laundries)
      .where(eq(laundries.ownerEmail, user.email.toLowerCase()));
    if (ownedStore) {
      redirect(`/auth/${ownedStore.id}`);
    }
  }

  const customerBookings = user ? await db.select().from(bookings)
    .where(eq(bookings.customerId, user.id)).orderBy(desc(bookings.createdAt)) : [];

  return (
    <div>
      {isAdmin ? (
        <AdminPage />
      ) : user ? (
        <ProfilePageBody contact={getContactDetails(user)} bookings={customerBookings} displayName={user.user_metadata.full_name} isLoggedIn={Boolean(user)} />
      ) : (
        <AuthPageBody isLoggedIn={Boolean(user)} />
      )}
    </div>
  );
}
