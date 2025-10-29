"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGetStarted = () => {
    setIsTransitioning(true);

    // Wait for the fade-out animation to complete before navigating
    setTimeout(() => {
      router.push("/auth");
    }, 700); // match animation duration
  };

  return (
    <main
      className={`relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white transition-opacity duration-700 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      >
        <source src="/greet-vid.mp4" type="video/mp4" />
      </video>

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      {/* 🔹 Content */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 animate-fadeIn">
        {/* Logo (optional) */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Career Mock Logo"
            width={220}
            height={70}
            className="w-[180px] sm:w-[220px] h-auto"
            priority
          />
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 drop-shadow-lg">
         Welcome Back
        </h1>

        <p className="text-gray-200 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Welcome to <span className="text-blue-400 font-semibold">Career Mock</span> — 
          your personalized space to grow, learn, and succeed.
        </p>

        <Button
          onClick={handleGetStarted}
          className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          Get Started
        </Button>
      </section>

      {/* 🔹 Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Career Mock. All rights reserved.
      </footer>

      {/* 🔹 Fade-in animation for entry */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
