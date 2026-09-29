"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function CleanNavbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Bangladesh");

  return (
    <>
      <header className="relative z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-[#000000]/75 backdrop-blur-[5px] border border-[#4242423f]">
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

          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-[#fbff12] hover:bg-[#e5e90a] transition-colors text-black text-xs px-3 border-l w-10 md:w-auto border-gray-300 outline-none cursor-pointer font-bold flex items-center gap-2 rounded-r-md"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <span className="hidden md:block">{city}</span>
            <span
              className={`text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

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
            className="text-[#fbff12] text-md font-bold relative group bg-transparent hover:bg-transparent"
            onClick={() => router.push("/explore")}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Services
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full"></span>
          </Button>

          <Button
            className="text-[#fbff12] text-md font-bold relative group bg-transparent hover:bg-transparent"
            onClick={() => router.push("/auth")}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Profile
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full"></span>
          </Button>

          <Button
            className="text-[#fbff12] text-md font-bold relative group bg-transparent hover:bg-transparent"
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

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 bg-[#111111]/90 backdrop-blur-md border-b border-white/10 py-6 absolute top-[76px] left-0 w-full z-40">
          <button
            className="text-white w-full font-bold text-center py-2 hover:text-[#ff206e]"
            onClick={() => router.push("/explore")}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Services
          </button>
          <button
            className="text-white w-full font-bold text-center py-2 hover:text-[#ff206e]"
            onClick={() => router.push("/auth")}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Profile
          </button>
          <button
            className="text-white w-full font-bold text-center py-2 hover:text-[#ff206e]"
            onClick={() => router.push("/auth")}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Booking
          </button>
        </div>
      )}
    </>
  );
}
