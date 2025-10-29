"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  List,
  Play,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

  const GetInterviewUrl = () => url;

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Interview link copied!");
  };

  const onStartInstant = () => {
    window.open(url, "_blank");
    toast("Opening interview in a new tab...");
  };

  // ✅ WhatsApp Share
  const handleWhatsAppShare = () => {
    const message = `🚀 Hey! Check out this AI interview: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // ✅ Email Share
  const handleEmailShare = () => {
    const subject = "Your AI Interview Invitation";
    const body = `Hello,\n\nYou have been invited to attend an AI-powered interview.\n\nClick the link below to start:\n${url}\n\nBest regards,\nCareer Mock`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-10 py-10 max-w-3xl mx-auto">
      {/* ✅ Success Animation */}
      <div className="flex flex-col items-center justify-center">
        <video
          src="/check-suc.mp4"
          height={200}
          width={200}
          autoPlay
          muted
          playsInline
          loop
          className="rounded-full"
        />
      </div>

      <h2 className="font-bold text-2xl sm:text-3xl mt-4 text-gray-800 text-center">
        Your AI Interview is Ready 
      </h2>
      <p className="mt-3 text-gray-600 text-center text-sm sm:text-base max-w-md">
        Share this link with your candidates to start their interview.
      </p>

      {/* === Interview Link Card === */}
      <div className="w-full p-6 sm:p-8 mt-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="font-bold text-gray-800">Interview Link</h2>
          <span className="p-1 px-3 text-sm font-medium text-yellow-800 bg-yellow-200 rounded-full">
            Valid for 30 Days
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
          <Input
            value={GetInterviewUrl()}
            readOnly
            className="text-gray-700"
          />
          <Button
            onClick={onCopyLink}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Copy className="h-4 w-4" /> Copy Link
          </Button>
        </div>

        {/* ✅ Start Instant Button */}
        <div className="mt-4 flex justify-end">
          <Button
            onClick={onStartInstant}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            <Play className="h-4 w-4" /> Start Instant
          </Button>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* ✅ Info Row */}
        <div className="flex flex-wrap gap-5 text-gray-600 text-sm justify-center sm:justify-start">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {formData?.duration || "30 Min"}
          </span>
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" /> 10 Questions
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {formData?.date || "Anytime"}
          </span>
        </div>
      </div>

      {/* === Share Section === */}
      <div className="mt-8 bg-gray-100 p-6 w-full rounded-2xl text-center shadow-sm">
        <h2 className="font-semibold text-gray-700 text-lg">Share Via</h2>

        <div className="flex flex-wrap justify-center gap-5 mt-6">
          {/* ✅ Email Share Button */}
          <Button
            variant="outline"
            onClick={handleEmailShare}
            className="flex items-center justify-center gap-2 border-gray-300 bg-white hover:bg-blue-50 w-40 sm:w-auto"
          >
            <Image
              src="/mail.png"
              alt="Email"
              width={22}
              height={22}
              className="object-contain"
            />
            Email
          </Button>

          {/* ✅ WhatsApp Share Button */}
          <Button
            variant="outline"
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 border-gray-300 bg-white hover:bg-green-50 w-40 sm:w-auto"
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={22}
              height={22}
              className="object-contain"
            />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* === Navigation Buttons === */}
      <div className="flex flex-col sm:flex-row w-full gap-4 justify-between mt-8">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 w-full"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>

        <Link href="/dashboard/create-interview" className="w-full sm:w-auto">
          <Button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
