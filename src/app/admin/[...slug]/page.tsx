"use client";

import React, { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  Search,
  Database,
  Shield,
  Lock,
  Settings,
  ShieldAlert,
  Award,
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
  Server,
  CloudLightning,
  Workflow,
  Wrench,
  Flame,
  ArrowLeft,
  Settings2,
  TrendingUp,
  Trash2,
  Edit3,
  Plus,
  RefreshCw,
  Download
} from "lucide-react";

interface AdminPageProps {
  params: Promise<{ slug: string[] }>;
}

export default function DynamicAdminPage({ params }: AdminPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug[0];
  const [searchQuery, setSearchQuery] = useState("");

  const handleAction = (msg: string) => {
    toast.success(msg);
  };

  // 1. Role-Based Access Block for Chats & Candidate/Recruiter Tools
  const forbiddenSlugs = [
    "career-assistant",
    "hiring-assistant",
    "resume-builder",
    "resume-analyzer",
    "career-resources",
    "skills-assessment",
    "certificates",
    "saved-jobs",
    "applied-jobs"
  ];

  // Immediate redirect trigger for forbidden pages manual visits
  useEffect(() => {
    if (forbiddenSlugs.includes(slug)) {
      toast.error("Access Denied: Administrators do not have access to candidate or recruiter tools.");
      router.push("/admin/dashboard");
    }
  }, [slug, router]);

  if (forbiddenSlugs.includes(slug)) {
    return (
      <div className="p-12 text-center bg-white border border-border-color rounded-2xl shadow-sm flex flex-col items-center justify-center gap-5 max-w-xl mx-auto my-12 text-left">
        <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-primary-navy">
          <ShieldAlert className="h-8 w-8 text-primary-navy" />
        </div>
        <div className="flex flex-col gap-1.5 text-center">
          <h2 className="text-sm font-black text-primary-navy uppercase tracking-wider">Access Denied</h2>
          <p className="text-xs text-text-muted leading-relaxed font-semibold">
            Administrators do not have access to candidate or recruiter workspace tools. Please use the Admin console dashboard to moderate logs and configuration keys instead.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="font-bold uppercase tracking-wider text-xs px-5 py-2.5 mt-2"
          onClick={() => router.push("/admin/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Return to Dashboard</span>
        </Button>
      </div>
    );
  }

  // 2. Map route metadata
  const getRouteDetails = (route: string) => {
    switch (route) {
      case "jobs-overview":
        return { title: "Jobs Platform Overview", desc: "Global overview of active vacancy postings, hiring sectors distribution, and application insights." };
      case "companies-overview":
        return { title: "Enterprise Directory & Verification Overview", desc: "Consolidated audit dashboard of verified enterprise accounts, subscription rates, and brand moderation metrics." };
      case "reports-overview":
        return { title: "Platform Consolidated Reports & Exportable Dashboard", desc: "High-level overview of system transaction logs, active subscriptions charts, and download options." };
      case "candidates":
        return { title: "Candidate Database", desc: "Browse candidate accounts registry, view verification logs, or suspend user access keys." };
      case "employers":
        return { title: "Recruiter Accounts Management", desc: "Moderate recruiter workspace subscriptions, check company verification status, and set job posting limits." };
      case "admins":
        return { title: "Administrator Directory", desc: "Configure access controls list, allocate permissions, or deactivate admin accounts." };
      case "jobs":
        return { title: "Vacancies Registry", desc: "Audit active jobs postings across categories and delete flagged listings." };
      case "companies":
        return { title: "Verified Enterprise Brands", desc: "Moderate company descriptions, industry tags, founded dates, and verified badges." };
      case "applications":
        return { title: "Applications Ledger", desc: "Track candidate applications history status logs and download submitted resumes." };
      case "ai-monitoring":
        return { title: "AI Inference Monitors", desc: "Review API request volume, semantic sifting latency, success rate averages, and token logs." };
      case "messages":
        return { title: "Communication Audit Logs", desc: "Audit candidate-to-recruiter chat logs to block phishing spam." };
      case "notifications":
        return { title: "Platform Broadcast Manager", desc: "Draft and dispatch real-time global system alerts to active users." };
      case "reports":
        return { title: "Exportable Audit Reports", desc: "Download consolidated PDF/Excel reports of system analytics." };
      case "analytics":
        return { title: "Platform Traffic Matrices", desc: "Track monthly user growth indexes, application volume grids, and HTTP load averages." };
      case "revenue":
        return { title: "Gross Billing Ledger", desc: "Track workspace subscription payments, invoice codes, and transaction states." };
      case "subscriptions":
        return { title: "Active Corporate Memberships", desc: "Edit paid enterprise subscription terms, modify pricing bands, or extend access grants." };
      case "payments":
        return { title: "Payment Clearing Gateways", desc: "Verify transaction codes from Stripe, PayPal, and local bank terminals." };
      case "verifications":
        return { title: "Legitimacy Verification Pipeline", desc: "Verify SECP registration keys, work badges, and grant checked symbols." };
      case "approvals":
        return { title: "Jobs & Brands Approvals", desc: "Approve or reject queued job listings and recruiter profile additions." };
      case "content":
        return { title: "Static Content Editor", desc: "Modify landing page taglines, FAQ answers lists, or terms of service scripts." };
      case "blog":
        return { title: "Careers Blog Builder", desc: "Publish career blogs, recruitment articles, and employee highlights." };
      case "support":
        return { title: "Support Helpdesk Tickets", desc: "Reply to user tickets, assign administrators, and update completion status." };
      case "contact-messages":
        return { title: "Feedback Form Submissions", desc: "Review public contact form entries and catalog inquiries." };
      case "audit-logs":
        return { title: "Security Events Audit Trails", desc: "Chronological ledger tracking configuration edits and administrative actions." };
      case "activity-logs":
        return { title: "User Actions Activity Logs", desc: "Track user registrations, log-in timestamps, and profile changes." };
      case "roles-permissions":
        return { title: "RBAC Permissions Configuration", desc: "Set database write scopes for Candidate, Recruiter, and Admin roles." };
      case "platform-settings":
        return { title: "Global Settings Configuration", desc: "Edit site metadata, default contact phone numbers, support emails, and social handles." };
      case "email-templates":
        return { title: "SMTP Transactional Emails Builder", desc: "Edit markdown layouts for signup verification mails and status changes." };
      case "notification-templates":
        return { title: "Broadcast Alerts Templates", desc: "Edit push notification headers and alert details configurations." };
      case "ai-config":
        return { title: "AI Model Settings", desc: "Select base model providers, tune inference temperatures, and update system prompts." };
      case "system-config":
        return { title: "System Configuration Ledger", desc: "Verify server database connection strings, SMTP ports, and cache keys." };
      case "backup":
        return { title: "Automated Dumps & Recovery", desc: "Configure backups retention schedules and trigger manual rollback points." };
      case "security":
        return { title: "Firewalls & 2FA Controls", desc: "Manage login attempts limits, block malicious IP ranges, and toggle security locks." };
      case "database-monitor":
        return { title: "PostgreSQL Database Health", desc: "Monitor database size, table rows count, and query response delays." };
      case "api":
        return { title: "API Keys & Rate Limiting", desc: "Configure API access keys, rate limits count, and custom developer scopes." };
      case "integrations":
        return { title: "Platform Webhooks Connectors", desc: "Configure connections with Google API, Zoom, and Stripe services." };
      case "settings":
        return { title: "Personal Preferences Settings", desc: "Configure admin panel alert settings and interface preferences." };
      default:
        return { title: "Administrator Console", desc: "Moderate platform details, review operations logs, or inspect server status." };
    }
  };

  const routeDetails = getRouteDetails(slug);

  // 3. Render Module Specific Content
  const renderModuleData = () => {
    switch (slug) {
      
      case "candidates":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Candidate ID</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Experience</th>
                  <th className="pb-3">Verification</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "CAND-01", name: "Ahmad Raza", email: "ahmad@email.com", loc: "Lahore", exp: "3.5 Yrs", verified: "Yes", status: "Active" },
                  { id: "CAND-02", name: "Fatima Shah", email: "fatima@email.com", loc: "Karachi", exp: "2.5 Yrs", verified: "Pending", status: "Active" },
                  { id: "CAND-03", name: "Bilal Khan", email: "bilal@email.com", loc: "Lahore", exp: "2 Yrs", verified: "Yes", status: "Suspended" },
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.id}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.name}</td>
                    <td className="py-4 text-text-muted">{row.email}</td>
                    <td className="py-4 text-text-secondary">{row.loc}</td>
                    <td className="py-4 text-text-secondary">{row.exp}</td>
                    <td className="py-4">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.verified === "Yes" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-slate-500 border-slate-200")}>{row.verified}</span>
                    </td>
                    <td className="py-4">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.status === "Active" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-slate-500 border-slate-200")}>{row.status}</span>
                    </td>
                    <td className="py-4 text-right flex gap-1 justify-end">
                      <Button variant="secondary" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy" onClick={() => handleAction(`Verifying Candidate: ${row.name}`)}>Verify</Button>
                      <Button variant="outline" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold text-rose-600 border-rose-200 bg-white hover:bg-rose-50" onClick={() => handleAction(`Suspended Candidate: ${row.name}`)}>Suspend</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "employers":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Recruiter ID</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Recruiter Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Verified</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "EMP-01", company: "Systems Limited", name: "Sarah Khan", email: "sarah@systems.com", plan: "Enterprise", verified: "Yes", status: "Active" },
                  { id: "EMP-02", company: "10Pearls", name: "Ali Raza", email: "ali@10pearls.com", plan: "Growth", verified: "Yes", status: "Active" },
                  { id: "EMP-03", company: "NetSol Tech", name: "Zainab Bibi", email: "zainab@netsol.com", plan: "Standard", verified: "No", status: "Pending Approval" }
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.id}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.company}</td>
                    <td className="py-4 text-text-secondary">{row.name}</td>
                    <td className="py-4 text-text-muted">{row.email}</td>
                    <td className="py-4 text-text-secondary">{row.plan}</td>
                    <td className="py-4">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.verified === "Yes" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-slate-500 border-slate-200")}>{row.verified}</span>
                    </td>
                    <td className="py-4 text-text-secondary">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-slate-50 border border-slate-200 text-slate-600">{row.status}</span>
                    </td>
                    <td className="py-4 text-right flex gap-1 justify-end">
                      <Button variant="secondary" size="sm" className="py-1 px-2 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy" onClick={() => handleAction(`Approved employer account: ${row.name}`)}>Approve</Button>
                      <Button variant="outline" size="sm" className="py-1 px-2 text-[9px] uppercase font-bold text-rose-600 border-rose-200 bg-white hover:bg-rose-50" onClick={() => handleAction(`Suspended recruiter: ${row.name}`)}>Suspend</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "admins":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Admin Name</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Permissions Scope</th>
                  <th className="pb-3">Last Login</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { name: "Admin System", role: "System Admin", scope: "Full Access", login: "Just now", status: "Active" },
                  { name: "Dheeraj Dev", role: "Support Admin", scope: "Tickets & Messaging", login: "4 hours ago", status: "Active" },
                  { name: "Hamza Malik", role: "Security Admin", scope: "Audit Logs & Security", login: "Yesterday", status: "Active" }
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="py-4 text-primary-navy font-bold">{row.name}</td>
                    <td className="py-4 text-primary-navy font-extrabold">{row.role}</td>
                    <td className="py-4 text-text-secondary">{row.scope}</td>
                    <td className="py-4 text-text-muted">{row.login}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                    </td>
                    <td className="py-4 text-right flex gap-1 justify-end">
                      <Button variant="secondary" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy" onClick={() => handleAction(`Edit admin role: ${row.name}`)}>Role</Button>
                      <Button variant="outline" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold text-rose-600 border-rose-200 bg-white hover:bg-rose-50" onClick={() => handleAction(`Deactivated administrator: ${row.name}`)}>Deactivate</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "jobs":
        return (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs font-semibold border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Job ID</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Title</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Company</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Category</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Location</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Job Type</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Applications</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Status</th>
                  <th className="py-3 px-3 align-middle text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "JOB-01", title: "Senior Frontend Developer", company: "Systems Limited", cat: "IT & Software", loc: "Lahore", type: "Full Time", count: 24, status: "Approved" },
                  { id: "JOB-02", title: "AI/ML Solutions Engineer", company: "NetSol Technologies", cat: "AI & Data", loc: "Islamabad", type: "Full Time", count: 15, status: "Approved" },
                  { id: "JOB-03", title: "React Native Intern", company: "Devsinc", cat: "IT & Software", loc: "Remote", type: "Internship", count: 68, status: "Pending Review" }
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 align-middle text-primary-navy font-extrabold whitespace-nowrap">{row.id}</td>
                    <td className="py-4 px-3 align-middle text-primary-navy font-bold max-w-[200px] truncate">{row.title}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary whitespace-nowrap">{row.company}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary whitespace-nowrap">{row.cat}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary whitespace-nowrap">{row.loc}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary whitespace-nowrap">{row.type}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary whitespace-nowrap">{row.count} candidates</td>
                    <td className="py-4 px-3 align-middle whitespace-nowrap">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border inline-block", row.status === "Approved" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-slate-500 border-slate-200")}>{row.status}</span>
                    </td>
                    <td className="py-4 px-3 align-middle text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="secondary" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy whitespace-nowrap" onClick={() => handleAction(`Approved job posting ${row.id}`)}>Approve</Button>
                        <Button variant="outline" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold text-rose-600 border-rose-200 bg-white hover:bg-rose-50 whitespace-nowrap" onClick={() => handleAction(`Rejected job posting ${row.id}`)}>Reject</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "companies":
        return (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs font-semibold border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Logo</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Company Name</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Industry</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Location</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Employees</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Verification</th>
                  <th className="py-3 px-3 align-middle whitespace-nowrap">Status</th>
                  <th className="py-3 px-3 align-middle text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { logo: "SL", name: "Systems Limited", ind: "IT & Services", loc: "Lahore, Punjab", count: "5,000+", verified: "Verified", status: "Active" },
                  { logo: "10P", name: "10Pearls", ind: "IT Services", loc: "Karachi, Sindh", count: "1,000+", verified: "Verified", status: "Active" },
                  { logo: "DZ", name: "Daraz Pakistan", ind: "E-commerce", loc: "Remote", count: "2,000+", verified: "Pending", status: "Active" }
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 align-middle whitespace-nowrap">
                      <div className="h-8 w-8 rounded-lg bg-ice-blue border border-border-color text-primary-navy font-black text-[10px] flex items-center justify-center">{row.logo}</div>
                    </td>
                    <td className="py-4 px-3 align-middle text-primary-navy font-bold max-w-[180px] truncate">{row.name}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary max-w-[160px] truncate">{row.ind}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary max-w-[160px] truncate">{row.loc}</td>
                    <td className="py-4 px-3 align-middle text-text-secondary whitespace-nowrap">{row.count}</td>
                    <td className="py-4 px-3 align-middle whitespace-nowrap">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border inline-block", row.verified === "Verified" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-slate-500 border-slate-200")}>{row.verified}</span>
                    </td>
                    <td className="py-4 px-3 align-middle text-text-secondary whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-slate-50 border border-slate-200 text-slate-600 inline-block">{row.status}</span>
                    </td>
                    <td className="py-4 px-3 align-middle text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="secondary" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy whitespace-nowrap" onClick={() => handleAction(`Verified company page: ${row.name}`)}>Verify</Button>
                        <Button variant="outline" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold text-rose-600 border-rose-200 bg-white hover:bg-rose-50 whitespace-nowrap" onClick={() => handleAction(`Suspended company listing: ${row.name}`)}>Suspend</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "applications":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Application ID</th>
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3">Job Applied</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Applied Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "APP-001", cand: "Ahmad Raza", job: "Senior Frontend Developer", company: "Systems Limited", date: "10 May 2026", status: "Interview Scheduled" },
                  { id: "APP-002", cand: "Bilal Hassan", job: "Product Designer", company: "10Pearls", date: "8 May 2026", status: "Shortlisted" },
                  { id: "APP-003", cand: "Fatima Shah", job: "UX Researcher", company: "Systems Limited", date: "12 May 2026", status: "Under Review" }
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.id}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.cand}</td>
                    <td className="py-4 text-text-secondary">{row.job}</td>
                    <td className="py-4 text-text-secondary">{row.company}</td>
                    <td className="py-4 text-text-muted">{row.date}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                    </td>
                    <td className="py-4 text-right flex gap-1 justify-end">
                      <Button variant="secondary" size="sm" className="py-1 px-2.5 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy" onClick={() => handleAction(`Auditing application: ${row.id}`)}>Audit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "ai-monitoring":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">AI API Requests</span>
              <span className="text-2xl font-black text-primary-navy mt-1.5">145,210 Logs</span>
              <span className="text-[9px] text-primary-navy font-extrabold mt-2 uppercase">99.8% Success Rate</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Average Latency</span>
              <span className="text-2xl font-black text-primary-navy mt-1.5">340 ms</span>
              <span className="text-[9px] text-primary-navy font-extrabold mt-2 uppercase">Fast Server Response</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Token Allocation</span>
              <span className="text-2xl font-black text-primary-navy mt-1.5">24,510,000</span>
              <span className="text-[9px] text-text-muted font-bold mt-2 uppercase">Daily average 12,450 requests</span>
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Conversation ID</th>
                  <th className="pb-3">Sender Name</th>
                  <th className="pb-3">Receiver Name</th>
                  <th className="pb-3">Last Message Snippet</th>
                  <th className="pb-3">Unread Count</th>
                  <th className="pb-3 text-right">Sent Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "CONV-01", send: "Ahmad Raza (Candidate)", recv: "Sarah Khan (Recruiter)", msg: "Looking forward to our technical meeting tomorrow.", unread: 0, time: "10:45 AM" },
                  { id: "CONV-02", send: "Fatima Shah (Candidate)", recv: "Ali Raza (Recruiter)", msg: "Sent my design portfolio url links.", unread: 1, time: "Yesterday" }
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.id}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.send}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.recv}</td>
                    <td className="py-4 text-text-secondary truncate max-w-[200px]">{row.msg}</td>
                    <td className="py-4">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.unread > 0 ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-text-muted border-slate-200")}>{row.unread} unread</span>
                    </td>
                    <td className="py-4 text-right text-text-muted">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "notifications":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Recent Notifications</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Recipients Group</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { title: "New remote jobs available matching developer skills!", priority: "Low", rec: "All Candidates", status: "Dispatched", date: "15 May 2026" },
                  { title: "System maintenance window schedules alert", priority: "High", rec: "All Users", status: "Scheduled", date: "16 May 2026" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-primary-navy font-bold">{row.title}</td>
                    <td className="py-4">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.priority === "High" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-text-secondary border-slate-200")}>{row.priority}</span>
                    </td>
                    <td className="py-4 text-text-secondary">{row.rec}</td>
                    <td className="py-4 text-text-secondary">{row.status}</td>
                    <td className="py-4 text-right text-text-muted">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "reports":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Jobs Listings Audit Report", type: "PDF / Excel", details: "Summary of vacancies status, applicant counters, and categories trends." },
              { title: "Candidates Database Growth Report", type: "Excel", details: "Statistics of registered users, completed profiles percentages." },
              { title: "Recruiters Subscription Report", type: "PDF", details: "Gross subscription payments logs, active license limits." },
              { title: " Gross Revenue Receipts Ledger", type: "PDF / CSV", details: "Monthly sales figures, Stripe payouts status report." },
              { title: "Applications Conversion Audit", type: "CSV", details: "Trace rates of candidate applications to schedule milestones." }
            ].map((rep, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] font-black uppercase text-primary-navy bg-primary-navy/10 border border-primary-navy/20 px-1.5 py-0.5 rounded self-start">{rep.type}</span>
                  <h4 className="text-xs font-bold text-primary-navy mt-1">{rep.title}</h4>
                  <p className="text-[10px] text-text-muted leading-relaxed font-semibold">{rep.details}</p>
                </div>
                <Button variant="outline" size="sm" className="py-1 text-[9px] uppercase font-black tracking-wider flex items-center justify-center gap-1 mt-2 border-primary-navy/20 text-primary-navy hover:bg-ice-blue" onClick={() => handleAction(`Generating report: ${rep.title}`)}>
                  <Download className="h-3.5 w-3.5" />
                  <span>Generate Report</span>
                </Button>
              </div>
            ))}
          </div>
        );

      case "analytics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">User Growth</span>
              <span className="text-2xl font-black text-primary-navy mt-1">+14.2% MoM</span>
              <span className="text-[9px] text-text-muted font-semibold mt-2">124,520 Total accounts</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Job Postings Growth</span>
              <span className="text-2xl font-black text-primary-navy mt-1">+8.9% MoM</span>
              <span className="text-[9px] text-text-muted font-semibold mt-2">45,210 Active vacancies</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Applications Sifted</span>
              <span className="text-2xl font-black text-primary-navy mt-1">+19.4% MoM</span>
              <span className="text-[9px] text-text-muted font-semibold mt-2">98,420 Completed matches</span>
            </div>
          </div>
        );

      case "revenue":
        return (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Monthly Recurring Revenue</span>
                <span className="text-2xl font-black text-primary-navy mt-1">PKR 8,420,000</span>
                <span className="text-[9px] text-primary-navy font-extrabold mt-1.5 uppercase">+12% vs last month</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Annual Gross Revenue</span>
                <span className="text-2xl font-black text-primary-navy mt-1">PKR 98,240,000</span>
                <span className="text-[9px] text-text-muted font-semibold mt-1.5 uppercase">Audit compliance clear</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy text-left mt-2">Recent Payments Transactions</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                      <th className="pb-3">Transaction ID</th>
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Invoice Type</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/50">
                    {[
                      { tx: "TXN-9982", comp: "Systems Limited", amount: "PKR 240,000", type: "Enterprise Plan renewal", status: "Paid" },
                      { tx: "TXN-9981", comp: "10Pearls", amount: "PKR 120,000", type: "Growth Plan monthly", status: "Paid" }
                    ].map(row => (
                      <tr key={row.tx}>
                        <td className="py-3 text-primary-navy font-extrabold">{row.tx}</td>
                        <td className="py-3 text-primary-navy font-bold">{row.comp}</td>
                        <td className="py-3 text-primary-navy font-bold">{row.amount}</td>
                        <td className="py-3 text-text-secondary">{row.type}</td>
                        <td className="py-3 text-right">
                          <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "subscriptions":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Subscription Plan</th>
                  <th className="pb-3">Company Partner</th>
                  <th className="pb-3">Activation Date</th>
                  <th className="pb-3">Next Renewal Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { plan: "Enterprise Premium Plan", comp: "Systems Limited", start: "Jan 01, 2026", renew: "Dec 31, 2026", status: "Active" },
                  { plan: "Corporate Growth Plan", comp: "10Pearls", start: "Feb 15, 2026", renew: "Feb 14, 2027", status: "Active" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.plan}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.comp}</td>
                    <td className="py-4 text-text-secondary">{row.start}</td>
                    <td className="py-4 text-text-secondary">{row.renew}</td>
                    <td className="py-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "payments":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Invoice ID</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Payment Method</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { inv: "INV-2026-01", comp: "Systems Limited", val: "PKR 240,000", gateway: "Stripe Credit Card", status: "Paid" },
                  { inv: "INV-2026-02", comp: "10Pearls", val: "PKR 120,000", gateway: "PayPal Merchant Gateway", status: "Paid" }
                ].map(row => (
                  <tr key={row.inv}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.inv}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.comp}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.val}</td>
                    <td className="py-4 text-text-secondary">{row.gateway}</td>
                    <td className="py-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "verifications":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Request ID</th>
                  <th className="pb-3">Business Entity</th>
                  <th className="pb-3">Request Type</th>
                  <th className="pb-3">Audit Document</th>
                  <th className="pb-3">Received Time</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "VRF-091", entity: "NetSol Technologies", type: "Company Badge Request", doc: "SECP_Reg_License_771.pdf", time: "2 days ago" },
                  { id: "VRF-092", entity: "VentureDive", type: "Recruiter Verification", doc: "Sarah_Work_Badge_Credentials.png", time: "1 day ago" }
                ].map(row => (
                  <tr key={row.id}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.id}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.entity}</td>
                    <td className="py-4 text-text-secondary">{row.type}</td>
                    <td className="py-4 text-primary-navy underline cursor-pointer">{row.doc}</td>
                    <td className="py-4 text-text-muted">{row.time}</td>
                    <td className="py-4 text-right flex gap-1 justify-end">
                      <Button variant="secondary" size="sm" className="py-1 px-3 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy" onClick={() => handleAction(`Approved request: ${row.id}`)}>Approve</Button>
                      <Button variant="outline" size="sm" className="py-1 px-3 text-[9px] uppercase font-bold text-rose-600 border-rose-200 bg-white hover:bg-rose-50" onClick={() => handleAction(`Rejected request: ${row.id}`)}>Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "approvals":
        return (
          <div className="flex flex-col gap-5 text-left text-xs font-semibold">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Pending Job Posting Requests</h4>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between gap-4">
              <div>
                <h5 className="font-bold text-primary-navy">React Developer Intern</h5>
                <p className="text-[10px] text-text-muted mt-0.5">Submitted by Devsinc • Remote • Internship</p>
              </div>
              <div className="flex gap-1.5">
                <Button variant="secondary" size="sm" className="py-1 px-3 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy" onClick={() => handleAction("Job approved and published!")}>Approve</Button>
                <Button variant="outline" size="sm" className="py-1 px-3 text-[9px] uppercase font-bold text-rose-600 border-rose-200 bg-white hover:bg-rose-50" onClick={() => handleAction("Job posting rejected.")}>Reject</Button>
              </div>
            </div>
          </div>
        );

      case "content":
        return (
          <form className="flex flex-col gap-4 max-w-xl text-left" onSubmit={(e) => { e.preventDefault(); handleAction("Homepage static content updated!"); }}>
            <Input label="Homepage Headline Tagline" defaultValue="Scale Your Engineering Recruitment Pipelines with AI Suitability Matching" />
            <Input label="Platform Support Helpdesk Phone" defaultValue="+92 42 111 222 333" />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">Terms & Agreement Markdown</label>
              <textarea defaultValue="All registered business accounts must confirm to FBR tax laws..." className="w-full min-h-[100px] p-3 text-xs font-semibold text-text-secondary bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-navy" />
            </div>
            <Button variant="primary" size="sm" className="self-start uppercase font-bold tracking-wider py-2 px-5 mt-2" type="submit">Save Content</Button>
          </form>
        );

      case "blog":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Blog Post Title</th>
                  <th className="pb-3">Author</th>
                  <th className="pb-3">Published Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { title: "How to Land High-Paying Remote Tech Jobs in Pakistan", author: "Sarah Khan", date: "12 May 2026", status: "Published" },
                  { title: "Top React 19 Hydration Optimization Patterns for Developers", author: "Ahmad Raza", date: "15 May 2026", status: "Published" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-primary-navy font-bold">{row.title}</td>
                    <td className="py-4 text-primary-navy font-extrabold">{row.author}</td>
                    <td className="py-4 text-text-muted">{row.date}</td>
                    <td className="py-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "support":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Ticket ID</th>
                  <th className="pb-3">User Email</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Assigned Administrator</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "TKT-991", user: "ahmad@email.com", pri: "High", admin: "Dheeraj Dev", status: "Open" },
                  { id: "TKT-992", user: "sarah@systems.com", pri: "Medium", admin: "Admin System", status: "Closed" }
                ].map(row => (
                  <tr key={row.id}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.id}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.user}</td>
                    <td className="py-4">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.pri === "High" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-text-secondary border-slate-200")}>{row.pri}</span>
                    </td>
                    <td className="py-4 text-text-secondary">{row.admin}</td>
                    <td className="py-4 text-right">
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.status === "Open" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-text-muted border-slate-200")}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "contact-messages":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Sender</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Subject Topic</th>
                  <th className="pb-3">Message Snippet</th>
                  <th className="pb-3 text-right">Received Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { name: "Dheeraj Malik", email: "dheeraj@gmail.com", sub: "Sponsorship Queries", msg: "We want to sponsor the upcoming vocational code hackathon event.", date: "15 May 2026" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-primary-navy font-bold">{row.name}</td>
                    <td className="py-4 text-primary-navy font-extrabold">{row.email}</td>
                    <td className="py-4 text-text-secondary">{row.sub}</td>
                    <td className="py-4 text-text-muted truncate max-w-[200px]">{row.msg}</td>
                    <td className="py-4 text-right text-text-muted">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "audit-logs":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Action Target</th>
                  <th className="pb-3">Module</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { user: "Admin System", action: "Updated SMTP Connection Parameters", mod: "Platform Settings", time: "Just now", ip: "192.168.1.1" },
                  { user: "Dheeraj Dev", action: "Approved Job Post #JOB-03", mod: "Job Management", time: "4 hours ago", ip: "192.168.1.4" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-primary-navy font-bold">{row.user}</td>
                    <td className="py-4 text-text-secondary">{row.action}</td>
                    <td className="py-4 text-primary-navy font-extrabold">{row.mod}</td>
                    <td className="py-4 text-text-muted">{row.time}</td>
                    <td className="py-4 text-right text-text-muted">{row.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "activity-logs":
        return (
          <div className="flex flex-col gap-3.5 text-left text-xs font-semibold text-text-secondary">
            {[
              { log: "Candidate Ahmad Raza applied for Senior Frontend Developer position at Systems Limited.", time: "2 hours ago" },
              { log: "Recruiter Sarah Khan scheduled a video interview meeting with candidate Fatima Shah.", time: "4 hours ago" },
              { log: "New candidate account created under email: bilal.khan@email.com.", time: "Yesterday" }
            ].map((act, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span>{act.log}</span>
                <span className="text-[10px] text-text-muted font-bold whitespace-nowrap ml-4">{act.time}</span>
              </div>
            ))}
          </div>
        );

      case "roles-permissions":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">RBAC Role</th>
                  <th className="pb-3">Allowed Permissions Registry</th>
                  <th className="pb-3 text-right">Default Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { role: "System Administrator", perms: "Full platform controls, configurations write, security audits, database drops", def: "Root Authority" },
                  { role: "Recruiter Account", perms: "Vacancies postings, candidates search, shortlists access, interview calendar sync", def: "Employer Console" },
                  { role: "Job Seeker Candidate", perms: "Job submissions, resume builder form editor, AI assistant chats, profile updates", def: "Candidate Console" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.role}</td>
                    <td className="py-4 text-text-secondary max-w-sm leading-relaxed">{row.perms}</td>
                    <td className="py-4 text-right text-text-muted">{row.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "platform-settings":
        return (
          <form className="flex flex-col gap-4 max-w-xl text-left" onSubmit={(e) => { e.preventDefault(); handleAction("Global platform settings saved!"); }}>
            <Input label="Application Brand Title" defaultValue="TITAN Enterprise Recruitment Portal" />
            <Input label="Support Email Gateway" defaultValue="support@titanportal.pk" />
            <Input label="SEO Meta Description Tag" defaultValue="Pakistan's premium automated recruitment portal matching job seekers to active hiring brands." />
            <Button variant="primary" size="sm" className="self-start uppercase font-bold tracking-wider py-2 px-5 mt-2" type="submit">Save Settings</Button>
          </form>
        );

      case "email-templates":
        return (
          <div className="flex flex-col gap-5 text-left text-xs font-semibold">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">SMTP Dynamic Notification Templates</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Welcome Onboarding Email", "Verified Business Badge Notice", "Reset Password Security Link", "Interview Meeting Invite Key", "Application Status Change Alert"].map(tpl => (
                <div key={tpl} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <span>{tpl}</span>
                  <Button variant="outline" size="sm" className="py-1 px-3 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy hover:bg-ice-blue" onClick={() => handleAction(`Opening Template Editor: ${tpl}`)}>Edit</Button>
                </div>
              ))}
            </div>
          </div>
        );

      case "notification-templates":
        return (
          <div className="flex flex-col gap-4 text-left text-xs font-semibold">
            {["System Push Broadcast Notice", "Recruiter Messages SMS Dispatch", "Mobile Push Interview Reminder"].map(tpl => (
              <div key={tpl} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <span>{tpl}</span>
                <Button variant="outline" size="sm" className="py-1 px-3 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy hover:bg-ice-blue" onClick={() => handleAction(`Edit push template: ${tpl}`)}>Edit Template</Button>
              </div>
            ))}
          </div>
        );

      case "ai-config":
        return (
          <form className="flex flex-col gap-4 max-w-xl text-left" onSubmit={(e) => { e.preventDefault(); handleAction("AI inference models configuration updated!"); }}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">Primary LLM Provider Model</label>
              <select className="p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-text-secondary focus:outline-none">
                <option value="gemini">Gemini 2.0 Flash (Recommended)</option>
                <option value="gpt4o">OpenAI GPT-4o (Failover Provider)</option>
              </select>
            </div>
            <Input label="System Temperature Parameter (0.0 - 1.0)" defaultValue="0.2" />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">System Instruction Prompt Template</label>
              <textarea defaultValue="You are Antigravity, a professional AI coding assistant matching skills structures to vacancies indexes..." className="w-full min-h-[100px] p-3 text-xs font-semibold text-text-secondary bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
            </div>
            <Button variant="primary" size="sm" className="self-start uppercase font-bold tracking-wider py-2 px-5 mt-2" type="submit">Update Prompt Keys</Button>
          </form>
        );

      case "system-config":
        // ONLY this page renders the Configuration Data Table
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Reference ID</th>
                  <th className="pb-3">Operation Target</th>
                  <th className="pb-3">Last Modified</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { id: "REF-9921", target: "systems-production-database", time: "Just now", status: "Active" },
                  { id: "REF-9810", target: "recruiter-billing-pipeline", time: "10 mins ago", status: "Active" },
                  { id: "REF-9730", target: "candidate-employability-indices", time: "1 hour ago", status: "Synchronized" },
                  { id: "REF-9654", target: "smtp-broadcast-templates", time: "Yesterday", status: "Verified" }
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.id}</td>
                    <td className="py-4 text-primary-navy font-bold">{row.target}</td>
                    <td className="py-4 text-text-muted">{row.time}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-slate-50 text-text-secondary border border-slate-200">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="py-1 px-3 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy"
                        onClick={() => toast.info(`Viewing logs for ${row.id}`)}
                      >
                        Audit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "backup":
        return (
          <div className="flex flex-col gap-5 text-left text-xs font-semibold">
            <div className="flex justify-between items-center bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div>
                <h5 className="font-bold text-primary-navy">Manual System Backups</h5>
                <p className="text-[10px] text-text-muted mt-0.5 font-medium">Capture current state dumps of active postgres schemas.</p>
              </div>
              <Button variant="primary" size="sm" className="uppercase font-bold tracking-wider py-1.5 px-3 text-[9px]" onClick={() => handleAction("Manual PostgreSQL dump created successfully!")}>Backup Now</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                    <th className="pb-3">Backup ID</th>
                    <th className="pb-3">Size</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {[
                    { id: "BACK-2026-05-15", size: "450 MB", type: "Scheduled DB Dump", status: "Completed" },
                    { id: "BACK-2026-05-14", size: "448 MB", type: "Scheduled DB Dump", status: "Completed" }
                  ].map(row => (
                    <tr key={row.id}>
                      <td className="py-3 text-primary-navy font-extrabold">{row.id}</td>
                      <td className="py-3 text-primary-navy font-bold">{row.size}</td>
                      <td className="py-3 text-text-secondary">{row.type}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                      </td>
                      <td className="py-3 text-right">
                        <Button variant="secondary" size="sm" className="py-1 px-3 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy" onClick={() => handleAction(`Restoring to backup point: ${row.id}`)}>Restore</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="flex flex-col gap-6 text-left">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h5 className="font-bold text-primary-navy">Enforce Admin 2-Factor Auth</h5>
                <p className="text-[10px] text-text-muted mt-0.5">Force all platform admin logins to check TOTP codes.</p>
              </div>
              <Button variant="outline" size="sm" className="uppercase font-bold tracking-wider py-1.5 px-3 text-[9px] border-primary-navy/15 text-primary-navy" onClick={() => handleAction("2FA Enforcement settings saved!")}>Enforce</Button>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Failed Logins History Logs</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                      <th className="pb-3">User Target</th>
                      <th className="pb-3">IP Address</th>
                      <th className="pb-3">Time</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/50">
                    {[
                      { user: "unknown@hack.com", ip: "203.45.1.88", time: "2 hours ago", status: "Blocked IP" },
                      { user: "admin@titan.com", ip: "192.168.1.99", time: "1 day ago", status: "Failed credentials" }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-3 text-primary-navy font-bold">{row.user}</td>
                        <td className="py-3 text-primary-navy font-extrabold">{row.ip}</td>
                        <td className="py-3 text-text-muted">{row.time}</td>
                        <td className="py-3 text-right">
                          <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", row.status === "Blocked IP" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-50 text-slate-500 border-slate-200")}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "database-monitor":
        return (
          <div className="flex flex-col gap-5 text-left text-xs font-semibold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-text-muted uppercase">Database Volume</span>
                <h4 className="text-lg font-black text-primary-navy mt-1">45.2 GB Used</h4>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-text-muted uppercase">Active Connections</span>
                <h4 className="text-lg font-black text-primary-navy mt-1">12 Connection Pools</h4>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                    <th className="pb-3">Table Name</th>
                    <th className="pb-3">Row Count</th>
                    <th className="pb-3">Size on Disk</th>
                    <th className="pb-3 text-right">Health Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {[
                    { name: "jobs_listings", rows: 45210, size: "124 MB", health: "Healthy" },
                    { name: "candidates_profiles", rows: 124520, size: "280 MB", health: "Healthy" },
                    { name: "companies_brands", rows: 500, size: "32 MB", health: "Healthy" }
                  ].map(row => (
                    <tr key={row.name}>
                      <td className="py-3 text-primary-navy font-bold">{row.name}</td>
                      <td className="py-3 text-text-secondary">{row.rows} records</td>
                      <td className="py-3 text-text-secondary">{row.size}</td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.health}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "api":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3">API Key Label</th>
                  <th className="pb-3">Scopes Granted</th>
                  <th className="pb-3">Rate Limit</th>
                  <th className="pb-3">Created Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {[
                  { label: "Systems Ltd Sync Service", scope: "read:candidates, read:applications", rate: "10,000 req/hr", date: "Jan 12, 2026", status: "Active" },
                  { label: "10Pearls ATS Webhook Integration", scope: "write:shortlists", rate: "5,000 req/hr", date: "Feb 18, 2026", status: "Active" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-primary-navy font-extrabold">{row.label}</td>
                    <td className="py-4 text-text-secondary">{row.scope}</td>
                    <td className="py-4 text-text-secondary">{row.rate}</td>
                    <td className="py-4 text-text-muted">{row.date}</td>
                    <td className="py-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-primary-navy/10 text-primary-navy border border-primary-navy/20">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "integrations":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              { name: "Google Authentication & Meets", state: "Connected", desc: "Allows video interview integrations and google logins." },
              { name: "Stripe Merchant Gateway", state: "Connected", desc: "Clears gross recurring monthly subscription invoices." },
              { name: "Gemini Pro LLM Engine API", state: "Connected", desc: "Powers automated candidate match calculations and CV reviews." },
              { name: "OpenAI GPT API Connector", state: "Disconnected", desc: "Backup LLM provider for writing prompts." }
            ].map(int => (
              <div key={int.name} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-primary-navy">{int.name}</h4>
                    <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", int.state === "Connected" ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20" : "bg-slate-50 text-text-muted border-slate-200")}>{int.state}</span>
                  </div>
                  <p className="text-[10px] text-text-muted leading-relaxed font-semibold mt-1">{int.desc}</p>
                </div>
                <Button variant="outline" size="sm" className="py-1 text-[9px] uppercase font-bold border-primary-navy/15 text-primary-navy self-start mt-2" onClick={() => handleAction(`${int.state === "Connected" ? "Resetting" : "Activating"} connection for ${int.name}`)}>
                  {int.state === "Connected" ? "Configure" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        );

      case "settings":
        return (
          <form className="flex flex-col gap-4 max-w-xl text-left" onSubmit={(e) => { e.preventDefault(); handleAction("Admin settings updated!"); }}>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary select-none cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary-navy focus:ring-primary-navy h-4 w-4" />
                <span>Receive email alert notices for critical security events</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary select-none cursor-pointer mt-1">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary-navy focus:ring-primary-navy h-4 w-4" />
                <span>Force light mode sidebar background</span>
              </label>
            </div>
            <Button variant="primary" size="sm" className="self-start uppercase font-bold tracking-wider py-2 px-5 mt-2" type="submit">Save Settings</Button>
          </form>
        );

      case "jobs-overview":
        return (
          <div className="flex flex-col gap-6 text-left">
            {/* Quick stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Active Job Posts</span>
                <span className="text-xl font-black text-primary-navy mt-1">12,450</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Pending Review</span>
                <span className="text-xl font-black text-primary-navy mt-1">1,200</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Remote Jobs</span>
                <span className="text-xl font-black text-primary-navy mt-1">45%</span>
              </div>
            </div>

            {/* Quick insight alert card */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary-navy" />
              <p className="text-[11px] text-primary-navy leading-relaxed font-semibold">
                <strong>Hiring Sector Trend:</strong> AI and Data Science vacancies have surged by 28% this month across Lahore and Karachi hubs.
              </p>
            </div>

            {/* Simulated Search bar & category chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {["IT & Software", "Finance", "Healthcare", "Education", "Marketing"].map(cat => (
                <span key={cat} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-black uppercase text-text-secondary tracking-wider">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        );

      case "companies-overview":
        return (
          <div className="flex flex-col gap-6 text-left">
            {/* Quick stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Verified Brands</span>
                <span className="text-xl font-black text-primary-navy mt-1">6,720</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Unverified Requests</span>
                <span className="text-xl font-black text-primary-navy mt-1">120</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Enterprise Plans</span>
                <span className="text-xl font-black text-primary-navy mt-1">3,450</span>
              </div>
            </div>

            {/* Quick insight alert card */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3">
              <Building className="h-5 w-5 text-primary-navy" />
              <p className="text-[11px] text-primary-navy leading-relaxed font-semibold">
                <strong>Enterprise Onboarding:</strong> 15 new technology hubs submitted verified credentials today. Verification SLA remains under 24 hours.
              </p>
            </div>
          </div>
        );

      case "reports-overview":
        return (
          <div className="flex flex-col gap-6 text-left">
            {/* Quick stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Consolidated Reports</span>
                <span className="text-xl font-black text-primary-navy mt-1">140 Generated</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Server Backups</span>
                <span className="text-xl font-black text-primary-navy mt-1">Healthy</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">DB Table Rows</span>
                <span className="text-xl font-black text-primary-navy mt-1">2.4M</span>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" className="font-bold text-[10px] uppercase tracking-wider border-primary-navy/15 text-primary-navy hover:bg-ice-blue" onClick={() => toast.success("Downloading weekly system traffic report PDF...")}>
                Download PDF Report
              </Button>
              <Button variant="outline" size="sm" className="font-bold text-[10px] uppercase tracking-wider border-primary-navy/15 text-primary-navy hover:bg-ice-blue" onClick={() => toast.success("Exporting transactions log Excel spreadsheet...")}>
                Export XLS Ledger
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white border border-border-color rounded-2xl p-12 text-center text-text-muted text-xs">
            Admin module configuration panel is active.
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start uppercase tracking-wider">
            <Shield className="h-3.5 w-3.5 text-primary-navy" />
            <span>Admin Console</span>
          </span>
          <h1 className="text-2xl font-black text-primary-navy mt-2.5">{routeDetails.title}</h1>
          <p className="text-xs font-semibold text-text-muted mt-1">
            {routeDetails.desc}
          </p>
        </div>
      </div>

      {/* Control filters */}
      {slug !== "ai-monitoring" && slug !== "reports" && slug !== "analytics" && slug !== "content" && slug !== "platform-settings" && slug !== "email-templates" && slug !== "notification-templates" && slug !== "ai-config" && slug !== "settings" && (
        <div className="bg-white border border-border-color p-4.5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="w-full text-xs"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs border-primary-navy/15 text-primary-navy hover:bg-ice-blue py-2 px-4 flex items-center gap-1"
              onClick={() => toast.info("Exporting database ledger in background...")}
            >
              <span>Export Ledger</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs py-2 px-4"
              onClick={() => toast.success(`Applied changes to: ${routeDetails.title}`)}
            >
              Apply Changes
            </Button>
          </div>
        </div>
      )}

      {/* Data Table Wrapper */}
      <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Configuration Data Table</h3>
          <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-primary-navy/10 text-primary-navy border border-primary-navy/20">
            System Synchronized
          </span>
        </div>

        {renderModuleData()}
      </div>

    </div>
  );
}
