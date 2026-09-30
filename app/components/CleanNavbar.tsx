"use client";

import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import searchIcon from "@/app/components/images/searchIcon.png";

export default function CleanNavbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  function search() {
    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    }
    router.push(`explore?${params.toString()}`);
  }

  return (
    <>
      <header className="relative z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-[#000000]/75 backdrop-blur-[5px] border border-[#4242423f]">
        <button
          onClick={() => {
            redirect("/");
          }}
          className="text-2xl text-white font-bold hover:text-[#ff206e] transition-all duration-500 font-bricolage tracking-tight"
        >
          clean
        </button>

        <div>
          <form
            className="flex rounded-2xl border border-white/10 bg-[#ffffff] focus-within:ring-1 focus-within:ring-white/20 w-40 sm:w-60 md:w-90 relative"
            onSubmit={(event) => {
              event.preventDefault();
              search();
            }}
          >
            <input
              className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-black placeholder:text-black/60 outline-none"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
            <Button
              type="submit"
              className="bg-[#fbff12] rounded-2xl border border-gray-200 shadow-md"
            >
              <Image
                className="hover:cursor-pointer "
                alt="Search Icon"
                width={20}
                height={20}
                src={searchIcon}
              />
            </Button>
          </form>
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

          {isLoggedIn ? (
            <div>
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
            </div>
          ) : (
            <div>
              <Button
                className="text-[#fbff12] text-md font-bold relative group bg-transparent hover:bg-transparent"
                onClick={() => router.push("/auth")}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Login/Sign Up
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#ff206e] transition-all duration-500 group-hover:w-full rounded-full"></span>
              </Button>
            </div>
          )}
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
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <button
              className="text-white w-full font-bold text-center py-2 hover:text-[#ff206e]"
              onClick={() => router.push("/auth")}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Login/Sign Up
            </button>
          )}
        </div>
      )}
    </>
  );
}
