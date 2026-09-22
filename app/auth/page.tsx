import { supabase } from "@/lib/supabase/local";
import { AuthPageBody, ProfilePageBody } from "./PageBody";

export default async function Page() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <div>{session ? <ProfilePageBody /> : <AuthPageBody />}</div>;
}
