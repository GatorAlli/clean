"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      <Button
        className="bg-slate-700 hover:bg-slate-600 text-slate-200"
        onClick={() => {
          redirect("./auth");
        }}
      >
        Credentials
      </Button>
    </div>
  );
}
