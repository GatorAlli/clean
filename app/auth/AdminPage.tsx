"use client";

import { supabase } from "@/lib/supabase/browser";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { text } from "drizzle-orm/cockroach-core";
import { event } from "next/dist/build/output/log";

type Pricing = { apparelType: string; unitPrice: number };

export function AdminPage() {
  const router = useRouter();
  const inputStyling = "border-0 bg-slate-700 focus-visible:ring-0";
  const [laundryName, setLaundryName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [pricing, setPricing] = useState<Pricing[]>([
    { apparelType: "", unitPrice: 0 },
  ]);

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
          <ol>
            {pricing.map((e, index) => (
              <div key={index}>
                <li className="flex gap-2">
                  <Label>{index + 1}.</Label>
                  <Input
                    placeholder="Apparel Type"
                    value={pricing[index].apparelType}
                    onChange={(e) => {
                      setPricing((rows) => {
                        return rows.map((row, i) =>
                          i === index
                            ? { ...row, apparelType: e.target.value }
                            : row,
                        );
                      });
                    }}
                    className={inputStyling}
                  />
                  <Input
                    placeholder="BDT"
                    className="border-slate-600 focus-visible:ring-0 w-1xl"
                  />
                  <Button
                    onClick={() => {
                      setPricing(
                        pricing.filter((e, ind) => {
                          return ind !== index;
                        }),
                      );
                    }}
                    className="text-2xl"
                  >
                    -
                  </Button>
                </li>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => {
                setPricing(pricing.concat({ apparelType: "", unitPrice: 0 }));
              }}
              className="text-2xl"
            >
              +
            </Button>
          </ol>
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
