"use client";

import { useState, useTransition } from "react";
import { saveContactDetails } from "@/app/auth/contactActions";
import type { ContactDetails } from "@/lib/contact-details";

export default function ProfileContactForm({ contact }: { contact: ContactDetails }) {
  const [streetAddress, setStreetAddress] = useState(contact.streetAddress);
  const [locality, setLocality] = useState(contact.locality);
  const [legacyLocation, setLegacyLocation] = useState(contact.legacyLocation);
  const [phone, setPhone] = useState(contact.phone);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  return <section className="space-y-4 rounded-2xl border border-gray-200 p-6">
    <h2 className="text-2xl font-bold">My contact details</h2>
    <p className="text-sm text-gray-500">You can change these anytime. Laundries handling your bookings can see your current address and phone number. All addresses are in Dhaka.</p>
    {legacyLocation && <p className="text-sm text-gray-500">Previous location: {legacyLocation}. Add your street address and locality below.</p>}
    <form onSubmit={event => {
      event.preventDefault();
      setMessage("");
      startTransition(async () => {
        const result = await saveContactDetails(streetAddress, locality, phone);
        setMessage(result.message);
        if (result.ok) { setStreetAddress(result.contact.streetAddress); setLocality(result.contact.locality); setPhone(result.contact.phone); setLegacyLocation(undefined); }
      });
    }} className="space-y-4">
      <fieldset disabled={pending} className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">Street Address
          <textarea aria-label="My street address" autoComplete="street-address" required maxLength={500} value={streetAddress}
            onChange={event => setStreetAddress(event.target.value)} placeholder="Building, floor, house and road number"
            className="block min-h-24 w-full rounded-lg border border-gray-300 p-3" />
        </label>
        <label className="space-y-2 text-sm font-medium">Locality
          <input aria-label="My locality" autoComplete="address-level3" required maxLength={100} value={locality}
            onChange={event => setLocality(event.target.value)} placeholder="e.g. Gulshan, Banani"
            className="block w-full rounded-lg border border-gray-300 p-3" />
        </label>
        <label className="space-y-2 text-sm font-medium">Phone number
          <input aria-label="My phone number" autoComplete="tel" required type="tel" value={phone}
            onChange={event => setPhone(event.target.value)} placeholder="01XXXXXXXXX"
            className="block w-full rounded-lg border border-gray-300 p-3" />
        </label>
      </fieldset>
      <button disabled={pending} type="submit" className="rounded-xl bg-[#ff206e] px-5 py-3 font-bold text-white disabled:opacity-50">{pending ? "Saving…" : "Save contact details"}</button>
      <p role="status" className="text-sm text-gray-600">{message}</p>
    </form>
  </section>;
}
