"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updateStore } from "./actions";
type storeData = {
  id: number;
  ownerEmail: string;
  name: string;
  location: string;
  about: string | null;
  pricing: {
    apparelType: string;
    unitPrice: number;
  }[];
};
export default function PageBody({ store }: { store: storeData }) {
  const router = useRouter();

  const [name, setName] = useState(store.name);
  const [location, setLocation] = useState(store.location);
  const [about, setAbout] = useState(store.about ?? "");
  const [pricing, setPricing] = useState(store.pricing);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const isUnchanged =
    name === store.name &&
    location === store.location &&
    about === (store.about ?? "") &&
    pricing.length === store.pricing.length &&
    pricing.every(
      (item, i) =>
        item.apparelType === store.pricing[i].apparelType &&
        item.unitPrice === store.pricing[i].unitPrice,
    );

  return (
    <div className="p-4">
      <div>
        <div>
          <Label>Store Name</Label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <Label>Store Location</Label>
          <Input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <div>
          <Label>About</Label>
          <textarea
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </div>
        <div>
          <Label>Prices</Label>
          <ul>
            {pricing.map((item, id) => (
              <li key={id} className="flex">
                <Label>{item.apparelType}:</Label>
                <Input
                  type="number"
                  min="0"
                  step="any"
                  value={item.unitPrice}
                  onChange={(event) =>
                    setPricing((rows) =>
                      rows.map((row, index) =>
                        index === id
                          ? { ...row, unitPrice: Number(event.target.value) }
                          : row,
                      ),
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-4 p-4">
        <Button
          type="button"
          disabled={isUnchanged || saving}
          onClick={async () => {
            setSaving(true);
            setMessage("");

            try {
              const result = await updateStore({
                id: store.id,
                name,
                location,
                about,
                pricing,
              });
              setMessage(result.message);
              if (result.ok && result.store) {
                setName(result.store.name);
                setLocation(result.store.location);
                setAbout(result.store.about ?? "");
                setPricing(result.store.pricing);
              }
            } catch {
              setMessage("Could not save changes. Please try again.");
            } finally {
              setSaving(false);
            }
          }}
          className="bg-blue-400 border-0"
        >
          {saving ? "Saving..." : "Change"}
        </Button>
        <Button
          onClick={() => {
            router.refresh();
            supabase.auth.signOut();
            router.refresh();
          }}
          className="bg-blue-400 border-0"
        >
          Sign Out
        </Button>
      </div>
      <p role="status">{message}</p>
    </div>
  );
}
