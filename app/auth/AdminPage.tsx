"use client";

import { supabase } from "@/lib/supabase/browser";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Pricing = { apparelType: string; unitPrice: number };

export function AdminPage() {
  const router = useRouter();
  const inputStyling = "border-0 bg-slate-700 focus-visible:ring-0";
  const [laundryName, setLaundryName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [pricing, setPricing] = useState<Pricing[]>();

  return (
    <div className="text-amber-50 p-4 flex flex-col gap-2">
      <Label className="text-3xl"> Site Admin Page </Label>

      <form className="bg-slate-950 p-2 rounded-2xl">
        {/* Add a Turf Form */}
        <Label className="text-2xl">Add a Laundry</Label>

        <div>
          <Label>Laundry Name</Label>
          <Input
            className={inputStyling}
            value={laundryName}
            onChange={(event) => setLaundryName(event.target.value)}
          />
        </div>
        <div>
          <Label>Location (Area)</Label>
          <Input
            className={inputStyling}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <div>
          <Label>About</Label>
          <textarea
            className="w-full rounded-md border-0 bg-slate-700 p-2 text-slate-100 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </div>
        <div>
          <Label>Pricing</Label>
          <div className="flex gap-2">
            <Input className={inputStyling} />
          </div>
        </div>
        <div>
          <Label>Images</Label>
          <Input type="file" accept="./" className={inputStyling} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <Button
        onClick={() => {
          router.refresh();
          supabase.auth.signOut();
          router.refresh();
        }}
        className="bg-gray-700"
      >
        Sign Out
      </Button>
    </div>
  );
}
