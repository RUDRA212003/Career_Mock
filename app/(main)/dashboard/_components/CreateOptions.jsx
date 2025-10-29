"use client";

import { Phone, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function CreateOptions() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Create New Interview
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Create a Ai interview to check your potential
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Create Interview Card */}
        <Link
          href="/dashboard/create-interview"
          className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-center justify-center bg-blue-50 rounded-lg h-12 w-12 mb-4">
            <Video className="text-blue-600 h-6 w-6" />
          </div>
          <h2 className="font-semibold text-lg text-gray-900">
            Create New Interview
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Generate an AI-powered interview to test your skills and confidence.
          </p>
        </Link>

        {/* Create Phone Screening Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-center bg-blue-50 rounded-lg h-12 w-12 mb-4">
            <Phone className="text-blue-600 h-6 w-6" />
          </div>
          <h2 className="font-semibold text-lg text-gray-900">
            Create Phone Screening
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Simulate a phone interview to assess your communication skills.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateOptions;
