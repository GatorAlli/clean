"use client";

import { Label } from "@/components/ui/label";
import { Pricing } from "@/app/auth/AdminPage";
import { supabase } from "@/lib/supabase/browser";
import placeholderImage from "./images/background.png";

import Link from "next/link";
import Image from "next/image";

export default function Card({
  name,
  location,
  about,
  pricing,
  url,
  storagePath,
}: {
  name: string;
  location: string;
  about: string;
  pricing: Pricing[];
  url: string;
  storagePath?: string;
}) {
  const imageUrl = storagePath
    ? supabase.storage.from("laundry-images").getPublicUrl(storagePath).data
        .publicUrl
    : null;
  return (
    <Link href={url} className="flex gap-5 border justify-between">
      <div>
        <Label className=" text-blue-600 text-3xl">{name}</Label>
        <Label className="text-3xl">{location}</Label>

        {pricing.map((item, id) => (
          <div key={id}>
            {item.apparelType}: {item.unitPrice}
          </div>
        ))}
      </div>

      <Label className="">{about}</Label>

      <Image
        src={imageUrl ?? placeholderImage}
        width={250}
        height={250}
        alt="Image"
      />
    </Link>
  );
}
