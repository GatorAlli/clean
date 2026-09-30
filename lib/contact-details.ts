export type ContactDetails = { streetAddress: string; locality: string; phone: string; legacyLocation?: string };

export function formatContactAddress(contact: Pick<ContactDetails, "streetAddress" | "locality">) {
  return `${contact.streetAddress.trim()}, ${contact.locality.trim()}, Dhaka`;
}

export function normalizeContactPhone(value: unknown): string | null {
  if (typeof value !== "string" || !/^\+?[\d\s()-]+$/.test(value.trim())) return null;
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");
  if (/^01[3-9]\d{8}$/.test(digits)) return `+880${digits.slice(1)}`;
  if (/^8801[3-9]\d{8}$/.test(digits)) return `+${digits}`;
  return phone.startsWith("+") && /^[1-9]\d{7,14}$/.test(digits) ? `+${digits}` : null;
}

export function validateContact(streetAddress: unknown, locality: unknown, phone: unknown): ContactDetails | null {
  const normalizedPhone = normalizeContactPhone(phone);
  if (typeof streetAddress !== "string" || !streetAddress.trim() || streetAddress.trim().length > 500 ||
    typeof locality !== "string" || !locality.trim() || locality.trim().length > 100 || !normalizedPhone) return null;
  return { streetAddress: streetAddress.trim(), locality: locality.trim(), phone: normalizedPhone };
}

export function getContactDetails(user: { user_metadata: Record<string, unknown>; phone?: string }): ContactDetails {
  const streetAddress = typeof user.user_metadata.street_address === "string" ? user.user_metadata.street_address : "";
  const locality = typeof user.user_metadata.locality === "string" ? user.user_metadata.locality : "";
  const legacyLocation = !streetAddress && !locality && typeof user.user_metadata.location === "string" ? user.user_metadata.location : undefined;
  return {
    streetAddress,
    locality,
    ...(legacyLocation ? { legacyLocation } : {}),
    phone: normalizeContactPhone(user.user_metadata.auth_phone) ?? normalizeContactPhone(user.phone) ?? "",
  };
}
