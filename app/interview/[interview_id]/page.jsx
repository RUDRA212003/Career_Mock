"use client";
import TermsAndConditions from "@/app/(main)/dashboard/_components/TermsAndConditions";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  Clock,
  Info,
  Video,
  Mic,
  MicOff,
  Wifi,
  WifiOff,
  Loader2,
  CheckCircle,
  // X is now only needed inside the TermsAndConditions component
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast, Toaster } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState("");
  const [userEmail,setUserEmail]=useState();
  const [loading, setLoading] = useState(false);
  const { setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  const [micStatus, setMicStatus] = useState("idle");
  const [netStatus, setNetStatus] = useState("idle");
  const [testing, setTesting] = useState(false);
  // ✅ This state controls the visibility of the modal
  const [showTerms, setShowTerms] = useState(false); 

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: interviews, error } = await supabase
        .from("interviews")
        .select("jobPosition, jobDescription, duration, type, questionList")
        .eq("interview_id", interview_id);

      if (error || !interviews?.length) {
        toast.error("Incorrect Interview Link");
        setLoading(false);
        return;
      }

      setInterviewData(interviews[0]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error("Error fetching interview details");
    }
  };

  const handleFullTest = async () => {
    setTesting(true);
    setMicStatus("idle");
    setNetStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (window.navigator.onLine) setNetStatus("success");
      else setNetStatus("error");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicStatus("success");
        stream.getTracks().forEach((track) => track.stop());
      } catch {
        setMicStatus("error");
      }

      toast.success("Setup test completed!");
    } catch {
      toast.error("Error during setup check.");
    } finally {
      setTesting(false);
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", interview_id);

    if (error || !interviews?.length) {
      toast.error("Invalid interview link");
      setLoading(false);
      return;
    }

    setInterviewInfo({
      userName:userName,
      userEmail:userEmail,
      interviewData: interviews[0],
    });

    router.push(`/interview/${interview_id}/start`);
    setLoading(false);
  };

  const isSystemReady =
    micStatus === "success" && netStatus === "success" && userName.trim() !== "";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 md:px-20 py-10">
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-xl p-6 md:p-10 text-center relative">
          <Toaster />

          <div className="flex justify-center mb-2">
            <Image src="/logo.png" alt="logo" width={130} height={130} />
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-800">
            AI-Powered Interview Platform
          </h1>

          <div className="my-8 flex justify-center">
            <Image
              src="/interview.png"
              alt="interview illustration"
              width={400}
              height={400}
              className="rounded-lg w-full md:w-[400px] h-auto"
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {interviewData?.jobPosition || "Loading..."}
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>{interviewData?.duration || "..."}</span>
          </div>

          <div className="text-left mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Enter Your Full Name
            </label>
            <Input
              placeholder="e.g. Arvind Kumar"
              className="w-full"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>

          <div className="text-left mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Enter Your Email
            </label>
            <Input
              placeholder="arvind@gmail.com"
              className="w-full"
              onChange={(event) => setUserEmail(event.target.value)}
            />
          </div>

          {/* Test Button */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center gap-3">
            <Button
              onClick={handleFullTest}
              disabled={testing}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-5 rounded-xl transition-all duration-300 shadow-md"
            >
              {testing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Wifi className="h-5 w-5" />
              )}
              {testing ? "Testing..." : "Run Setup Test"}
            </Button>
          </div>

          <div className="p-5 bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 rounded-2xl shadow-sm text-left">
            <div className="flex items-center gap-2 mb-2">
              <Info className="text-blue-600 h-5 w-5" />
              <h3 className="text-blue-800 font-semibold text-md">
                Before you begin your interview
              </h3>
            </div>
            <ul className="list-none space-y-2 text-sm text-blue-800 ml-1">
              <li className="flex items-center gap-2">
                {netStatus === "success" ? (
                  <CheckCircle className="text-green-600 h-4 w-4" />
                ) : netStatus === "error" ? (
                  <WifiOff className="text-red-600 h-4 w-4" />
                ) : (
                  <Wifi className="text-blue-500 h-4 w-4" />
                )}
                Ensure you have a stable internet connection
              </li>
              <li className="flex items-center gap-2">
                {micStatus === "success" ? (
                  <CheckCircle className="text-green-600 h-4 w-4" />
                ) : micStatus === "error" ? (
                  <MicOff className="text-red-600 h-4 w-4" />
                ) : (
                  <Mic className="text-blue-500 h-4 w-4" />
                )}
                Test your microphone
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4 w-4 border border-blue-400 rounded-full" />
                Be in a quiet area for the interview
              </li>
            </ul>
          </div>

          {/* Join Button */}
          <Button
            className={`mt-7 w-full flex items-center justify-center gap-2 font-semibold py-6 rounded-xl transition-all duration-300 shadow-md ${
              isSystemReady
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!isSystemReady || loading}
            onClick={onJoinInterview}
          >
            <Video className="h-5 w-5" />
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {isSystemReady ? "Join Interview" : "Complete Setup to Join"}
          </Button>

          {/* ✅ Terms & Conditions link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <button
              onClick={() => setShowTerms(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Correctly using the imported TermsAndConditions component as a modal */}
      {showTerms && (
        <TermsAndConditions onClose={() => setShowTerms(false)} />
      )}
    </>
  );
}

export default Interview;