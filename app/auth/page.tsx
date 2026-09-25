import { generateServerClient } from "@/lib/supabase/server";
import { AuthPageBody, ProfilePageBody } from "./PageBody";
import { AdminPage } from "./AdminPage";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export default async function Page() {
  // Supabase
  const supabase = await generateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // This selects the admin screen; protect admin data/actions with server-side authorization too.
  const isAdmin = user?.email === "www.joybangl@gmail.com";

  //Drizzle
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });

  return (
    <div>
      {isAdmin ? (
        <AdminPage />
      ) : user ? (
        <ProfilePageBody displayName={user.user_metadata.full_name} />
      ) : (
        <AuthPageBody />
      )}
    </div>
  );
}
