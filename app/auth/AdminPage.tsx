"use client";

import { supabase } from "@/lib/supabase/browser";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function AdminPage() {
  const router = useRouter();
  const inputStyling = "border-0 bg-slate-700 focus-visible:ring-0";

  return (
    <div className="text-amber-50 p-4 flex flex-col gap-2">
      <Label className="text-3xl"> Site Admin Page </Label>

      <form className="bg-slate-950 p-2 rounded-2xl">
        {/* Add a Turf Form */}
        <Label className="text-2xl">Add a Turf</Label>

        <div>
          <Label>Turf Name</Label>
          <Input className={inputStyling} />
        </div>
        <div>
          <Label>About</Label>
          <textarea className="w-full rounded-md border-0 bg-slate-700 p-2 text-slate-100 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0" />
        </div>
        <div>
          <Label>Pricing</Label>
          <Input className={inputStyling} />
        </div>
        <div>
          <Label>Images</Label>
          <Input type="file" accept="./" multiple className={inputStyling} />
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
