"use client";

import { Pricing } from "@/app/auth/AdminPage";
import Image from "next/image";

export default function PageBody({
  name,
  location,
  prices,
  about,
  images,
}: {
  name: string;
  location: string;
  prices: Pricing[];
  about: string;
  images: string[];
}) {
  return (
    <div>
      <span>{name}</span>
      <span>{location}</span>

      <ul>
        {prices.map((e, id) => (
          <li key={id}>
            <span>
              {e.apparelType}:{e.unitPrice}
            </span>
          </li>
        ))}
      </ul>
      <span>{about}</span>
      {images.length > 0 ? (
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((imageUrl, index) => (
            <Image
              key={imageUrl}
              src={imageUrl}
              width={800}
              height={600}
              alt={`${name} photo ${index + 1}`}
              className="h-auto w-full rounded-lg object-cover"
            />
          ))}
        </div>
      ) : (
        <p className="my-6">No photos have been added for this store yet.</p>
      )}
    </div>
  );
}
