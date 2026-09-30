"use client";

import { submitData } from "./adminLogic";
import { supabase } from "@/lib/supabase/browser";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CleanNavbar from "@/app/components/CleanNavbar";

export type Pricing = { apparelType: string; unitPrice: number };
type PricingDraft = { apparelType: string; unitPrice: string };

export function AdminPage() {
  const router = useRouter();
  const inputStyling = "h-12 rounded-xl border-gray-200 bg-gray-50 px-4 text-black placeholder:text-gray-400 focus-visible:border-[#ff206e] focus-visible:ring-[#ff206e]/20";
  const [laundryName, setLaundryName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [images, setImages] = useState<(File | null)[]>([null]);
  const [pricing, setPricing] = useState<PricingDraft[]>([
    { apparelType: "", unitPrice: "" },
  ]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(
      "Selected images:",
      images.map((file) => file?.name),
    );

    const imagePaths: string[] = [];

    for (const file of images) {
      if (!file) {
        continue;
      }

      const path = `laundries/${crypto.randomUUID()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("laundry-images")
        .upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
      if (error) {
        console.error("Upload failed:", error);
        return;
      }

      console.log("Uploaded to:", data.path);
      imagePaths.push(data.path);
    }

    await submitData({
      storeName: laundryName,
      ownerEmail,
      location,
      about,
      prices: pricing.map(({ apparelType, unitPrice }) => ({
        apparelType,
        unitPrice: Number(unitPrice),
      })),
      images: imagePaths,
    });
  }

  return (
    <div className="min-h-screen bg-white pb-24 text-black">
      <CleanNavbar isLoggedIn />
      <main className="mx-auto max-w-7xl px-6 pt-12 md:px-12">
        <header className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff206e]">Site management</p>
            <h1 className="font-bricolage text-4xl font-extrabold tracking-tight md:text-5xl">Site Admin Page</h1>
            <p className="mt-3 text-lg text-gray-500">Add a laundry and introduce its services to your customers.</p>
          </div>
          <Button type="button" onClick={() => { supabase.auth.signOut().then(() => router.refresh()); }}
            variant="outline" className="h-12 rounded-xl border-gray-200 px-6 font-bold text-black hover:bg-gray-50">
            Sign Out
          </Button>
        </header>

        <form onSubmit={handleSubmit} className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,450px)]">
          <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-8">
            <div className="border-b border-gray-100 pb-5">
              <h2 className="font-bricolage text-2xl font-bold">Add a Laundry</h2>
              <p className="mt-2 text-sm text-gray-500">Start with the store and owner details.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="laundry-name" className="font-semibold">Laundry Name</Label>
              <Input id="laundry-name" className={inputStyling} value={laundryName} onChange={event => setLaundryName(event.target.value)} placeholder="Store name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-email" className="font-semibold">Owner&apos;s Email</Label>
              <Input id="owner-email" className={inputStyling} value={ownerEmail} onChange={event => setOwnerEmail(event.target.value)} placeholder="owner@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laundry-location" className="font-semibold">Location (Area)</Label>
              <Input id="laundry-location" className={inputStyling} value={location} onChange={event => setLocation(event.target.value)} placeholder="Area and address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laundry-about" className="font-semibold">About</Label>
              <textarea id="laundry-about" className="min-h-48 w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff206e]/20" value={about} onChange={event => setAbout(event.target.value)} placeholder="Tell customers about this laundry and its services…" />
            </div>
          </section>

          <div className="min-w-0 space-y-8">
            <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-8">
              <div className="border-b border-gray-100 pb-5">
                <h2 className="font-bricolage text-2xl font-bold">Service Pricing</h2>
                <p className="mt-2 text-sm text-gray-500">Set the price per piece in Taka.</p>
              </div>
              <ol className="space-y-4">
                {pricing.map((item, index) => (
                  <li key={index} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Item {index + 1}</span>
                      <Button type="button" aria-label={`Remove pricing item ${index + 1}`} onClick={() => setPricing(rows => rows.filter((_, i) => i !== index))} className="rounded-lg bg-white px-3 text-gray-500 hover:bg-pink-50 hover:text-[#ff206e]">Remove</Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_100px]">
                      <Input aria-label={`Apparel type ${index + 1}`} placeholder="Apparel Type" value={item.apparelType} onChange={event => setPricing(rows => rows.map((row, i) => i === index ? { ...row, apparelType: event.target.value } : row))} className={inputStyling} />
                      <Input aria-label={`Price in Taka for item ${index + 1}`} type="number" min="0" step="1" placeholder="৳ BDT" value={item.unitPrice} onChange={event => setPricing(rows => rows.map((row, i) => i === index ? { ...row, unitPrice: event.target.value } : row))} className={`${inputStyling} text-right font-mono`} required />
                    </div>
                  </li>
                ))}
              </ol>
              <Button type="button" onClick={() => setPricing(rows => [...rows, { apparelType: "", unitPrice: "" }])} variant="outline" className="h-12 w-full rounded-xl border-dashed border-pink-200 bg-pink-50 font-bold text-[#ff206e] hover:bg-pink-100">+ Add pricing item</Button>
            </section>

            <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-8">
              <div className="border-b border-gray-100 pb-5">
                <h2 className="font-bricolage text-2xl font-bold">Store Photos</h2>
                <p className="mt-2 text-sm text-gray-500">Add images for the store gallery.</p>
              </div>
              {images.map((_, index) => (
                <div key={index} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Label htmlFor={`store-photo-${index}`} className="text-sm font-semibold">Photo {index + 1}</Label>
                    <Button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => setImages(rows => rows.filter((_, i) => i !== index))} className="rounded-lg bg-white px-3 text-gray-500 hover:bg-pink-50 hover:text-[#ff206e]">Remove</Button>
                  </div>
                  <Input id={`store-photo-${index}`} type="file" accept="image/*" className={`${inputStyling} h-auto py-3 file:mr-3 file:rounded-md file:bg-pink-50 file:px-2 file:text-[#ff206e]`} onChange={event => { const file = event.currentTarget.files?.[0] ?? null; setImages(rows => rows.map((row, i) => i === index ? file : row)); }} />
                </div>
              ))}
              <Button type="button" onClick={() => setImages(rows => [...rows, null])} variant="outline" className="h-12 w-full rounded-xl border-dashed border-pink-200 bg-pink-50 font-bold text-[#ff206e] hover:bg-pink-100">+ Add photo</Button>
            </section>
            <Button type="submit" className="h-14 w-full rounded-xl bg-[#ff206e] text-lg font-bold text-white shadow-md hover:bg-[#d41b5b]">Add Laundry</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
