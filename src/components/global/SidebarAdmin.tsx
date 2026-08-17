"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/utils/cn";
import {
  LayoutDashboard,
  Shield,
  Users,
  Building,
  Briefcase,
  FileText,
  BrainCircuit,
  Mail,
  Bell,
  FileSpreadsheet,
  BarChart3,
  DollarSign,
  CreditCard,
  Percent,
  CheckCircle,
  HelpCircle,
  Database,
  Lock,
  Settings,
  LogOut,
  Sliders,
  Send,
  Cpu,
  Server,
  CloudLightning,
  Workflow,
  Wrench
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
}

export const SidebarAdmin: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserStore();

  if (!user || user.role !== "admin") return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const adminItems: SidebarItem[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Candidate Management", href: "/admin/candidates", icon: Users },
    { label: "Employer Management", href: "/admin/employers", icon: Building },
    { label: "Admin Management", href: "/admin/admins", icon: Shield },
    { label: "Job Management", href: "/admin/jobs", icon: Briefcase },
    { label: "Company Management", href: "/admin/companies", icon: Building },
    { label: "Applications", href: "/admin/applications", icon: FileText },
    { label: "AI Monitoring", href: "/admin/ai-monitoring", icon: BrainCircuit },
    { label: "Messages", href: "/admin/messages", icon: Mail },
    { label: "Notifications", href: "/admin/notifications", icon: Bell },
    { label: "Reports", href: "/admin/reports", icon: FileSpreadsheet },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Revenue", href: "/admin/revenue", icon: DollarSign },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Payments", href: "/admin/payments", icon: Percent },
    { label: "Verification Requests", href: "/admin/verifications", icon: CheckCircle },
    { label: "Approvals", href: "/admin/approvals", icon: CheckCircle },
    { label: "Content Management", href: "/admin/content", icon: FileText },
    { label: "Blog Management", href: "/admin/blog", icon: FileText },
    { label: "Support Tickets", href: "/admin/support", icon: HelpCircle },
    { label: "Contact Messages", href: "/admin/contact-messages", icon: Mail },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: Database },
    { label: "Activity Logs", href: "/admin/activity-logs", icon: BarChart3 },
    { label: "Roles & Permissions", href: "/admin/roles-permissions", icon: Lock },
    { label: "Platform Settings", href: "/admin/platform-settings", icon: Settings },
    { label: "Email Templates", href: "/admin/email-templates", icon: Sliders },
    { label: "Notification Templates", href: "/admin/notification-templates", icon: Send },
    { label: "AI Configuration", href: "/admin/ai-config", icon: Cpu },
    { label: "System Configuration", href: "/admin/system-config", icon: Server },
    { label: "Backup & Restore", href: "/admin/backup", icon: Database },
    { label: "Security", href: "/admin/security", icon: Lock },
    { label: "Database Monitor", href: "/admin/database-monitor", icon: Server },
    { label: "API Management", href: "/admin/api", icon: CloudLightning },
    { label: "Integrations", href: "/admin/integrations", icon: Workflow },
    { label: "Settings", href: "/admin/settings", icon: Wrench },
  ];

  return (
    <aside className="hidden lg:flex w-64 border border-white/40 bg-white/55 backdrop-blur-2xl flex-col h-[calc(100vh-112px)] sticky top-24 m-4 mr-0 rounded-2xl shadow-premium overflow-y-auto flex-shrink-0">
      
      {/* Navigation list */}
      <nav className="flex-grow px-4 py-6 space-y-1">
        <LayoutGroup id="admin-sidebar-group">
          {adminItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors",
                  isActive
                    ? "text-white"
                    : "text-text-secondary hover:bg-ice-blue hover:text-primary-navy"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-admin-sidebar-indicator"
                    className="absolute inset-0 bg-primary-navy rounded-lg shadow-md shadow-primary-navy/15 z-0"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <Icon className={cn("relative z-10 h-4.5 w-4.5", isActive ? "text-white" : "text-text-muted")} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </LayoutGroup>
      </nav>

      {/* Sign Out block */}
      <div className="p-4 border-t border-border-color bg-slate-50/50 flex flex-col gap-4 flex-shrink-0">
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
