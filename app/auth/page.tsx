import { generateServerClient } from "@/lib/supabase/server";
import { AuthPageBody, ProfilePageBody } from "./PageBody";

export default async function Page() {
  const supabase = await generateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <div>{user ? <ProfilePageBody /> : <AuthPageBody />}</div>;
}
