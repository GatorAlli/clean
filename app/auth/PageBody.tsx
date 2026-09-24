"use client";

import { supabase } from "@/lib/supabase/browser";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthPageBody() {
  const [isLogin, changeIsLogin] = useState(false);
  const [email, changeEmail] = useState("");
  const [name, changeName] = useState("");
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
          username: handle,
          phone,
        },
      },
    });
    if (error) {
      changeStatus(error.message);
    } else {
      changeStatus("Signed Up Successfully");
    }
    console.log("Hello");
  }

  async function handleSignIn() {
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
        <img className=" h-8 mr-2" src={"Turfer(1).png"}></img>
        <button
          type="button"
          onClick={() => router.back()}
className="relative px-2 py-1 text-sm font-semibold text-white border-2 border-gray-400 overflow-hidden group rounded-xl cursor-pointer"        >
  <span className="absolute inset-0 w-full h-full bg-red-500 transform scale-x-0 origin-left rounded-md group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
  <span className="absolute inset-0 w-full h-full bg-red-500 transform scale-x-0 origin-right rounded-md group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>

          <span className="relative z-10 group-hover:text-white transition-colors duration-800">&larr; Back</span>
        </button>
      </header>

  {/* Page Content Wrapper */}
  <main className="w-full max-w-4xl mx-auto px-6 py-10 flex-grow">

    {/* Title Section */}
  <div className="mb-8">
    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
      Player<span className="text-gray-500">.</span>
    </h1>
    <p className="text-sm text-gray-400 font-medium">
      Find a pitch, book it, play.
    </p>
  </div>
      {isLogin ? (
        <div>
          {/* Sign In/Sign Up Form */}
          <div className="bg-gray-900 rounded-2xl p-1 inline-flex">
            {/* Toggle Pages */}
            <Button className="bg-blue-500 rounded-2xl p-2">Sign In</Button>
            <Button
              onClick={() => {
                changeIsLogin(!isLogin);
              }}
              className="hover:cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
          <form>
            {/* Form */}
            <div>
              {/* Email field */}
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => {
                  changeEmail(e.target.value);
                }}
                className="bg-gray-700 border-0 focus-visible:ring-0"
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
                className="bg-gray-700 border-0 focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              onClick={handleSignIn}
              className="bg-gray-700"
            >
              Sign In
            </Button>
          </form>
          <Label>{status}</Label>
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 rounded-2xl p-1 inline-flex">
            {/* Sign Up Form */}
            <Button
              onClick={() => {
                changeIsLogin(!isLogin);
              }}
              className="hover:cursor-pointer"
            >
              Sign In
            </Button>
            <Button className="bg-gray-700 rounded-2xl p-2">Sign Up</Button>
          </div>
          <form onSubmit={handleSignUp}>
            {/* Form */}

           {/* Username & Name */}
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
           {/* Contact Number & Email */}
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
                  Email (Optional)
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => changeEmail(e.target.value)}
                  className="bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:ring-1 focus-visible:ring-white/20"
                />
              </div>
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
                className="bg-gray-700 border-0 focus-visible:ring-0"
              />
            </div>

            <Button type="submit" className="bg-gray-700">
              Sign Up
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
