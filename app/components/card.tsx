"use client";
import { Label } from "@/components/ui/label";
import { Pricing } from "@/app/auth/AdminPage";
import Image from "next/image";
import placeholderImage from "./images/background.png";

export default function Card({
  name,
  location,
  about,
  pricing,
}: {
  name: string;
  location: string;
  about: string;
  pricing: Pricing[];
}) {
  return (
    <div className="flex gap-5">
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

      <Image src={placeholderImage} width={250} height={250} alt="Image" />
    </div>
  );
}
