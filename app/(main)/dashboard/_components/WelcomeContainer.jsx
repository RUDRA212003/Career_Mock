"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="border border-amber-300 border-2 p-3 rounded-lg flex flex-col md:flex-row justify-between items-center gap-3">
      {/* Left side: video + text */}
      <div className="flex items-center gap-3">
        {/* Robot Greeting Video */}
        <video
          src="/greet-vid.mp4" // Your video in public folder
          autoPlay
          muted
          loop
          playsInline
          className="w-[110px] md:w-[140px] rounded-md"
        />

        <div>
          <h1 className="text-base font-medium text-gray-800">Welcome Back,</h1>
          <h1 className="text-2xl font-extrabold text-blue-600">
            {user?.name || "User"}
          </h1>
          <h2 className="text-gray-500 mt-0.5 text-sm">
            AI-driven interview platform for your practice
          </h2>
        </div>
      </div>

      {/* Right side: user avatar */}
      {user && (
        <Image
          src={user.picture}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full border border-red-300"
        />
      )}
    </div>
  );
}

export default WelcomeContainer;
