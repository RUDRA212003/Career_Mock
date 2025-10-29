import Image from "next/image"
import React from "react"

function InterviewHeader() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-start px-6 py-3">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={150}
          className="rounded-full object-contain"
        />
      </div>
    </header>
  )
}

export default InterviewHeader
