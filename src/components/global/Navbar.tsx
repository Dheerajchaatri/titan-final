"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { useUserStore, UserRole } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import { useRecruiterChatStore } from "@/store/useRecruiterChatStore";
import { Button } from "@/components/ui/Button";
import { Bell, MessageSquare, Shield, Users, Briefcase, LogOut, ChevronDown, User as UserIcon, Settings, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout, switchRole } = useUserStore();
  const { notifications } = useChatStore();
  const { messages } = useRecruiterChatStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.filter((m) => !m.isRead && m.senderId !== "cand-1").length;

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";

    const searchStr = typeof window !== "undefined" ? window.location.search : "";
    const isInternship = pathname === "/internships" || searchStr.includes("type=internship");

    if (href.includes("internship")) {
      return isInternship;
    }

    if (href === "/jobs") {
      return (pathname === "/jobs" || pathname.startsWith("/jobs/")) && !isInternship;
    }

    if (pathname === href) return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    if (href.includes("/candidates") && (pathname.includes("/candidates") || pathname.includes("/applicants"))) return true;
    if (href.includes("/companies") && (pathname.includes("/companies") || pathname.includes("/company"))) return true;
    if (href.includes("/reports") && pathname.includes("/reports")) return true;
    if (href.includes("/analytics") && pathname.includes("/analytics")) return true;
    if (href.includes("/dashboard") && pathname.includes("/dashboard")) return true;

    return false;
  };

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    if (role === "candidate") {
      router.push("/candidate/dashboard");
    } else if (role === "employer") {
      router.push("/employer/dashboard");
    } else if (role === "admin") {
      router.push("/admin/dashboard");
    }
  };

  // Generate Navigation links based on role
  const getNavLinks = () => {
    if (!isAuthenticated || !user) {
      // Visitor Links
      return [
        { label: "Home", href: "/" },
        { label: "Jobs", href: "/jobs" },
        { label: "Companies", href: "/companies" },
        { label: "Internships", href: "/jobs?type=internship" },
        { label: "Pricing", href: "/pricing" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" }
      ];
    }

    if (user.role === "candidate") {
      return [
        { label: "Home", href: "/" },
        { label: "Jobs", href: "/jobs" },
        { label: "Companies", href: "/companies" },
        { label: "Internships", href: "/jobs?type=internship" },
        { label: "Career Resources", href: "/candidate/career-resources" },
        { label: "Pricing", href: "/pricing" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" }
      ];
    }

    if (user.role === "employer") {
      return [
        { label: "Dashboard", href: "/employer/dashboard" },
        { label: "Home", href: "/" },
        { label: "Candidates", href: "/employer/candidates" },
        { label: "Companies", href: "/companies" },
        { label: "Jobs", href: "/jobs" },
        { label: "Analytics", href: "/employer/analytics" },
        { label: "Reports", href: "/employer/reports" }
      ];
    }

    if (user.role === "admin") {
      return [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Jobs", href: "/admin/jobs-overview" },
        { label: "Companies", href: "/admin/companies-overview" },
        { label: "Reports", href: "/admin/reports-overview" },
        { label: "Analytics", href: "/admin/analytics" },
        { label: "Support", href: "/admin/support" }
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  const getUserInitials = (nameStr: string) => {
    if (!nameStr) return "SK";
    const clean = nameStr.replace(/\(.*?\)/g, "").replace(/[^a-zA-Z\s]/g, "").trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "SK";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-4 z-40 w-[calc(100%-2rem)] max-w-7xl mx-auto border border-white/60 bg-white/75 backdrop-blur-xl rounded-2xl shadow-md transition-all duration-300">
      <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4 sm:gap-6">
        
        {/* Hamburger Menu (Mobile Only) */}
        {isAuthenticated && user && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-primary-navy hover:bg-ice-blue rounded-lg transition-colors focus:outline-none mr-2 flex-shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}

        {/* Logo */}
        <Link href="/" className="flex items-center group flex-shrink-0 select-none py-1">
          <img
            src="/api/asset/logo"
            alt="TITAN Logo"
            className="h-13 sm:h-15 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink min-w-0">
          <LayoutGroup id="navbar-nav-group">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label + link.href}
                  href={link.href}
                  className="relative py-2 text-xs xl:text-sm font-semibold text-text-secondary hover:text-primary-navy transition-colors whitespace-nowrap flex flex-col items-center"
                >
                  <span>{link.label}</span>
                  {active && (
                    <motion.div
                      layoutId="active-navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-navy rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </LayoutGroup>
        </nav>

        {/* Actions / Auth */}
        <div className="flex items-center gap-4">

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              
              {/* Messages Badge */}
              <Link
                href={user.role === "candidate" ? "/candidate/messages" : user.role === "employer" ? "/employer/messages" : "/admin/messages"}
                className="relative p-2 text-text-muted hover:text-primary-navy rounded-lg hover:bg-ice-blue transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-navy text-[9px] font-bold text-white">
                    {unreadMessages}
                  </span>
                )}
              </Link>

              {/* Notification Bell */}
              <Link
                href={user.role === "candidate" ? "/candidate/notifications" : user.role === "employer" ? "/employer/notifications" : "/admin/notifications"}
                className="relative p-2 text-text-muted hover:text-primary-navy rounded-lg hover:bg-ice-blue transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-navy text-[9px] font-bold text-white">
                    {unreadNotifications}
                  </span>
                )}
              </Link>

              {/* User Avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-ice-blue transition-colors focus:outline-none"
                >
                  <div className="h-9 w-9 rounded-full bg-primary-navy text-white flex items-center justify-center font-bold text-sm shadow-inner">
                    {getUserInitials(user.name)}
                  </div>
                  <ChevronDown className="h-4 w-4 text-text-secondary hidden sm:inline" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border-color bg-white p-2 shadow-2xl z-50">
                    <div className="px-3 py-2 border-b border-border-color mb-1">
                      <p className="text-xs font-bold text-text-primary leading-tight">{user.name}</p>
                      <p className="text-[10px] text-text-muted mt-0.5 leading-none">{user.email}</p>
                    </div>
                    <Link
                      href={user.role === "candidate" ? "/candidate/dashboard" : user.role === "employer" ? "/employer/dashboard" : "/admin/dashboard"}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-text-secondary hover:bg-ice-blue hover:text-primary-navy transition-colors font-bold uppercase tracking-wider"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Briefcase className="h-4 w-4 text-primary-navy" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href={user.role === "candidate" ? "/candidate/profile" : user.role === "employer" ? "/employer/profile" : "/admin/settings"}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-text-secondary hover:bg-ice-blue hover:text-primary-navy transition-colors font-bold uppercase tracking-wider"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserIcon className="h-4 w-4 text-primary-navy" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href={user.role === "candidate" ? "/candidate/settings" : user.role === "employer" ? "/employer/settings" : "/admin/settings"}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-text-secondary hover:bg-ice-blue hover:text-primary-navy transition-colors font-bold uppercase tracking-wider"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 text-primary-navy" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        router.push("/");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs rounded-lg text-text-secondary hover:bg-ice-blue hover:text-primary-navy transition-colors font-bold uppercase tracking-wider text-left"
                    >
                      <LogOut className="h-4 w-4 text-primary-navy" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Quick Action Button based on Role */}
          {isAuthenticated && user?.role === "employer" && (
            <Link href="/employer/post-job" className="hidden lg:inline-flex">
              <Button variant="gold" size="sm">
                Post Job
              </Button>
            </Link>
          )}
          {isAuthenticated && user?.role === "candidate" && (
            <Link href="/candidate/dashboard" className="hidden lg:inline-flex">
              <Button variant="outline" size="sm">
                My Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && isAuthenticated && user && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Slide-out Sidebar Content Panel */}
          <div className="relative flex w-full max-w-xs flex-col bg-white p-6 shadow-2xl z-50 h-screen overflow-y-auto text-left transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="TITAN Logo" className="h-9 w-auto object-contain" />
                <div className="flex flex-col">
                  <span className="font-black text-sm tracking-tight text-primary-navy leading-none">TITAN</span>
                  <span className="text-[8px] font-semibold text-gold tracking-widest leading-none mt-0.5 uppercase">Taj Institute</span>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-text-muted hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
              {/* Job Seeker Sidebar Links */}
              {user.role === "candidate" && [
                { label: "Dashboard", href: "/candidate/dashboard" },
                { label: "AI Career Assistant", href: "/candidate/career-assistant" },
                { label: "Resume Builder", href: "/candidate/resume-builder" },
                { label: "Resume Analysis", href: "/candidate/resume-analyzer" },
                { label: "Saved Jobs", href: "/candidate/saved-jobs" },
                { label: "My Applications", href: "/candidate/applied-jobs" },
                { label: "Candidate Profile", href: "/candidate/profile" },
                { label: "Skill Assessment", href: "/candidate/skills-assessment" },
                { label: "Certificates", href: "/candidate/certificates" },
                { label: "Messages", href: "/candidate/messages" },
                { label: "Notifications", href: "/candidate/notifications" },
                { label: "Career Resources", href: "/candidate/career-resources" },
                { label: "Settings", href: "/candidate/settings" }
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-ice-blue hover:text-primary-navy transition-all"
                >
                  {item.label}
                </Link>
              ))}

              {/* Recruiter Sidebar Links */}
              {user.role === "employer" && [
                { label: "Dashboard", href: "/employer/dashboard" },
                { label: "Post a Job", href: "/employer/post-job" },
                { label: "Active Jobs", href: "/employer/active-jobs" },
                { label: "Applicants", href: "/employer/applicants" },
                { label: "AI Candidate Matching", href: "/employer/ai-matching" },
                { label: "Talent Pool", href: "/employer/talent-pool" },
                { label: "Interview Management", href: "/employer/interviews" },
                { label: "Messages", href: "/employer/messages" },
                { label: "Notifications", href: "/employer/notifications" },
                { label: "Company Profile", href: "/employer/profile" },
                { label: "Team Members", href: "/employer/team" },
                { label: "Analytics", href: "/employer/analytics" },
                { label: "Billing & Subscription", href: "/employer/billing" },
                { label: "Saved Candidates", href: "/employer/saved-candidates" },
                { label: "Reports", href: "/employer/reports" },
                { label: "Settings", href: "/employer/settings" }
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-ice-blue hover:text-primary-navy transition-all"
                >
                  {item.label}
                </Link>
              ))}

              {/* Admin Sidebar Links */}
              {user.role === "admin" && [
                { label: "Dashboard", href: "/admin/dashboard" },
                { label: "Candidate Management", href: "/admin/candidates" },
                { label: "Employer Management", href: "/admin/employers" },
                { label: "Admin Management", href: "/admin/admins" },
                { label: "Job Management", href: "/admin/jobs" },
                { label: "Company Management", href: "/admin/companies" },
                { label: "Applications", href: "/admin/applications" },
                { label: "AI Monitoring", href: "/admin/ai-monitoring" },
                { label: "Messages", href: "/admin/messages" },
                { label: "Notifications", href: "/admin/notifications" },
                { label: "Reports", href: "/admin/reports" },
                { label: "Analytics", href: "/admin/analytics" },
                { label: "Revenue", href: "/admin/revenue" },
                { label: "Subscriptions", href: "/admin/subscriptions" },
                { label: "Payments", href: "/admin/payments" },
                { label: "Verification Requests", href: "/admin/verifications" },
                { label: "Approvals", href: "/admin/approvals" },
                { label: "Content Management", href: "/admin/content" },
                { label: "Blog Management", href: "/admin/blog" },
                { label: "Support Tickets", href: "/admin/support" },
                { label: "Contact Messages", href: "/admin/contact-messages" },
                { label: "Audit Logs", href: "/admin/audit-logs" },
                { label: "Activity Logs", href: "/admin/activity-logs" },
                { label: "Roles & Permissions", href: "/admin/roles-permissions" },
                { label: "Platform Settings", href: "/admin/platform-settings" },
                { label: "Email Templates", href: "/admin/email-templates" },
                { label: "Notification Templates", href: "/admin/notification-templates" },
                { label: "AI Configuration", href: "/admin/ai-config" },
                { label: "System Configuration", href: "/admin/system-config" },
                { label: "Backup & Restore", href: "/admin/backup" },
                { label: "Security", href: "/admin/security" },
                { label: "Database Monitor", href: "/admin/database-monitor" },
                { label: "API Management", href: "/admin/api" },
                { label: "Integrations", href: "/admin/integrations" },
                { label: "Settings", href: "/admin/settings" }
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-ice-blue hover:text-primary-navy transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
