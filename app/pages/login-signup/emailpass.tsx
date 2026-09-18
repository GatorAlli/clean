"use client";

import { User } from "@supabase/supabase-js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type EmailPasswordProps = {
  user: User | null;
};

type Mode = "signup" | "signin";

export default function EmailPass({ user }: EmailPasswordProps) {
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const supabase = getSupabaseBrowserClient();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "signup") {
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Check your inbox to confirm the new account");
      }
      console.log({ data });
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Signed in successfully");
      }
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Label className="text-white font-mono">Email Address</Label>
        <Input
          placeholder="Email Address"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="text-white border-0 bg-[#0d1419]"
        />
        <Label className="text-white font-mono">Password</Label>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="text-white border-0 bg-[#0d1419]"
        />
        <Button>Submit</Button>
      </form>
      {status && <Label>{status}</Label>}
    </div>
  );
}
