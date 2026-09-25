"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";




export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const CITIES = [
  "All Bangladesh", "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna",
  "Barishal", "Rangpur", "Mymensingh", "Cumilla", "Cox's Bazar",
   ];
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// inside Home()
const [query, setQuery] = useState("");
const [city, setCity] = useState("All Bangladesh");
  return (
<div className="">
  <div></div>
      <div className="bg-[url('/background.png')] bg-cover bg-center min-h-screen w-full bg-no-repeat">
      {/* Top Navbar */}
      <header className="sticky w-full px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-[5px] border-b border-white">
        <button className="text-2xl text-white font-extrabold hover:text-[#ff206e] transition-all duration-500 "> Clean </button>
        <div className="flex rounded-md border border-white/10 bg-[#ffffff] focus-within:ring-1 focus-within:ring-white/20 w-40 sm:w-60 md:w-90 relative">
          
          <input
            className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-black placeholder:text-black/60 outline-none rounded-l-md"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services or city"
          />
          
          {/* dropdow button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-[#fbff12] hover:bg-[#e5e90a] transition-colors text-black text-sm px-3 border-l border-gray-300 outline-none cursor-pointer font-medium flex items-center gap-2 rounded-r-md"
          >
            {city}
            <span className={`text-[10px] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {/* dropdown */}
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
                >
                  {c}
                </button>
              ))}
            </div>
          )}

        </div>
          
        <nav className=" hidden md:flex items-center gap-5 ">
         <Button
        className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Services
        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#fbff12] transition-all duration-[400ms] group-hover:w-full rounded-full "></span>
      </Button>

      <Button
        className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Profile
        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#fbff12] transition-all duration-[400ms] group-hover:w-full rounded-full "></span>
      </Button>

      <Button
        className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Booking
        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#fbff12] transition-all duration-[400ms] group-hover:w-full rounded-full "></span>
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

{/* Mobile dropdown menu */}
{menuOpen && (
  <div className="md:hidden flex flex-col items-center gap-6 bg-[#171717]/80 backdrop-blur-[3px] border-b border-[#232323] py-6 ">
    <button 
    className="text-white w-full font-bold text-center py-2 hover:text-blue-500" onClick={() => redirect("./auth")}>
      Services 
      </button>
    <button 
    className="text-white w-full font-bold text-center py-2 hover:text-blue-500" onClick={() => redirect("./auth")}>
      Profile
      </button>
    <button 
    className="text-white w-full font-bold text-center py-2 hover:text-blue-500" onClick={() => redirect("./auth")}>
      Booking
      </button>
  </div>
)}



    </div>
</div>
    
  );
}
