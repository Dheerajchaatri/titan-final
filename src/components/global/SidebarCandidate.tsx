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
  Sparkles,
  FileText,
  Heart,
  Briefcase,
  FileEdit,
  FileCheck,
  ShieldCheck,
  BadgeCheck,
  Mail,
  Bell,
  User,
  Settings,
  LogOut,
  Rocket
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

export const SidebarCandidate: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserStore();
  const { notifications } = useChatStore();
  const { messages } = useRecruiterChatStore();

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.filter((m) => !m.isRead && m.senderId !== "cand-1").length;

  if (!user || user.role !== "candidate") return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const candidateItems: SidebarItem[] = [
    { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
    { label: "AI Career Assistant", href: "/candidate/profile?tab=ai-assistant", icon: Sparkles },
    { label: "My Applications", href: "/candidate/applied-jobs", icon: FileText },
    { label: "Saved Jobs", href: "/candidate/saved-jobs", icon: Heart },
    { label: "Recommended Jobs", href: "/jobs?tab=recommended", icon: Briefcase },
    { label: "Resume Builder", href: "/candidate/resume-builder", icon: FileEdit },
    { label: "Resume Analysis", href: "/candidate/resume-analyzer", icon: FileCheck },
    { label: "Skill Assessment", href: "/candidate/skills-assessment", icon: ShieldCheck },
    { label: "Certificates", href: "/candidate/certificates", icon: BadgeCheck },
    { label: "Messages", href: "/candidate/messages", icon: Mail, badge: unreadMessages },
    { label: "Notifications", href: "/candidate/notifications", icon: Bell, badge: unreadNotifications },
    { label: "Profile", href: "/candidate/profile", icon: User },
    { label: "Settings", href: "/candidate/settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex w-64 border border-white/40 bg-white/55 backdrop-blur-2xl flex-col h-[calc(100vh-112px)] sticky top-24 m-4 mr-0 rounded-2xl shadow-premium overflow-y-auto flex-shrink-0">
      
      {/* Navigation list */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <LayoutGroup id="candidate-sidebar-group">
          {candidateItems.map((item) => {
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
                    layoutId="active-candidate-sidebar-indicator"
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

      {/* Upgrade Banner & Sign Out */}
      <div className="p-4 border-t border-border-color bg-ice-blue-light flex flex-col gap-4">
        <div className="relative rounded-2xl bg-primary-navy p-4 text-white overflow-hidden shadow-lg shadow-primary-navy/10 group">
          {/* Background elements */}
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform">
            <Rocket className="h-28 w-28 -mr-4 -mb-4 rotate-12" />
          </div>
          
          <h5 className="text-xs font-extrabold uppercase tracking-widest text-white">Upgrade Your Career</h5>
          <p className="text-[10px] text-slate-200 mt-1 leading-snug">
            Get advanced AI insights, resume assessments, and interview simulator access.
          </p>
          <Link href="/pricing" className="block mt-3">
            <button className="w-full bg-white text-primary-navy font-extrabold text-[10px] uppercase tracking-wider py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shadow">
              Upgrade Now
            </button>
          </Link>
        </div>

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
