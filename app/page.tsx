"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter(); // Fixed: Use router for client-side navigation instead of redirect()
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Bangladesh");

  const CITIES = [
    "All Bangladesh",
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    "Cumilla",
    "Cox's Bazar",
  ];
  
  const LAUNDRIES = [
    { name: "bhaimafkorben", location: "Road 41, Gulshan 2, Dhaka", price: "৳70" },
    { name: "tazwarvalorant", location: "Sector 67, Uttara, Dhaka", price: "৳90" },
    { name: "bilai", location: "Road 67, Banani, Dhaka", price: "৳120" },
    { name: "tungtung", location: "Road 67, Reels, Insta", price: "৳6767" },
  ];

  return (
    <div className="bg-[#0D0D0D]">
      {/* Background */}
      <div className="relative min-h-screen w-full flex flex-col overflow-x-clip">
        
        {/* Background behind */}
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center z-0" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent z-0" />

        {/* Navbar */}
        <header className="relative z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-[#000000]/10 backdrop-blur-[5px] border border-[#4242423f]">
          <button className="text-2xl text-white font-bold hover:text-[#ff206e] transition-all duration-500 font-bricolage tracking-tight">
            clean
          </button>
          
          <div className="flex rounded-md border border-white/10 bg-[#ffffff] focus-within:ring-1 focus-within:ring-white/20 w-40 sm:w-60 md:w-90 relative">
            <input
              className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-black placeholder:text-black/60 outline-none rounded-l-md"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services or city"
            />

            {/* Dropdown button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#fbff12] hover:bg-[#e5e90a] transition-colors text-black text-xs px-3 border-l w-10 md:w-auto border-gray-300 outline-none cursor-pointer font-bold flex items-center gap-2 rounded-r-md"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <span className="hidden md:block">{city}</span>
              <span className={`text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 max-h-64 overflow-y-auto bg-[#171717] border border-white/10 rounded-xl shadow-2xl z-50 flex flex-col py-2 scrollbar-thin scrollbar-thumb-gray-600">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setIsDropdownOpen(false);
                    }}
                    className={`text-left px-4 py-2 text-sm transition-colors ${
                      city === c
                        ? "bg-[#fbff12] text-black font-bold"
                        : "text-white hover:bg-white/10"
                    }`}
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-5">
            <Button
              className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
              onClick={() => router.push("/explore")}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Services
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full"></span>
            </Button>

            <Button
              className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
              onClick={() => router.push("/auth")}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Profile
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full"></span>
            </Button>

            <Button
              className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
              onClick={() => router.push("/auth")}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Booking
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full"></span>
            </Button>
          </nav>
          
          <button
            className="md:hidden text-white text-2xl px-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </header>

        {/*  dropdown menu-2*/}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-6 bg-[#111111]/90 backdrop-blur-md border-b border-white/10 py-6 absolute top-[76px] left-0 w-full z-40">
            <button className="text-white w-full font-bold text-center py-2 hover:text-[#ff206e]" onClick={() => router.push("/explore")} style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Services
            </button>
            <button className="text-white w-full font-bold text-center py-2 hover:text-[#ff206e]" onClick={() => router.push("/auth")} style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Profile
            </button>
            <button className="text-white w-full font-bold text-center py-2 hover:text-[#ff206e]" onClick={() => router.push("/auth")} style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Booking
            </button>
          </div>
        )}

        {/*  Content  */}
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
            Find laundries nearby, compare services, and <br className="hidden md:block"/>
            get your clothes cleaned without the hassle.
          </p>
        </div>
      </div>

      {/* Laundry services */}
      <div className="bg-[#0D0D0D] w-full pb-20 pl-6 md:pl-12">
        <h2 
          className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight font-bricolage"
        >
          Laundry services
        </h2>
        
        {/* Scrolling part */}
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
          
          {/* Cards-1 */}
          <div className="animate-marquee">
            {LAUNDRIES.map((laundry, index) => (
              <div 
                key={index} 
                className="flex-none w-[300px] md:w-[400px] h-[450px] bg-[#111111] rounded-xl flex flex-col p-6 text-white justify-end shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/explore")}
              >
                <div className="mt-auto">
                  <h3 className="text-3xl font-bold mb-1 tracking-tight font-bricolage">{laundry.name}</h3>
                  <p className="text-sm text-gray-400 mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{laundry.location}</p>
                  
                  <div className="h-[1px] w-full bg-white/10 mb-4"></div>
                  
                  <div className="flex justify-between items-center">
                    <p className="flex items-baseline gap-1">
                      <span className="font-semibold text-xl text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{laundry.price}</span>
                      <span className="text-xs text-gray-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>/item</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards2 */}
          <div className="animate-marquee" aria-hidden="true">
            {LAUNDRIES.map((laundry, index) => (
              <div 
                key={`dup-${index}`} 
                className="flex-none w-[300px] md:w-[400px] h-[450px] bg-[#111111] rounded-xl flex flex-col p-6 text-white justify-end shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/explore")}
              >
                <div className="mt-auto">
                  <h3 className="text-3xl font-bold mb-1 tracking-tight font-bricolage">{laundry.name}</h3>
                  <p className="text-sm text-gray-400 mb-5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{laundry.location}</p>
                  
                  <div className="h-[1px] w-full bg-white/10 mb-4"></div>
                  
                  <div className="flex justify-between items-center">
                    <p className="flex items-baseline gap-1">
                      <span className="font-semibold text-xl text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{laundry.price}</span>
                      <span className="text-xs text-gray-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>/item</span>
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