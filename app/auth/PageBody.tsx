"use client";

import { supabase } from "@/lib/supabase/local";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PageBody() {
  const [isLogin, changeIsLogin] = useState(true);
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [status, changeStatus] = useState("");

  async function handleSignUp() {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      changeStatus(error.message);
    } else {
      changeStatus("Verification Email Sent");
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
  }

  return (
    <div className="text-amber-50 p-4">
      {isLogin ? (
        <div>
          {/* Sign In Form */}
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
            <Button onClick={handleSignIn} className="bg-gray-700">
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
            <Button onClick={handleSignUp} className="bg-gray-700">
              Sign Up
            </Button>
            <Label>{status}</Label>
          </form>
        </div>
      )}
    </div>
  );
}
