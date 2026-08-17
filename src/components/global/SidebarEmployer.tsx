"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import { useRecruiterChatStore } from "@/store/useRecruiterChatStore";
import { cn } from "@/utils/cn";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  Sparkles,
  Database,
  Calendar,
  Mail,
  Bell,
  Building,
  UserPlus,
  BarChart3,
  CreditCard,
  Heart,
  FileSpreadsheet,
  Settings,
  LogOut
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

export const SidebarEmployer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserStore();
  const { notifications } = useChatStore();
  const { messages } = useRecruiterChatStore();

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.filter((m) => !m.isRead && m.senderId !== "cand-1").length;

  if (!user || user.role !== "employer") return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const employerItems: SidebarItem[] = [
    { label: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
    { label: "Post a Job", href: "/employer/post-job", icon: PlusCircle },
    { label: "Active Jobs", href: "/employer/active-jobs", icon: Briefcase },
    { label: "Applicants", href: "/employer/applicants", icon: Users },
    { label: "AI Candidate Matching", href: "/employer/ai-matching", icon: Sparkles },
    { label: "Talent Pool", href: "/employer/talent-pool", icon: Database },
    { label: "Interview Management", href: "/employer/interviews", icon: Calendar },
    { label: "Messages", href: "/employer/messages", icon: Mail, badge: unreadMessages },
    { label: "Notifications", href: "/employer/notifications", icon: Bell, badge: unreadNotifications },
    { label: "Company Profile", href: "/employer/profile", icon: Building },
    { label: "Team Members", href: "/employer/team", icon: UserPlus },
    { label: "Analytics", href: "/employer/analytics", icon: BarChart3 },
    { label: "Billing & Subscription", href: "/employer/billing", icon: CreditCard },
    { label: "Saved Candidates", href: "/employer/saved-candidates", icon: Heart },
    { label: "Reports", href: "/employer/reports", icon: FileSpreadsheet },
    { label: "Settings", href: "/employer/settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex w-64 border border-white/40 bg-white/55 backdrop-blur-2xl flex-col h-[calc(100vh-112px)] sticky top-24 m-4 mr-0 rounded-2xl shadow-premium overflow-y-auto flex-shrink-0">
      
      {/* Navigation list */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <LayoutGroup id="employer-sidebar-group">
          {employerItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors",
                  isActive
                    ? "text-white"
                    : "text-text-secondary hover:bg-ice-blue hover:text-primary-navy"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-employer-sidebar-indicator"
                    className="absolute inset-0 bg-primary-navy rounded-lg shadow-md shadow-primary-navy/15 z-0"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-text-muted group-hover:text-primary-navy")} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={cn(
                      "relative z-10 flex h-5 px-1.5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold",
                      isActive ? "bg-white text-primary-navy font-extrabold" : "bg-primary-navy/10 text-primary-navy"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </LayoutGroup>
      </nav>

      {/* Sign Out block */}
      <div className="p-4 border-t border-border-color bg-slate-50/50 flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-border-color bg-white hover:bg-rose-50 hover:text-rose-600 transition-colors text-xs font-extrabold uppercase tracking-wider text-text-secondary cursor-pointer shadow-sm"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
};
