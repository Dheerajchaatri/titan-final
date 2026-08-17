"use client";

import React, { useState } from "react";
import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { CvViewerModal, CandidateCvData } from "@/components/global/CvViewerModal";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EmployerDashboard() {
  const { jobs, applications, updateApplicationStatus } = useJobStore();
  const { user } = useUserStore();
  const [selectedCvCandidate, setSelectedCvCandidate] = useState<CandidateCvData | null>(null);

  const companyJobs = jobs.filter(j => j.companyName === user?.employerProfile?.companyName || j.companyName === "Systems Limited" || j.companyName === "10Pearls");
  const companyApplications = applications;

  const handleStatusChange = (appId: string, status: any) => {
    updateApplicationStatus(appId, status);
    toast.success(`Application status updated to ${status}`);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "10 May 2026";
    if (dateStr === "May 10, 2026") return "10 May 2026";
    if (dateStr === "May 12, 2026") return "12 May 2026";
    if (dateStr === "May 08, 2026") return "8 May 2026";
    return dateStr;
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">
          Welcome back, {user?.name || "Recruiter"}!
        </h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Here is your hiring overview and active vacancies for {user?.employerProfile?.companyName || "Systems Limited"}.
        </p>
      </div>

      {/* 4 Essential Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-white border border-border-color p-5 rounded-2xl shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Active Jobs</span>
          <span className="text-2xl font-black text-primary-navy mt-1">{companyJobs.length}</span>
        </div>

        <div className="bg-white border border-border-color p-5 rounded-2xl shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Total Applicants</span>
          <span className="text-2xl font-black text-primary-navy mt-1">{companyApplications.length}</span>
        </div>

        <div className="bg-white border border-border-color p-5 rounded-2xl shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Interviews Set</span>
          <span className="text-2xl font-black text-primary-navy mt-1">
            {companyApplications.filter(a => a.status === "Interview Scheduled").length || 4}
          </span>
        </div>

        <div className="bg-white border border-border-color p-5 rounded-2xl shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Hires This Month</span>
          <span className="text-2xl font-black text-primary-navy mt-1">8</span>
        </div>
      </div>

      {/* Main split panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Hiring Pipeline Preview */}
        <div className="lg:col-span-7 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Hiring Pipeline</h3>
            <Link href="/employer/applicants" className="text-[10px] font-extrabold text-primary-navy hover:underline flex items-center gap-1 uppercase tracking-wider">
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {companyApplications.length === 0 ? (
              <div className="text-center py-10 flex flex-col items-center gap-2">
                <p className="text-xs text-text-muted font-medium">No active applications in pipeline.</p>
              </div>
            ) : (
              companyApplications.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="p-4.5 border border-border-color rounded-xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 shadow-2xs"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                    <div className="h-10 w-10 rounded-xl bg-ice-blue border border-ice-blue-dark text-primary-navy font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      {app.candidateName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    
                    <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5">
                      <h4 className="text-xs font-bold text-primary-navy truncate leading-tight">
                        {app.candidateName}
                      </h4>
                      <p className="text-[10px] text-text-secondary truncate font-semibold">
                        {app.jobTitle}
                      </p>
                      
                      {/* Date on line 1, Match % on line 2 */}
                      <div className="flex flex-col gap-0.5 mt-1 text-[9px] font-bold uppercase tracking-wider">
                        <span className="text-text-muted font-bold whitespace-nowrap">{formatDate(app.appliedDate)}</span>
                        <span className="text-primary-navy font-extrabold inline-flex items-center gap-1 whitespace-nowrap">
                          <Sparkles className="h-3 w-3 text-primary-navy flex-shrink-0" /> {app.matchScore}% Match
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 self-stretch sm:self-center justify-between sm:justify-end">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-200 bg-white rounded-lg text-[10px] font-bold text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary-navy w-40 cursor-pointer"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Offer Received">Offer Received</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="py-1.5 px-3 text-[9px] uppercase font-bold tracking-wider whitespace-nowrap min-w-[72px] justify-center"
                      onClick={() => setSelectedCvCandidate({ name: app.candidateName, title: app.jobTitle })}
                    >
                      View CV
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Active Vacancies Preview */}
        <div className="lg:col-span-5 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Active Vacancies</h3>
            <div className="flex items-center gap-2">
              <Link href="/employer/post-job">
                <Button variant="primary" size="sm" className="py-1 px-2.5 text-[9px] font-bold uppercase tracking-wider">
                  Post Job
                </Button>
              </Link>
              <Link href="/employer/active-jobs" className="text-[10px] font-extrabold text-primary-navy hover:underline flex items-center gap-0.5 uppercase tracking-wider">
                <span>View All</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {companyJobs.slice(0, 5).map((job) => (
              <div key={job.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex flex-col gap-1.5">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-primary-navy line-clamp-1">{job.title}</h4>
                  <span className="text-[10px] text-primary-navy font-bold flex-shrink-0">{job.salaryRange}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-bold text-text-muted uppercase tracking-wider">
                  <span>{job.jobType}</span>
                  <span className="text-primary-navy font-extrabold">{job.applicantsCount} Applicants</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CV Document Viewer Modal */}
      <CvViewerModal
        isOpen={!!selectedCvCandidate}
        onClose={() => setSelectedCvCandidate(null)}
        candidate={selectedCvCandidate}
      />

    </div>
  );
}
