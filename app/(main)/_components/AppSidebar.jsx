"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { Plus, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import TermsAndConditions from "../dashboard/_components/TermsAndConditions";

export function AppSidebar({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [showTerms, setShowTerms] = useState(false); // ✅ modal state

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ✅ Sidebar Section */}
      <div
        className={`bg-white border-r border-gray-200 shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        {isOpen && (
          <>
            {/* HEADER */}
            <SidebarHeader className="flex flex-col items-center mt-5">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={200}
                height={100}
                className="w-[150px]"
              />
              <Button
                className="w-[85%] mt-5 flex items-center gap-2"
                onClick={() => router.push("/dashboard/create-interview")}
              >
                <Plus size={16} />
                Create new Interview
              </Button>
            </SidebarHeader>

            {/* MAIN MENU */}
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  {SideBarOptions.map((option, index) => {
                    const isActive =
                      option?.path && path?.startsWith(option.path);
                    return (
                      <SidebarMenuItem key={index} className="p-1">
                        <SidebarMenuButton asChild className="p-5">
                          {option?.path ? (
                            <Link
                              href={option.path}
                              className={`flex items-center gap-2 w-full rounded-md transition-colors ${
                                isActive
                                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-600"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <option.icon size={18} />
                              <span className="text-[16px]">{option.name}</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={
                                option?.onClick ? option.onClick : () => {}
                              }
                              className={`flex items-center gap-2 w-full text-left rounded-md px-2 py-1 transition ${
                                isActive
                                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-600"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <option.icon size={18} />
                              <span className="text-[16px]">
                                {option.name}
                              </span>
                            </button>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="text-sm text-gray-500 text-center py-3">
              © {new Date().getFullYear()} Career Mock
              <div
                onClick={() => setShowTerms(true)}
                className="text-blue-600 underline cursor-pointer mt-1 hover:text-blue-800"
              >
                Terms & Conditions
              </div>
            </SidebarFooter>
          </>
        )}
      </div>

      {/* ✅ Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-0 md:ml-64" : "ml-0"
        }`}
      >
        {/* Toggle Sidebar Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className="m-4 fixed top left-4 z-50 bg-white shadow-md"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>

        {/* Actual page content */}
        <div className="p-4">{children}</div>
      </div>

      {/* ✅ Reusable Terms & Conditions Modal */}
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}

      {/* 🔹 Animation */}
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
