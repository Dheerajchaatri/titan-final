"use client";

import React from "react";
import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Bookmark, MapPin, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/Toast";

export default function SavedJobsPage() {
  const { jobs, savedJobIds, toggleSaveJob } = useJobStore();
  const { user } = useUserStore();

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  const handleRemove = (id: string, name: string) => {
    toggleSaveJob(id);
    toast.success(`Removed ${name} from saved jobs.`);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Saved Jobs</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Review and apply to roles you have bookmarked.
        </p>
      </div>

      <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm">
        {savedJobs.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <span className="text-3xl">🔖</span>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-primary-navy">No Saved Jobs</h4>
              <p className="text-xs text-text-muted">Bookmark jobs during search to track them here.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <div key={job.id} className="border border-border-color rounded-xl p-5 bg-white relative flex flex-col gap-3 justify-between hover:shadow-md transition-shadow">
                
                <div className="flex gap-3.5 items-start">
                  <div className="h-10 w-10 rounded-lg bg-ice-blue border border-border-color flex items-center justify-center text-primary-navy font-black text-xs flex-shrink-0">
                    {job.logo}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-navy leading-tight">{job.title}</h4>
                    <p className="text-[10px] text-text-secondary mt-0.5 font-semibold">{job.companyName}</p>
                    
                    <div className="flex flex-wrap gap-2 text-[9px] font-bold text-text-muted uppercase tracking-wider mt-2.5">
                      <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {job.location}</span>
                      <span className="flex items-center gap-0.5"><Briefcase className="h-3 w-3" /> {job.jobType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-1.5">
                  <span className="text-xs font-black text-primary-navy">{job.salaryRange}</span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemove(job.id, job.title)}
                      className="p-1.5 rounded-lg border border-border-color text-text-muted hover:text-rose-500 bg-white"
                    >
                      <Bookmark className="h-4 w-4 fill-gold text-gold" />
                    </button>
                    <Link href={`/jobs`}>
                      <Button variant="primary" size="sm" className="px-3.5 py-1.5 text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1">
                        <span>Apply</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Match percentage tags */}
                {user && job.matchScore && (
                  <div className="absolute top-3 right-3 flex items-center gap-0.5 text-[8px] font-black text-primary-navy">
                    <Sparkles className="h-2.5 w-2.5 text-gold" />
                    <span>{job.matchScore}% Match</span>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
