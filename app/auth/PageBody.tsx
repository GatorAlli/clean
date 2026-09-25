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
  const [isPlayerSelected, setIsPlayerSelected] = useState(false);
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
      <main className="w-full max-w-4xl mx-auto px-6 py-10 grow ">
        {/* Title Section */}
        {/* Clickable Animated Player Card */}
        <div
          onClick={() => setIsPlayerSelected(!isPlayerSelected)}
          className={`mb-8 p-8 rounded-2xl max-w-sm flex flex-col justify-between min-h-[140px] shadow-lg cursor-pointer transition-all 
                      duration-200 active:scale-95 hover:scale-[1.02] border ${
                        isPlayerSelected
                          ? "bg-[#F5F2ED] text-[#0D0D0D] border-transparent"
                          : "bg-[#171717] text-white border-white/10"
                      }`}
        >
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Customer<span className="text-[#A3A3A3]"></span>
          </h1>
          <p
            className={`text-sm font-medium transition-colors ${
              isPlayerSelected ? "text-[#0D0D0D]/80" : "text-[#A3A3A3]"
            }`}
          >
            Find a servie, book it and clean.
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
                className="text-lg font-bold text-white border-b-2 border-blue-500 pb-3 -mb-[1px]"
              >
                Sign in
              </button>
            </div>
            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn(e);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
                <div>
                  <Label className="block text-xs font-semibold text-[#A3A3A3] mb-2">
                    Email Address <span className="text-blue-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    value={email}
                    onChange={(e) => changeEmail(e.target.value)}
                    className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#A3A3A3]/50 focus-visible:ring-1 focus-visible:ring-white/20"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-xs font-semibold text-[#A3A3A3] mb-2">
                    Password <span className="text-blue-500">*</span>
                  </Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => changePassword(e.target.value)}
                    className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">

              <Button
                type="submit"
                className="relative flex items-center px-6 py-3 font-semibold text-blue-500 border-2 border-blue-500 overflow-hidden group rounded-xl cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-blue-500 transform scale-x-0 origin-left rounded-md group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
  <span className="absolute inset-0 w-full h-full bg-blue-500 transform scale-x-0 origin-right rounded-md group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
  <span className="relative z-10 group-hover:text-white transition-colors duration-800">Continue</span>
              </Button>
              </div>
            </form>
            <Label>{status}</Label>
          </div>
        ) : (
          <div>
            {/* sign up and in */}
            <div className="flex gap-8 border-b border-white/10 mb-8">
              <button
                type="button"
                className="text-lg font-bold text-white border-b-2 border-blue-500 pb-3 -mb-[1px]"
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
                    Username <span className="text-blue-500">*</span>
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
                    Contact Number <span className="text-blue-500">*</span>
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
                    Email <span className="text-blue-500">*</span>
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
                    Password <span className="text-blue-500">*</span>
                  </Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => changePassword(e.target.value)}
                    className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="relative flex items-center px-6 py-3 font-semibold text-blue-500 border-2 border-blue-500 overflow-hidden group rounded-xl cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-blue-500 transform scale-x-0 origin-left rounded-md group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
  <span className="absolute inset-0 w-full h-full bg-blue-500 transform scale-x-0 origin-right rounded-md group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
  <span className="relative z-10 group-hover:text-white transition-colors duration-800">Continue</span>
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
