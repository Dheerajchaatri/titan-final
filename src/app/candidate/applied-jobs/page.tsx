"use client";

import React from "react";
import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/utils/cn";
import { CheckCircle, Clock, AlertTriangle, AlertCircle, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";

export default function AppliedJobsPage() {
  const { applications } = useJobStore();
  const { user } = useUserStore();

  const userApplications = applications.filter((a) => a.candidateId === user?.id);

  const statusBadges = {
    "Under Review": "bg-primary-navy text-white border border-primary-navy",
    "Shortlisted": "bg-emerald-50 text-emerald-600 border border-emerald-100",
    "Interview Scheduled": "bg-primary-navy text-white border border-primary-navy",
    "Offer Received": "bg-emerald-50 text-emerald-600 border border-emerald-100",
    "Rejected": "bg-primary-navy/10 text-primary-navy border border-primary-navy/20",
  };

  const statusIcons = {
    "Under Review": <Clock className="h-3.5 w-3.5 text-white" />,
    "Shortlisted": <CheckCircle className="h-3.5 w-3.5" />,
    "Interview Scheduled": <Sparkles className="h-3.5 w-3.5 text-white" />,
    "Offer Received": <CheckCircle className="h-3.5 w-3.5" />,
    "Rejected": <AlertCircle className="h-3.5 w-3.5 text-primary-navy" />,
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-primary-navy">My Applications</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Track the status of your submitted job applications.
        </p>
      </div>

      <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm">
        {userApplications.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <span className="text-3xl">📁</span>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-primary-navy">No Applications Logged</h4>
              <p className="text-xs text-text-muted">You haven't applied to any job listings yet.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <th className="pb-3 w-1/3">Job Details</th>
                  <th className="pb-3 w-1/4">Date Applied</th>
                  <th className="pb-3 w-1/5">AI Match</th>
                  <th className="pb-3 w-1/4 text-right">Pipeline Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {userApplications.map((app) => (
                  <tr key={app.id} className="group">
                    <td className="py-4">
                      <div className="flex flex-col">
                        <Link href={`/jobs`}>
                          <span className="text-xs font-bold text-primary-navy hover:underline leading-tight">
                            {app.jobTitle}
                          </span>
                        </Link>
                        <span className="text-[10px] text-text-secondary mt-1">{app.companyName}</span>
                      </div>
                    </td>
                    <td className="py-4 text-text-secondary font-medium">{app.appliedDate}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-primary-navy">
                        <Sparkles className="h-3 w-3 text-gold" />
                        <span>{app.matchScore}% Match</span>
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider", statusBadges[app.status])}>
                        {statusIcons[app.status]}
                        <span>{app.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
