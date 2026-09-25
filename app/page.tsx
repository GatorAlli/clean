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

// inside Home()
const [query, setQuery] = useState("");
const [city, setCity] = useState("All Bangladesh");
  return (
<div className="">
  <div></div>
      <div className="bg-[url('/background.png')] bg-cover bg-center min-h-screen w-full bg-no-repeat">
      {/* Top Navbar */}
      <header className="sticky w-full px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-[5px] border-b border-[#232323]">
        <img className=" h-8 mr-2" src={"Turfer(1).png"}></img>
        <div className=" flex rounded-md border border-white/10 bg-[#171717] focus-within:ring-1 focus-within:ring-white/20 overflow-hidden w-40 sm:w-60 md:w-90">
         <input
            className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3]/50 outline-none"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
         placeholder="Search turf or city"
          />
  <select
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="bg-[#171717] text-white text-sm px-2 border-l border-white/10 outline-none cursor-pointer"
  >
    {CITIES.map((c) => (
      <option key={c} value={c}>{c}</option>
    ))}
  </select>
</div>
          
        <nav className=" hidden md:flex items-center gap-5 ">
         <Button
        className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Explore
        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-red-900 transition-all duration-[400ms] group-hover:w-full rounded-full "></span>
      </Button>

      <Button
        className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Profile
        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-red-900 transition-all duration-[400ms] group-hover:w-full rounded-full "></span>
      </Button>

      <Button
        className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Booking
        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-red-900 transition-all duration-[400ms] group-hover:w-full rounded-full "></span>
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
  <div className="md:hidden flex flex-col items-center gap-6 bg-[#171717]/80 backdrop-blur-[3px] border-b border-[#232323] py-6">
    <button className="text-white text-center border-gray-500" onClick={() => redirect("./auth")}>Explore </button>
    <button className="text-white text-center border-gray-500" onClick={() => redirect("./auth")}>Profile</button>
    <button className="text-white text-center border-gray-500" onClick={() => redirect("./auth")}>Booking</button>
  </div>
)}



    </div>
</div>
    
  );
}
