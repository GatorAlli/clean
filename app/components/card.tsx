"use client";

import { supabase } from "@/lib/supabase/browser";
import placeholderImage from "./images/background.png";
import Link from "next/link";
import Image from "next/image";
import { Pricing } from "@/app/auth/AdminPage";

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

  const displayPrice = pricing && pricing.length > 0 ? `৳${pricing[0].unitPrice}` : "Varies";

  return (
    <Link 
      href={url} 
      className="group relative flex flex-col w-full h-[450px] lg:h-[480px] bg-[#111111] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300"
    >
      {/* Background Image */}
      <Image
        src={imageUrl ?? placeholderImage}
        alt={name}
        fill
        className="object-cover absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10"></div>

      {/* Card Details (Bottom Aligned) */}
      <div className="relative z-20 mt-auto p-5 flex flex-col">
        
        {/* Name with Bricolage */}
        <h3 className="text-3xl font-bold tracking-tight text-white mb-1 font-bricolage">
          {name}
        </h3>
        
        {/* Location with Source Sans 3 */}
        <p 
          className="text-sm font-medium text-gray-400 mb-5" 
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {location}
        </p>

        {/* Horizontal Divider Line */}
        <div className="h-[1px] w-full bg-white/10 mb-4"></div>

        {/* Pricing with IBM Plex Mono for numbers and Source Sans 3 for text */}
        <div className="flex justify-between items-center">
          <p className="flex items-baseline gap-1">
            <span 
              className="font-semibold text-xl text-white" 
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {displayPrice}
            </span>
            <span 
              className="text-xs text-gray-400" 
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              /item
            </span>
          </p>
        </div>
        
      </div>
    </Link>
  );
}