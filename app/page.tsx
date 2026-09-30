"use client";

import { supabase } from "@/lib/supabase/browser";
import CleanNavbar from "@/app/components/CleanNavbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, []);

  const LAUNDRIES = [
    {
      name: "bhaimafkorben",
      location: "Road 41, Gulshan 2, Dhaka",
      price: "৳70",
    },
    {
      name: "tazwarvalorant",
      location: "Sector 67, Uttara, Dhaka",
      price: "৳90",
    },
    { name: "bilai", location: "Road 67, Banani, Dhaka", price: "৳120" },
    { name: "tungtung", location: "Road 67, Reels, Insta", price: "৳6767" },
  ];

  return (
    <div className="bg-[#0D0D0D]">
      <div className="relative min-h-screen w-full flex flex-col overflow-x-clip">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center z-0" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent z-0" />

        {user ? (
          <CleanNavbar isLoggedIn={true} />
        ) : (
          <CleanNavbar isLoggedIn={false} />
        )}

        {/* Hero Content (Flexbox prevents overlap/floating issues) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-20">
          <h1 className="text-white font-bricolage font-extrabold text-[50px] md:text-[100px] lg:text-[140px] leading-[0.9] tracking-tight mb-8">
            CLEAN CLOTHES <br />
            START HERE<span className="text-[#ff206e]">.</span>
          </h1>
          <div className="h-[2px] w-full max-w-md bg-[#ff206e] mb-8"></div>
          <p
            className="text-gray-300 font-medium text-lg md:text-2xl max-w-2xl leading-snug"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Find laundries nearby, compare services, and{" "}
            <br className="hidden md:block" />
            get your clothes cleaned without the hassle.
          </p>
        </div>
      </div>

      {/* Laundry Services Marquee */}
      <div className="bg-[#0D0D0D] w-full pb-20 pl-6 md:pl-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight font-bricolage">
          Laundry services
        </h2>

        {/* Scrolling Container */}
        <div className="flex overflow-hidden gap-6 pb-10 w-full relative group">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(calc(-100% - 1.5rem)); }
            }
            .animate-marquee {
              animation: marquee 25s linear infinite;
              display: flex;
              flex-shrink: 0;
              gap: 1.5rem;
            }
            .group:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}</style>

          {/* Cards Set 1 */}
          <div className="animate-marquee">
            {LAUNDRIES.map((laundry, index) => (
              <div
                key={index}
                className="flex-none w-[300px] md:w-[400px] h-[450px] bg-[#111111] rounded-xl flex flex-col p-6 text-white justify-end shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/explore")}
              >
                <div className="mt-auto">
                  <h3 className="text-3xl font-bold mb-1 tracking-tight font-bricolage">
                    {laundry.name}
                  </h3>
                  <p
                    className="text-sm text-gray-400 mb-5"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {laundry.location}
                  </p>

                  <div className="h-[1px] w-full bg-white/10 mb-4"></div>

                  <div className="flex justify-between items-center">
                    <p className="flex items-baseline gap-1">
                      <span
                        className="font-semibold text-xl text-white"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {laundry.price}
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
              </div>
            ))}
          </div>

          {/* Cards Set 2 (Duplicate for seamless scrolling) */}
          <div className="animate-marquee" aria-hidden="true">
            {LAUNDRIES.map((laundry, index) => (
              <div
                key={`dup-${index}`}
                className="flex-none w-[300px] md:w-[400px] h-[450px] bg-[#111111] rounded-xl flex flex-col p-6 text-white justify-end shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/explore")}
              >
                <div className="mt-auto">
                  <h3 className="text-3xl font-bold mb-1 tracking-tight font-bricolage">
                    {laundry.name}
                  </h3>
                  <p
                    className="text-sm text-gray-400 mb-5"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {laundry.location}
                  </p>

                  <div className="h-[1px] w-full bg-white/10 mb-4"></div>

                  <div className="flex justify-between items-center">
                    <p className="flex items-baseline gap-1">
                      <span
                        className="font-semibold text-xl text-white"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {laundry.price}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
