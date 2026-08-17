"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Target, CheckCircle } from "lucide-react";

export default function EmployerAnalyticsPage() {
  const metrics = [
    { title: "Conversion Rate", value: "3.2%", change: "+0.4% from last month", icon: Target },
    { title: "Candidate views", value: "1,240 Views", change: "+12% this week", icon: Users },
    { title: "Time to Hire", value: "18 Days", change: "-2 days compared to Q1", icon: TrendingUp }
  ];

  const funnelSteps = [
    { name: "Total Candidates", count: 420, percent: 100 },
    { name: "Shortlisted", count: 180, percent: 42 },
    { name: "Interviews Conducted", count: 65, percent: 15 },
    { name: "Offers Sent", count: 12, percent: 3 },
    { name: "Successful Hires", count: 8, percent: 2 }
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Talent Pipeline Analytics</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Review candidate conversion ratios, hiring funnel statistics, and listing performance.
        </p>
      </div>

      {/* Analytics KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white border border-border-color p-5 rounded-2xl shadow-sm flex flex-col gap-1">
              <div className="flex justify-between items-center text-text-muted">
                <span className="text-[10px] font-bold uppercase tracking-wider">{m.title}</span>
                <Icon className="h-4.5 w-4.5 text-primary-navy-light" />
              </div>
              <span className="text-2xl font-black text-primary-navy mt-1">{m.value}</span>
              <span className="text-[9px] text-text-muted mt-2 font-semibold">{m.change}</span>
            </div>
          );
        })}
      </div>

      {/* Spacing grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Hiring Funnel visualization */}
        <div className="lg:col-span-7 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1">
            <BarChart3 className="h-4.5 w-4.5 text-primary-navy animate-pulse-slow" />
            <span>Recruitment Funnel Overview</span>
          </h3>

          <div className="flex flex-col gap-4 mt-2">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-primary-navy">
                  <span>{step.name}</span>
                  <span className="text-text-muted font-semibold">{step.count} ({step.percent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-navy rounded-full" style={{ width: `${step.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Source of Candidates */}
        <div className="lg:col-span-5 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
            Source of Candidates
          </h3>

          <div className="flex flex-col gap-3">
            {[
              { name: "Direct Job Searches", percent: 45, count: 189 },
              { name: "AI Match Suggestions", percent: 30, count: 126 },
              { name: "Direct Invites", percent: 15, count: 63 },
              { name: "Referrals", percent: 10, count: 42 }
            ].map((source, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary-navy">{source.name}</span>
                  <span className="text-[9px] text-text-muted font-bold tracking-wider mt-1">{source.count} candidates</span>
                </div>
                <span className="text-sm font-black text-primary-navy">{source.percent}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
