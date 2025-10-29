"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2, Mic, MicOff, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_component/AlertConfirmation";
import { toast } from "sonner";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [vapi, setVapi] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const [callConnected, setCallConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  // --- Initialize & Connect Vapi ---
  useEffect(() => {
    if (!interviewInfo) return;

    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    setVapi(vapiInstance);
    startCall(vapiInstance);

    // Cleanup listeners & timer when component unmounts
    return () => {
      try {
        vapiInstance.stop();
      } catch (e) {
        console.warn("Error stopping Vapi instance:", e);
      }
      clearInterval(timerRef.current);
    };
  }, [interviewInfo]);

  // --- Start Call ---
  const startCall = (vapiInstance) => {
    if (!interviewInfo?.interviewData?.questionList) {
      toast.error("No interview questions found.");
      return;
    }

    const questionList = interviewInfo.interviewData.questionList
      .map((item) => item?.question)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
              You are an AI recruiter conducting a professional interview.
              Ask one question at a time from this list: ${questionList}.
              Wait for the candidate to respond.
              Give brief feedback and move to the next question.
              End politely once all questions are done.
            `,
          },
        ],
      },
    };

    setIsLoading(true);
    toast("AI Interviewer is connecting...");

    // --- Event Handlers ---
    vapiInstance.on("call-start", () => {
      console.log("✅ Call started");
      setCallConnected(true);
      setIsLoading(false);
      toast.success("AI Interviewer connected!");
      startTimer();
    });

    vapiInstance.on("speech-start", () => setActiveUser(false));
    vapiInstance.on("speech-end", () => setActiveUser(true));

    vapiInstance.on("call-end", () => {
      console.log("❌ Call ended");
      toast("Interview disconnected");
      setCallConnected(false);
      setIsLoading(false);
      stopTimer();
    });

    // ✅ FIXED: use vapiInstance instead of null vapi state
    vapiInstance.on("message", (message) => {
      console.log("Vapi message:", message);
    });

    // Start Vapi call
    try {
      vapiInstance.start(assistantOptions);
    } catch (error) {
      console.error("Error starting Vapi call:", error);
      toast.error("Failed to start interview. Please try again.");
      setIsLoading(false);
    }
  };

  // --- Stop Call ---
  const stopInterview = () => {
    if (vapi) {
      try {
        vapi.stop();
        toast("Interview ended");
      } catch (e) {
        console.warn("Error stopping interview:", e);
      }
      setCallConnected(false);
      stopTimer();
    }
  };

  // --- Mute / Unmute ---
  const toggleMute = () => {
    if (!vapi) return;
    if (isMuted) {
      vapi.unmute();
      toast("Microphone unmuted");
    } else {
      vapi.mute();
      toast("Microphone muted");
    }
    setIsMuted(!isMuted);
  };

  // --- Timer Logic ---
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="p-8 lg:px-16 transition-all duration-500">
      <h2 className="font-bold text-xl flex justify-between items-center mb-6">
        AI Interview Session
        <span className="flex gap-2 items-center text-gray-600">
          <Timer className="h-5 w-5" />
          {formatTime(elapsedTime)}
        </span>
      </h2>

      {/* --- Loading Screen --- */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-xl shadow-inner gap-3">
          <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
          <p className="text-gray-600 font-medium">
            AI Interviewer is connecting...
          </p>
        </div>
      )}

      {/* --- Interview Screen --- */}
      {!isLoading && (
        <>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-7 mt-5 rounded-xl transition-all duration-500 ${
              callConnected ? "bg-green-50" : "bg-gray-50"
            } p-6`}
          >
            {/* --- AI Recruiter --- */}
            <div
              className={`relative h-[400px] rounded-lg flex border items-center justify-center flex-col gap-3 shadow-md bg-white transition-all duration-500 ${
                !activeUser && callConnected
                  ? "border-4 border-blue-400 shadow-[0_0_20px_#60a5fa]"
                  : "border-gray-200"
              }`}
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 rounded-full ${
                    !activeUser && callConnected
                      ? "bg-blue-400 opacity-40 animate-ping"
                      : "hidden"
                  }`}
                ></div>
                <Image
                  src="/ai.png"
                  alt="ai avatar"
                  width={150}
                  height={150}
                  className={`rounded-full object-cover relative z-10 ${
                    !activeUser && callConnected
                      ? "ring-4 ring-blue-400 shadow-lg shadow-blue-300 transition-all duration-500"
                      : ""
                  }`}
                />
              </div>
              <h2 className="mt-3 font-semibold text-gray-700">AI Recruiter</h2>
            </div>

            {/* --- User --- */}
            <div
              className={`relative h-[400px] rounded-lg flex border items-center justify-center flex-col gap-3 shadow-md bg-white transition-all duration-500 ${
                activeUser && callConnected
                  ? "border-4 border-green-400 shadow-[0_0_20px_#4ade80]"
                  : "border-gray-200"
              }`}
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 rounded-full ${
                    activeUser && callConnected
                      ? "bg-green-400 opacity-40 animate-ping"
                      : "hidden"
                  }`}
                ></div>
                <h2
                  className={`text-2xl bg-primary text-white p-3 rounded-full px-6 relative z-10 transition-all duration-500 ${
                    activeUser && callConnected
                      ? "ring-4 ring-green-400 shadow-lg shadow-green-300"
                      : ""
                  }`}
                >
                  {interviewInfo?.userName?.[0]}
                </h2>
              </div>
              <h2 className="mt-3 font-semibold text-gray-700">
                {interviewInfo?.userName}
              </h2>
            </div>
          </div>

          {/* --- Controls --- */}
          <div className="flex items-center mt-8 justify-center gap-6">
            <button onClick={toggleMute}>
              {isMuted ? (
                <MicOff className="h-12 w-12 p-3 bg-gray-400 text-white rounded-full cursor-pointer hover:scale-110 transition" />
              ) : (
                <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer hover:scale-110 transition" />
              )}
            </button>

            <AlertConfirmation stopInterview={stopInterview}>
              <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer hover:scale-110 transition" />
            </AlertConfirmation>
          </div>

          <h2 className="text-sm text-gray-500 text-center mt-5">
            {callConnected
              ? isMuted
                ? "You are muted. Tap mic to unmute."
                : "Interview is in progress..."
              : "Waiting for AI Interviewer..."}
          </h2>
        </>
      )}
    </div>
  );
}

export default StartInterview;
