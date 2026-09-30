"use server";

import { revalidatePath } from "next/cache";
import { generateServerClient } from "@/lib/supabase/server";
import { formatContactAddress, validateContact } from "@/lib/contact-details";

export async function saveContactDetails(streetAddress: string, locality: string, phone: string) {
  const contact = validateContact(streetAddress, locality, phone);
  if (!contact) return { ok: false as const, message: "Enter your street address, locality and a valid phone number." };
  try {
    const supabase = await generateServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return { ok: false as const, message: "Please sign in again." };
    const { error: updateError } = await supabase.auth.updateUser({ data: {
      street_address: contact.streetAddress, locality: contact.locality,
      location: formatContactAddress(contact), auth_phone: contact.phone,
    } });
    if (updateError) return { ok: false as const, message: "Could not save your contact details. Please retry." };
    revalidatePath("/auth");
    revalidatePath("/auth/[owner_page]", "page");
    return { ok: true as const, message: "Contact details saved.", contact };
  } catch {
    return { ok: false as const, message: "Could not save your contact details. Please retry." };
  }
}
