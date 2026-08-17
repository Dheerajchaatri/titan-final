"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Navbar } from "@/components/global/Navbar";
import { SidebarEmployer } from "@/components/global/SidebarEmployer";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated || !user) {
      router.push("/auth/login");
    } else if (user.role !== "employer") {
      if (user.role === "candidate") {
        router.push("/candidate/dashboard");
      } else if (user.role === "admin") {
        router.push("/admin/dashboard");
      }
    }
  }, [mounted, isAuthenticated, user, router]);

  if (!mounted || !isAuthenticated || !user || user.role !== "employer") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary-navy" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-xs font-bold text-primary-navy uppercase tracking-widest">Loading Recruiter Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] panel-montserrat">
      <Navbar />
      <div className="flex flex-1 relative">
        <SidebarEmployer />
        <main className="flex-1 overflow-y-auto px-6 py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
