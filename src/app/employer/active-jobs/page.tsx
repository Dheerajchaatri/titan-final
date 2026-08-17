"use client";

import React, { useState } from "react";
import { useJobStore, Job } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { Search, Briefcase, PlusCircle, ToggleLeft, Edit3, Trash2, Copy, Share2, Users } from "lucide-react";
import Link from "next/link";

export default function ActiveJobsPage() {
  const { jobs, deleteJob } = useJobStore();
  const { user } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");

  const companyName = user?.employerProfile?.companyName || "Systems Limited";
  const companyJobs = jobs.filter(j => j.companyName === companyName);

  const filteredJobs = companyJobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.jobType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = (job: Job) => {
    navigator.clipboard.writeText(`${window.location.origin}/jobs/${job.id}`);
    toast.success(`Job link copied to clipboard!`);
  };

  const handleDuplicate = (job: Job) => {
    toast.success(`Duplicated job post: ${job.title}`);
  };

  const handleToggleState = (job: Job) => {
    toast.info(`Status updated for: ${job.title}`);
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-primary-navy">Manage Active Vacancies</h1>
          <p className="text-xs font-semibold text-text-muted mt-1">
            Monitor, pause, close, edit, or duplicate active job listings.
          </p>
        </div>
        <Link href="/employer/post-job">
          <Button variant="primary" size="sm" className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 py-2.5">
            <PlusCircle className="h-4 w-4" />
            <span>Post a Job</span>
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-border-color p-4.5 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search job listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-full"
          />
        </div>
      </div>

      {/* Jobs Grid list */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-border-color rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-ice-blue border border-border-color flex items-center justify-center font-black text-sm text-primary-navy flex-shrink-0">
                    {job.logo || "SL"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary-navy truncate">{job.title}</h3>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1">{job.location} • {job.jobType}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-primary-navy/10 text-primary-navy border border-primary-navy/20">
                  Active
                </span>
              </div>

              <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] font-extrabold text-primary-navy uppercase">
                  <Users className="h-4 w-4" />
                  <span>{job.applicantsCount} Applicants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleState(job)}
                    title="Pause Job"
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-text-secondary transition-colors cursor-pointer"
                  >
                    <ToggleLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(job)}
                    title="Duplicate Post"
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-text-secondary transition-colors cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleShare(job)}
                    title="Share Job link"
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-text-secondary transition-colors cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      deleteJob(job.id);
                      toast.success("Job post deleted successfully");
                    }}
                    title="Delete Job"
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:text-primary-navy transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border-color rounded-2xl p-16 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl text-text-muted">
            🔍
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-primary-navy">No Job Posts Found</h3>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              We couldn't find any job posts for your company. Try creating a new one!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
