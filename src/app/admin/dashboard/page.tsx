"use client";

import React, { useState } from "react";
import {
  Users,
  Briefcase,
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [logs] = useState([
    { id: 1, action: "Employer Profile Approved", target: "Systems Limited", time: "5 mins ago" },
    { id: 2, action: "Category Edited", target: "Artificial Intelligence", time: "1 hour ago" },
    { id: 3, action: "Subscription Activated", target: "NetSol Technologies", time: "3 hours ago" },
    { id: 4, action: "User Profile Flagged", target: "Spam Profile Recruiter", time: "Yesterday" },
    { id: 5, action: "Company Verified", target: "10Pearls Pakistan", time: "2 days ago" }
  ]);

  return (
    <div className="flex flex-col gap-8 text-left w-full">
      
      {/* 1. Admin Welcome / Header */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Admin Dashboard</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          High-level administrative platform statistics, recent system logs, and quick management links.
        </p>
      </div>

      {/* 2. Core Platform Overview (Single Horizontal Row on Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 w-full">
        <div className="bg-white border border-border-color p-4 rounded-2xl shadow-sm flex flex-col justify-between gap-1 h-full min-w-0">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">Total Candidates</span>
          <span className="text-xl font-black text-primary-navy mt-1">2.4M+</span>
          <span className="text-[8px] text-primary-navy/70 font-bold mt-1.5 truncate">+12k today</span>
        </div>

        <div className="bg-white border border-border-color p-4 rounded-2xl shadow-sm flex flex-col justify-between gap-1 h-full min-w-0">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">Total Employers</span>
          <span className="text-xl font-black text-primary-navy mt-1">8,500+</span>
          <span className="text-[8px] text-primary-navy/70 font-bold mt-1.5 truncate">+45 today</span>
        </div>

        <div className="bg-white border border-border-color p-4 rounded-2xl shadow-sm flex flex-col justify-between gap-1 h-full min-w-0">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">Total Jobs</span>
          <span className="text-xl font-black text-primary-navy mt-1">12,450</span>
          <span className="text-[8px] text-text-muted mt-1.5 font-semibold truncate">Active listings</span>
        </div>

        <div className="bg-white border border-border-color p-4 rounded-2xl shadow-sm flex flex-col justify-between gap-1 h-full min-w-0">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">Pending Approvals</span>
          <span className="text-xl font-black text-primary-navy mt-1">42</span>
          <span className="text-[8px] text-text-muted font-bold mt-1.5 truncate">Action required</span>
        </div>

        <div className="bg-white border border-border-color p-4 rounded-2xl shadow-sm flex flex-col justify-between gap-1 h-full min-w-0">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">Pending Reports</span>
          <span className="text-xl font-black text-primary-navy mt-1">5</span>
          <span className="text-[8px] text-text-muted font-bold mt-1.5 truncate">Review queue</span>
        </div>

        <div className="bg-white border border-border-color p-4 rounded-2xl shadow-sm flex flex-col justify-between gap-1 h-full min-w-0">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider truncate">Platform Health</span>
          <span className="text-xl font-black text-primary-navy mt-1">99.9%</span>
          <span className="text-[8px] text-primary-navy/70 font-bold mt-1.5 truncate">Systems normal</span>
        </div>
      </div>

      {/* 3 & 4. Split Panels: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* Left Side: Recent Activity */}
        <div className="lg:col-span-7 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-primary-navy" />
              <span>Recent Activity</span>
            </span>
            <Link
              href="/admin/activity-logs"
              className="text-[10px] font-extrabold text-primary-navy hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            {logs.map((log) => (
              <div key={log.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-4 text-xs">
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-primary-navy leading-tight truncate">
                    {log.action} <span className="text-text-muted font-semibold">• {log.target}</span>
                  </span>
                </div>
                <span className="text-[9px] text-text-muted font-extrabold uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                  {log.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Administrative Actions */}
        <div className="lg:col-span-5 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary-navy" />
              <span>Quick Actions</span>
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/admin/verifications"
              className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary-navy" />
                <span className="text-xs font-bold text-primary-navy">Review Pending Approvals</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-navy transition-colors" />
            </Link>

            <Link
              href="/admin/reports"
              className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-primary-navy" />
                <span className="text-xs font-bold text-primary-navy">Review Reports Queue</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-navy transition-colors" />
            </Link>

            <Link
              href="/admin/jobs"
              className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-primary-navy" />
                <span className="text-xs font-bold text-primary-navy">Manage Active Jobs</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-navy transition-colors" />
            </Link>

            <Link
              href="/admin/candidates"
              className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-primary-navy" />
                <span className="text-xs font-bold text-primary-navy">Manage User Accounts</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-navy transition-colors" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
