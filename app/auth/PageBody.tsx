"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PageBody() {
  const [isLogin, changeIsLogin] = useState(true);
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  return (
    <div className="text-amber-50 p-4">
      {isLogin ? (
        <div>
          {/* Sign In Form */}
          <div className="bg-[#4f4f4f] rounded-2xl p-1 inline-flex">
            {/* Toggle Pages */}
            <Button className="bg-[#1d1d1d] rounded-2xl p-2">Sign In</Button>
            <Button
              onClick={() => {
                changeIsLogin(!isLogin);
              }}
              className="hover:cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
          <div>
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
              value={password}
              onChange={(e) => {
                changePassword(e.target.value);
              }}
              className="bg-gray-700 border-0 focus-visible:ring-0"
            />
          </div>
        </div>
      ) : (
        <div className="bg-[#4f4f4f] rounded-2xl p-1 inline-flex">
          {/* Sign Up Form */}
          <Button
            onClick={() => {
              changeIsLogin(!isLogin);
            }}
            className="hover:cursor-pointer"
          >
            Sign In
          </Button>
          <Button className="bg-[#1d1d1d] rounded-2xl p-2 hover:cursor-pointer">
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
