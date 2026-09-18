import EmailPass from "./emailpass";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
export default async function LoginSignUpPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
      <EmailPass />
    </div>
  );
}
