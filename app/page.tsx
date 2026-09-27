"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  {/* laundry display */}
  const LAUNDRIES = [
    { name: "bhaimafkorben", location: "Road 41, Gulshan 2, Dhaka", price: "৳70" },
    { name: "tazwarvalorant", location: "Sector 67, Uttara, Dhaka", price: "৳90" },
    { name: "bilai", location: "Road 67, Banani, Dhaka", price: "৳120" },
    { name: "tungtung", location: "Road 67, Reels, Insta", price: "৳6767" },
    
  ];

  // inside Home()
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Bangladesh");
  return (
    <div className="bg-[#232323]">

  <div className="relative h-screen w-full overflow-hidden">
    <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40 " />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Top Navbar */}
        <header className=" relative z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between  bg-[#000000]/10 backdrop-blur-[5px] border border-[#4242423f]">
          {/*<header className="sticky w-full px-6 md:px-12 py-5 flex items-center justify-between  bg-[#ff206e]/10 backdrop-blur-[5px] border-b border-white">*/}
          <button className="text-2xl text-white font-bold hover:text-[#ff206e] transition-all duration-500 font-bricolage">
            {" "}
            CLEAN{" "}
          </button>
          <div className="flex rounded-md border border-white/10 bg-[#ffffff] focus-within:ring-1 focus-within:ring-white/20 w-40 sm:w-60 md:w-90 relative">
            <input
              className="flex-1 min-w-0 bg-transparent px-3 py-2 text-hi text-black placeholder:text-black/60 outline-none rounded-l-md"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services or city"
            />

            {/* dropdow button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#fbff12] hover:bg-[#e5e90a] transition-colors text-black text-xs px-3 border-l w-10 md:w-auto border-gray-300 outline-none cursor-pointer font-medium flex items-center gap-2 rounded-r-md "
            >
              {city}
              <span
                className={`text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              >
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
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full "></span>
            </Button>

            <Button
              className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
              onClick={() => {
                redirect("./auth");
              }}
            >
              Profile
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full "></span>
            </Button>

            <Button
              className="text-white text-md font-bold relative group bg-transparent hover:bg-transparent"
              onClick={() => {
                redirect("./auth");
              }}
            >
              Booking
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full "></span>
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
          <div className="md:hidden flex flex-col items-center gap-6 bg-[#ff206e]/10 backdrop-blur-[3px] border-b border-[#ff206e] py-6 ">
            <button
              className="text-white w-full font-bold text-center py-2 hover:text-[#ff6a9e]"
              onClick={() => redirect("./auth")}
            >
              Services
            </button>
            <button
              className="text-white w-full font-bold text-center py-2 hover:text-[#ff6a9e]"
              onClick={() => redirect("./auth")}
            >
              Profile
            </button>
            <button
              className="text-white w-full font-bold text-center py-2 hover:text-[#ff6a9e]"
              onClick={() => redirect("./auth")}
            >
              Booking
            </button>
          </div>
          
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        <div className="relative z-10 mx-5 md:mx-20 my-10 md:my-70">
          <h1 className="text-white font-bricolage font-bold text-[40px] lg:text-[200px] leading-12 md:leading-40">
          CLEAN CLOTHES <br/>START HERE <span className="inline-block mx-[-5] md:mx-[-20] w-3.5 h-3 md:w-13 md:h-11 rounded-full bg-pink-500 align-baseline" />
        </h1>
        </div>
        
         <div className="relative z-10 mx-5 md:mx-20 my-[-20] md:my-[-150]">
          <span className="inline-block mx-[-5] md:mx-[-20] w-3.5 h-3 md:w-13 md:h-11 rounded-full bg-pink-500 align-baseline" />
       <p className="text-white font-sans font-medium text-[15px] md:text-2xl my-0 md:my-[-20]">
      Find laundries nearby, compare services, and <br/>get your clothes cleaned without the hassle.
    </p>
       </div>
      </div>

      {/* laundry services*/}
      <div className="bg-white w-full py-20 pl-6 md:pl-12">
        <h2 
          className="text-4xl md:text-5xl font-extrabold text-black mb-10 tracking-tight"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Laundry services
        </h2>
        
       {/* Scrolling */}
        <div className="flex overflow-hidden gap-6 pb-10 w-full relative group">
          
          {/* animation*/}
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(calc(-100% - 1.5rem)); }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
              display: flex;
              flex-shrink: 0;
              gap: 1.5rem;
            }
            /* Pause the animation when the user hovers over the card area */
            .group:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}</style>
          
          {/* Cards-1*/}
          <div className="animate-marquee">
            {LAUNDRIES.map((laundry, index) => (
              <div 
                key={index} 
                className="flex-none w-[300px] md:w-[400px] h-[500px] bg-[#111111] rounded-xl flex flex-col p-6 text-white justify-end shadow-lg"
              >
                <div className="mt-auto">
                  <h3 className="text-2xl font-bold mb-1 tracking-tight">{laundry.name}</h3>
                  <p className="text-xs text-gray-400 mb-6">{laundry.location}</p>
                  <div className="h-[1px] w-full bg-white/10 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-xl">
                      {laundry.price}<span className="text-xs font-normal text-gray-400">/hr</span>
                    </p>
                    <button className="bg-[#fbff12] hover:bg-[#e5e90a] text-black font-bold text-sm px-6 py-2 rounded-md transition-colors active:scale-95">
                      Check
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards-2 */}
          <div className="animate-marquee" aria-hidden="true">
            {LAUNDRIES.map((laundry, index) => (
              <div 
                key={`dup-${index}`} 
                className="flex-none w-[300px] md:w-[400px] h-[500px] bg-[#111111] rounded-xl flex flex-col p-6 text-white justify-end shadow-lg"
              >
                <div className="mt-auto">
                  <h3 className="text-2xl font-bold mb-1 tracking-tight">{laundry.name}</h3>
                  <p className="text-xs text-gray-400 mb-6">{laundry.location}</p>
                  <div className="h-[1px] w-full bg-white/10 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-xl">
                      {laundry.price}<span className="text-xs font-normal text-gray-400">/hr</span>
                    </p>
                    <button className="bg-[#fbff12] hover:bg-[#e5e90a] text-black font-bold text-sm px-6 py-2 rounded-md transition-colors active:scale-95">
                      Check
                    </button>
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
        