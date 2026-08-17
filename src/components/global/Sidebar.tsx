"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import { useRecruiterChatStore } from "@/store/useRecruiterChatStore";
import { cn } from "@/utils/cn";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Heart,
  Briefcase,
  FileEdit,
  FileCheck,
  Gamepad2,
  ShieldCheck,
  BadgeCheck,
  Mail,
  Bell,
  User,
  Settings,
  LogOut,
  Building2,
  PlusCircle,
  Users,
  CreditCard,
  Building,
  BarChart3,
  Rocket,
  Database,
  Calendar,
  UserPlus,
  FileSpreadsheet
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserStore();
  const { notifications } = useChatStore();
  const { messages } = useRecruiterChatStore();

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.filter((m) => !m.isRead && m.senderId !== "cand-1").length;

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Candidate Navigation Items
  const candidateItems: SidebarItem[] = [
    { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
    { label: "AI Career Assistant", href: "/candidate/career-assistant", icon: Sparkles },
    { label: "My Applications", href: "/candidate/applied-jobs", icon: FileText },
    { label: "Saved Jobs", href: "/candidate/saved-jobs", icon: Heart },
    { label: "Recommended Jobs", href: "/jobs?tab=recommended", icon: Briefcase },
    { label: "Resume Builder", href: "/candidate/resume-builder", icon: FileEdit },
    { label: "Resume Analysis", href: "/candidate/resume-analyzer", icon: FileCheck },
    { label: "Interview Preparation", href: "/candidate/interview-prep", icon: Gamepad2 },
    { label: "Skill Assessment", href: "/candidate/skills-assessment", icon: ShieldCheck },
    { label: "Certificates", href: "/candidate/certificates", icon: BadgeCheck },
    { label: "Messages", href: "/candidate/messages", icon: Mail, badge: unreadMessages },
    { label: "Notifications", href: "/candidate/notifications", icon: Bell, badge: unreadNotifications },
    { label: "Profile", href: "/candidate/profile", icon: User },
    { label: "Settings", href: "/candidate/settings", icon: Settings },
  ];

  // Employer Navigation Items
  const employerItems: SidebarItem[] = [
    { label: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
    { label: "Post a Job", href: "/employer/post-job", icon: PlusCircle },
    { label: "Active Jobs", href: "/employer/active-jobs", icon: Briefcase },
    { label: "Applicants", href: "/employer/applicants", icon: Users },
    { label: "AI Candidate Matching", href: "/employer/ai-matching", icon: Sparkles },
    { label: "Talent Pool", href: "/employer/talent-pool", icon: Database },
    { label: "Interview Management", href: "/employer/interviews", icon: Calendar },
    { label: "Messages", href: "/employer/messages", icon: Mail },
    { label: "Notifications", href: "/employer/notifications", icon: Bell },
    { label: "Company Profile", href: "/employer/profile", icon: Building },
    { label: "Team Members", href: "/employer/team", icon: UserPlus },
    { label: "Analytics", href: "/employer/analytics", icon: BarChart3 },
    { label: "Billing & Subscription", href: "/employer/billing", icon: CreditCard },
    { label: "Saved Candidates", href: "/employer/saved-candidates", icon: Heart },
    { label: "Reports", href: "/employer/reports", icon: FileSpreadsheet },
    { label: "Settings", href: "/employer/settings", icon: Settings },
  ];

  // Admin Navigation Items
  const adminItems: SidebarItem[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  ];

  const items =
    user.role === "admin"
      ? adminItems
      : user.role === "employer"
      ? employerItems
      : candidateItems;

  return (
    <aside className="w-64 border-r border-border-color bg-white flex flex-col h-[calc(100vh-80px)] sticky top-20 overflow-y-auto">
      
      {/* Brand logo container */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-start gap-3 select-none">
        <img src="/logo.png" alt="TITAN Logo" className="h-8 w-auto object-contain" />
        <div className="flex flex-col">
          <span className="font-black text-sm tracking-tight text-primary-navy leading-none">TITAN</span>
          <span className="text-[8px] font-semibold text-gold tracking-widest leading-none mt-0.5 uppercase">Taj Institute</span>
        </div>
      </div>
      
      {/* Navigation list */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                isActive
                  ? "bg-primary-navy text-white shadow-md shadow-primary-navy/15"
                  : "text-text-secondary hover:bg-ice-blue hover:text-primary-navy"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-text-muted group-hover:text-primary-navy")} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={cn(
                    "flex h-5 px-1.5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold",
                    isActive ? "bg-gold text-primary-navy-dark" : "bg-ice-blue text-primary-navy"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Banner & Sign Out */}
      <div className="p-4 border-t border-border-color bg-ice-blue-light flex flex-col gap-4">
        {user.role === "candidate" && (
          <div className="relative rounded-2xl bg-gradient-to-br from-primary-navy to-primary-navy-light p-4 text-white overflow-hidden shadow-lg shadow-primary-navy/10 group">
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform">
              <Rocket className="h-28 w-28 -mr-4 -mb-4 rotate-12" />
            </div>
            
            <h5 className="text-xs font-extrabold uppercase tracking-widest text-gold">Upgrade Your Career</h5>
            <p className="text-[10px] text-slate-300 mt-1 leading-snug">
              Get advanced AI insights, resume assessments, and interview simulator access.
            </p>
            <Link href="/pricing" className="block mt-3">
              <button className="w-full bg-white text-primary-navy font-extrabold text-[10px] uppercase tracking-wider py-2 rounded-lg hover:bg-gold hover:text-primary-navy-dark transition-colors cursor-pointer shadow">
                Upgrade Now
              </button>
            </Link>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors uppercase tracking-wider text-left cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
};
