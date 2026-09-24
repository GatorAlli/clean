import { generateServerClient } from "@/lib/supabase/server";
import { AuthPageBody, ProfilePageBody } from "./PageBody";
import { AdminPage } from "./AdminPage";

export default async function Page() {
  const supabase = await generateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // This selects the admin screen; protect admin data/actions with server-side authorization too.
  const isAdmin = user?.email === "www.joybangl@gmail.com";

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
