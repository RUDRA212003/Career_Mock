"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // ✅ modal state

  // ✅ Google Sign-In Only
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      toast.error(error.message || "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
      {/* Logo */}
      <div className="mb-12">
        <Image
          src="/logo.png"
          alt="Career Mock Logo"
          width={300}
          height={80}
          className="w-[200px] sm:w-[250px] h-auto"
          priority
        />
      </div>

      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-6 w-full max-w-md text-center animate-fadeIn">
        {/* Illustration */}
        <div className="relative w-[280px] sm:w-[350px] h-[200px] sm:h-[250px] mb-4">
          <Image src="/login.png" alt="Login Illustration" fill className="object-contain" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900">Welcome to Career Mock</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Sign in with your Google account to continue
        </p>

        {/* Google Button */}
        <Button
          onClick={signInWithGoogle}
          disabled={loading}
          className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Image
            src="/google.png"
            alt="Google"
            width={24}
            height={24}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-sm sm:text-base">
            {loading ? "Loading..." : "Sign in with Google"}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-red-100 opacity-0 group-hover:opacity-80 transition-opacity duration-500 rounded-lg -z-10"></span>
        </Button>

        {/* Terms of Service link */}
        <p className="mt-4 text-gray-400 text-xs">
          By signing in, you agree to our{" "}
          <span
            onClick={() => setShowTerms(true)}
            className="text-blue-600 underline cursor-pointer"
          >
            Terms of Service
          </span>
        </p>
      </div>

      {/* ✅ Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h3>

            <div className="text-gray-700 text-sm space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <p>
                Welcome to <strong>Career Mock</strong>. By using our platform, you agree
                to the following terms and privacy practices.
              </p>

              <p>
                We value your privacy and security. Our login system is fully
                integrated with <strong>Supabase Authentication</strong>, a
                trusted platform that follows industry-standard security
                practices. Your personal information is <strong>never sold,
                shared, or misused</strong> in any way.
              </p>

              <p>
                During authentication, we only access basic profile details
                such as your <strong>name, email address, and profile picture</strong>.
                This data is used strictly for identification and
                personalization within our platform—for example, displaying
                your name and image in your interview dashboard.
              </p>

              <p>
                We do <strong>not</strong> send spam messages, promotional
                emails, or any unsolicited communications. Your email address
                will not be used for marketing or shared with any third party.
              </p>

              <p>
                We take appropriate measures to ensure that your data is
                secure and protected. Our systems follow standard encryption
                protocols and do not store sensitive information such as
                passwords in plain text.
              </p>

              <p>
                By signing in, you acknowledge that Career Mock does not engage
                in any illegal, unethical, or spam-related activities, and your
                information is handled solely for providing a secure and
                professional mock interview experience.
              </p>

              
            </div>

            <div className="mt-6 text-right">
              <Button
                onClick={() => setShowTerms(false)}
                className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Simple fade-in animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
