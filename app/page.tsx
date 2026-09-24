"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Home() {
  return (
<div>
      <div>
      {/* Top Navbar */}
      <header className="sticky w-full px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-2xl border-b border-[#232323]">
        <img className=" h-8 mr-2" src={"Turfer(1).png"}></img>
         <Button
        className="relative group bg-transparent hover:bg-transparent"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Profile
        <span className="absolute left-0 bottom-0 w-0 h-[5px] bg-white transition-all duration-[400ms] group-hover:w-full rounded-full "></span>
      </Button>
      </header>


    </div>
</div>
    
  );
}
