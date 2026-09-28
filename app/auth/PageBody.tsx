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
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
    {/* Glassy Navbar */}
      <header className="sticky top-0 z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-white/70 backdrop-blur-lg border-b border-gray-200">
       <Link
          href="/"
          className="text-2xl text-black font-bold hover:text-[#ff206e] transition-all duration-500 font-bricolage"
        >
          CLEAN
        </Link>
        
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="border border-gray-300 text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-100 transition hidden sm:block"
          >
            ← Back
          </button>
          <button 
            type="button"
            onClick={() => router.push("/orders")}
            className="text-black font-bold text-sm hover:text-[#ff206e] transition-colors"
          >
            Current Orders
          </button>
        </div>
      </header>

      {/* Page Content Wrapper */}
      <main className="w-full max-w-4xl mx-auto px-6 py-10 grow">
        
        {/* Profile Header Box */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-black tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Profile</h1>
        </div>

        {/* Account Actions Bar */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-200 gap-4">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
            Account
          </span>
          <div className="flex gap-3">
            <button className="bg-[#ff206e] hover:bg-[#d41b5b] text-white px-6 py-2 rounded-md font-semibold text-sm transition-colors">
              Edit
            </button>
            <button 
              onClick={() => changeIsLogin(true)}
              className="bg-[#fbff12] hover:bg-[#e5e90a] text-black px-6 py-2 rounded-md font-semibold text-sm transition-colors"
            >
              Sign in
            </button>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-black px-6 py-2 rounded-md font-semibold text-sm transition-colors">
              Sign out
            </button>
          </div>
        </div>

        {/* Role Cards (Excluding Laundry Owner as requested) */}
        <div className="mb-10 w-full md:w-[48%]">
          <div className="bg-[#111111] text-white rounded-xl p-8 h-full shadow-lg">
            <h2 
              className="text-3xl font-extrabold mb-4 tracking-tight" 
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Customer
            </h2>
            <p className="text-gray-300 text-sm font-medium leading-relaxed">
              Find laundries, book a service, and track your orders.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-6">
          <h2 
            className="text-2xl font-extrabold mb-1 tracking-tight" 
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Sign Up
          </h2>
          <p className="text-sm text-gray-500 font-medium">Only the essentials.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5 max-w-3xl pb-10">
          
          {/* Name */}
          <div>
            <Label className="block text-xs font-bold text-gray-700 mb-2">Name</Label>
            <Input
              value={handle}
              onChange={(e) => changeHandle(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 text-black focus-visible:ring-[#ff206e]"
              placeholder="Your name"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <Label className="block text-xs font-bold text-gray-700 mb-2">Contact Number</Label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => changePhone(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 text-black focus-visible:ring-[#ff206e]"
              placeholder="01XXXXXXXXX"
              required
            />
          </div>

          {/* Email (Kept so your Supabase logic doesn't break!) */}
          <div>
            <Label className="block text-xs font-bold text-gray-700 mb-2">Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => changeEmail(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 text-black focus-visible:ring-[#ff206e]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label className="block text-xs font-bold text-gray-700 mb-2">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => changePassword(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 text-black focus-visible:ring-[#ff206e]"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Location (Visual Only) */}
          <div>
            <Label className="block text-xs font-bold text-gray-700 mb-2">Location</Label>
            <Input
              className="w-full border-gray-300 rounded-lg p-3 text-black focus-visible:ring-[#ff206e]"
              placeholder="Area, city"
            />
          </div>

          <Button
            type="submit"
            className="bg-[#ff206e] hover:bg-[#d41b5b] text-white font-bold text-md px-6 py-6 rounded-xl mt-4 transition shadow-md active:scale-95"
          >
            Sign Up
          </Button>
          
          {/* Status Message */}
          {status && (
            <p className="text-sm font-medium text-black mt-4">{status}</p>
          )}
        </form>

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
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      
      {/* Light Glassy Navbar with Back, Current Orders, and Profile */}
      <header className="sticky top-0 z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-white/70 backdrop-blur-lg border-b border-gray-200">
       <button
          onClick={() => router.push("/")}
          className="text-2xl text-black font-bold hover:text-[#ff206e] transition-all duration-500 font-bricolage"
        >
          CLEAN
        </button>
        
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            type="button"
            onClick={() => router.push("/")}
            className="border border-gray-300 text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-100 transition hidden sm:block"
          >
            ← Back
          </button>
          <button 
            type="button"
            className="text-black font-bold text-sm hover:text-[#ff206e] transition-colors"
          >
            Current Orders
          </button>
          
          {/* Active Profile Indicator */}
          <div className="hidden md:block relative cursor-default pb-1">
            <span className="text-black font-bold text-sm">Profile</span>
            <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#ff206e] rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Centered Profile Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-6">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
          
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-black font-bricolage">
              Profile<span className="text-[#ff206e]">.</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Manage your laundry services and account details.
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Logged in as
              </p>
              <p className="text-xl font-bold text-black">
                {displayName || "Valued Customer"}
              </p>
            </div>
            {/* Decorative Avatar Placeholder */}
            <div className="w-12 h-12 rounded-full bg-[#ff206e]/10 flex items-center justify-center text-[#ff206e] font-bold text-lg">
              {displayName ? displayName.charAt(0).toUpperCase() : "C"}
            </div>
          </div>

          {/* Sign Out Button (Untouched Logic) */}
          <Button
            onClick={() => {
              router.refresh();
              supabase.auth.signOut();
              router.refresh();
            }}
            className="w-full bg-[#ff206e] hover:bg-[#d41b5b] text-white font-bold text-md px-8 py-6 rounded-xl transition shadow-md active:scale-95"
          >
            Sign Out
          </Button>
        </div>
      </main>

    </div>
  );
}