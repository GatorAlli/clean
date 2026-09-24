"use client";

import { supabase } from "@/lib/supabase/browser";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthPageBody() {
  const [isLogin, changeIsLogin] = useState(true);
  const [email, changeEmail] = useState("");
  const [name, changeName] = useState("");
  const [phone, changePhone] = useState("");
  const [password, changePassword] = useState("");
  const [status, changeStatus] = useState("");

  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
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
    <div className="text-amber-50 p-4 flex flex-col items-center justify-center min-h-screen">
      {isLogin ? (
        <div>
          {/* Sign In/Sign Up Form */}
          <div className="bg-gray-900 rounded-2xl p-1 inline-flex">
            {/* Toggle Pages */}
            <Button className="bg-gray-700 rounded-2xl p-2">Sign In</Button>
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
            <div>
              {/* Full name field */}
              <Label>Full Name</Label>
              <Input
                value={name}
                onChange={(e) => {
                  changeName(e.target.value);
                }}
                className="bg-gray-700 border-0 focus-visible:ring-0"
              />
            </div>

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
              {/* Phone number field */}
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => {
                  changePhone(e.target.value);
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

            <Button type="submit" className="bg-gray-700">
              Sign Up
            </Button>
            <Label>{status}</Label>
          </form>
        </div>
      )}
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
          <Input type="file" className={inputStyling} />
        </div>
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
