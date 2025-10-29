"use client";

import { Button } from "@/components/ui/button";

export default function TermsAndConditions({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 relative overflow-hidden">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h3>

        <div className="text-gray-700 text-sm space-y-4 max-h-[65vh] overflow-y-auto pr-2">
          {/* Section 1: Introduction and Platform Description */}
          <p>
            Welcome to **Career Mock**. By accessing or using our platform, you
            agree to comply with the following terms, designed to ensure
            transparency, privacy, and a safe user experience.
          </p>
          <p>
            **Career Mock** is a sophisticated online platform where recruiters
            or hiring teams can generate a unique **AI-powered interview link**.
            This link is then sent to a candidate who can use it to take a mock
            or preliminary interview. Our system processes the interview,
            generates a detailed summary and score, which the recruiter can use
            to inform their hiring decisions.
          </p>

          <hr className="my-4 border-gray-200" />

          {/* Section 2: Data Privacy and Login Information */}
          <h4 className="text-lg font-semibold text-gray-800 pt-2">
            Data Privacy & Login Information
          </h4>
          <p>
            We collect limited user data such as your **email, name, and profile
            image** exclusively for authentication and personalization purposes.
            This data is securely stored within our **Supabase** database—a
            fully secured, industry-grade system—and is **never shared or sold**
            to third parties for marketing or advertising.
          </p>
          <p>
            Any specific data you provide, including job descriptions, chat
            responses, or interview interactions, are used **solely** for
            AI-driven interview generation. These are **not stored permanently**
            nor transmitted to external services beyond the necessary AI
            processing step.
          </p>

          <hr className="my-4 border-gray-200" />

          {/* Section 3: Voice-Based Interview Section */}
          <h4 className="text-lg font-semibold text-gray-800 pt-2">
            Voice-Based Interview & Recording
          </h4>
          <p>
            During a voice-based interview, your voice and answers will be
            recorded **only for the specific purpose of analysis** by our AI
            scoring system. This analysis is used to generate a comprehensive
            summary, track speaking metrics, and score your performance based on
            your confidence, clarity, and the correctness of your answers.
          </p>
          <p>
            **Your voice recordings, answers, or any personal information
            collected during the interview will not be misused, shared, or
            distributed for any external or unauthorized purpose.** They are
            processed under strict data protection protocols.
          </p>

          <hr className="my-4 border-gray-200" />

          {/* Section 4: Acceptance and Commitment */}
          <h4 className="text-lg font-semibold text-gray-800 pt-2">
            Acceptance of Terms
          </h4>
          <p>
            By continuing to use this platform, you acknowledge and accept all
            the opaque systems and conditions outlined above. You understand and
            agree that **Career Mock is fully authorized** to process the
            necessary data as described, and we are committed to ensuring your
            data will not be used for any wrong purpose.
          </p>
          <p>
            For more information or privacy inquiries, contact us at{" "}
            <span className="text-blue-600">support@careermock.com</span>.
          </p>
        </div>

        <div className="mt-6 text-right">
          <Button
            onClick={onClose}
            className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Accept and Close
          </Button>
        </div>
      </div>

      {/* Animation */}
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
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}