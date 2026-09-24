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
    const { data, error } = await supabase.auth.signUp({ email, password });
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
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => {
                changeEmail(e.target.value);
              }}
              className="bg-gray-700 border-0 focus-visible:ring-0"
            />

            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                changePassword(e.target.value);
              }}
              className="bg-gray-700 border-0 focus-visible:ring-0"
            />
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
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => {
                changeName(e.target.value);
              }}
              className="bg-gray-700 border-0 focus-visible:ring-0"
            />
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => {
                changeEmail(e.target.value);
              }}
              className="bg-gray-700 border-0 focus-visible:ring-0"
            />
            <Label>Phone Number</Label>
            <Input
              value={phone}
              onChange={(e) => {
                changePhone(e.target.value);
              }}
              className="bg-gray-700 border-0 focus-visible:ring-0"
            />
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                changePassword(e.target.value);
              }}
              className="bg-gray-700 border-0 focus-visible:ring-0"
            />
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
      <Label>Welcome {displayName}</Label>
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
