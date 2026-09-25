"use client";

import { supabase } from "@/lib/supabase/browser";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthPageBody({
  onSaveAuthPhone,
}: {
  onSaveAuthPhone: (phone: string) => Promise<{ error: string | null }>;
}) {
  const [isLogin, changeIsLogin] = useState(false);
  const [email, changeEmail] = useState("");
  const [phone, changePhone] = useState("");
  const [password, changePassword] = useState("");
  const [status, changeStatus] = useState("");
  const [handle, changeHandle] = useState("");
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: handle,
          auth_phone: phone,
        },
      },
    });
    if (error) {
      changeStatus(error.message);
    } else if (!data.user) {
      changeStatus("Signup succeeded, but Supabase did not return a user.");
    } else {
      const phoneResult = await onSaveAuthPhone(phone);
      changeStatus(phoneResult.error ?? "Signed up and phone number saved.");
    }
    console.log("Hello");
  }

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      changeStatus(error.message);
    } else {
      changeStatus("Logged In Successfully");
    }
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#232323]">
        <Link
          href="/"
          aria-label="Turfer home"
          className="inline-flex shrink-0 items-center"
        >
          <Image
            width={1000}
            height={300}
            className="mr-2 h-auto w-20 max-w-[40vw]"
            src="/Turfer(1).png"
            alt="Turfer"
          />
        </Link>
      </header>

      {/* Page Content Wrapper */}
      <main className="w-full max-w-4xl mx-auto px-6 py-10 grow">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
            Player<span className="text-gray-500"></span>
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Find a pitch, book it, play.
          </p>
        </div>
        {isLogin ? (
          <div>
            {/* Sign up and in */}
            <div className="flex gap-8 border-b border-white/10 mb-8">
            <button
              type="button"
              onClick={() => changeIsLogin(false)}
              className="text-lg font-bold text-[#A3A3A3] pb-3 hover:text-white transition"
            >
              Sign up
            </button>
            <button
              type="button"
              className="text-lg font-bold text-white border-b-2 border-[#E5322D] pb-3 -mb-[1px]"
            >
              Sign in
            </button>
          </div>
           
            <form onSubmit={handleSignIn}>
              {/* Form */}
              <div>
                {/* Email field */}
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => {
                    changeEmail(e.target.value);
                  }}
                  className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
                />
              </div>

              <div>
                {/* Password field */}
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    changePassword(e.target.value);
                  }}
                  className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
                />
              </div>

              <Button
                type="submit"
                className="bg-[#282828] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
              >
                Sign In
              </Button>
            </form>
            <Label>{status}</Label>
          </div>
        ) : (
          <div>
           {/* sign up and in */} 
          <div className="flex gap-8 border-b border-white/10 mb-8">
            <button
              type="button"
              className="text-lg font-bold text-white border-b-2 border-[#E5322D] pb-3 -mb-[1px]"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => changeIsLogin(true)}
              className="text-lg font-bold text-[#A3A3A3] pb-3 hover:text-white transition"
            >
              Sign in
            </button>
          </div>
            <form onSubmit={handleSignUp}>
              {/* Form */}

              {/* Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="block text-xs font-semibold text-[#A3A3A3] mb-2">
                    Username <span className="text-[#E5322D]">*</span>
                  </Label>
                  <Input
                    value={handle}
                    onChange={(e) => changeHandle(e.target.value)}
                    className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#A3A3A3]/50 focus-visible:ring-1 focus-visible:ring-white/20"
                    required
                  />
                </div>
              </div>
              {/* Contact number and email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
                <div>
                  <Label className="block text-xs font-semibold text-[#A3A3A3] mb-2">
                    Contact Number <span className="text-[#E5322D]">*</span>
                  </Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => changePhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#A3A3A3]/50 focus-visible:ring-1 focus-visible:ring-white/20"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-xs font-semibold text-[#A3A3A3] mb-2">
                    Email <span className="text-[#E5322D]">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => changeEmail(e.target.value)}
                    className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
                  />
                </div>
              </div>

                {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
                 <div>
                 <Label className="block text-xs font-semibold text-[#A3A3A3] mb-2">
                  Password <span className="text-[#E5322D]">*</span>
                 </Label>
                 <Input
                   type="password"
                   value={password}
                   onChange={(e) => changePassword(e.target.value)}
                   className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
                   required />
                </div>
              </div>
              
              <Button
                type="submit"
                className="bg-[#E5322D] hover:bg-[#d42d28] text-white font-semibold text-md px-8 py-3 rounded-xl transition shadow-md active:scale-95 w-fit"
              >
                Continue
              </Button>
              <Label>{status}</Label>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export function ProfilePageBody({
  displayName,
}: {
  displayName: string | undefined;
}) {
  const router = useRouter();
  return (
    <div className="text-amber-50 p-4">
      <Label>Profile</Label>
      <Label>
        Welcome<b className="text-blue-400">{displayName}</b>
      </Label>
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
