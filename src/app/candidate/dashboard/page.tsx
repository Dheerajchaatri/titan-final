"use client";

import React from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useJobStore } from "@/store/useJobStore";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowRight,
  MapPin
} from "lucide-react";

export default function CandidateDashboard() {
  const { user } = useUserStore();
  const { jobs, applications, savedJobIds } = useJobStore();

  const profile = user?.candidateProfile;
  if (!profile) return null;

  // Personalized Recommendation Scoring Engine
  const jobsWithScores = jobs.map((job) => {
    let matchScore = 65;

    if (profile.skills) {
      let matchedCount = 0;
      job.requirements.forEach(req => {
        const hasSkill = profile.skills.some(s => 
          s.name.toLowerCase().includes(req.toLowerCase()) || 
          req.toLowerCase().includes(s.name.toLowerCase())
        );
        if (hasSkill) matchedCount++;
      });
      const skillRatio = job.requirements.length > 0 ? (matchedCount / job.requirements.length) : 0;
      matchScore += Math.round(skillRatio * 20);
    }

    const isPreferredCity = profile.preferredCities.some(city => 
      job.location.toLowerCase().includes(city.toLowerCase())
    );
    if (isPreferredCity || job.location.toLowerCase() === "remote") {
      matchScore += 10;
    }

    const isPreferredCategory = job.category === "IT & Software" || job.category === "Graphic Design";
    if (isPreferredCategory) {
      matchScore += 5;
    }

    matchScore = Math.min(matchScore, 98);

    return { ...job, matchScore };
  });

  // Top 3 Recommended Jobs
  const recommendedJobs = jobsWithScores
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 3);

  const totalApplications = applications.length;
  const scheduledCount = applications.filter(a => a.status === "Interview Scheduled").length;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      
      {/* Dashboard Header / Welcome */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-navy tracking-tight">
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p className="text-xs text-text-secondary font-medium">
          Here is your job search overview and recommended opportunities.
        </p>
      </div>

      {/* 1. Profile Completion Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          {/* Radial progress indicator */}
          <div className="relative h-16 w-16 flex-shrink-0 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-slate-100 fill-none"
                strokeWidth="5"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-primary-navy fill-none transition-all duration-500"
                strokeWidth="5"
                strokeDasharray="163"
                strokeDashoffset={163 - (163 * profile.profileCompletion) / 100}
              />
            </svg>
            <span className="absolute text-xs font-black text-primary-navy">{profile.profileCompletion}%</span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-primary-navy uppercase tracking-wider">Profile Completion</h3>
            <p className="text-xs text-text-secondary font-medium max-w-md">
              Complete your profile details to unlock 3x higher AI match accuracy for software roles.
            </p>
          </div>
        </div>

        <Link href="/candidate/profile" className="flex-shrink-0 w-full sm:w-auto">
          <Button variant="primary" size="sm" className="w-full sm:w-auto px-5 py-2.5 bg-primary-navy hover:bg-primary-navy-light text-white font-bold text-xs rounded-xl shadow-2xs">
            Complete Profile
          </Button>
        </Link>
      </div>

      {/* 2. 4 Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        <div className="bg-white border border-slate-200/80 p-4.5 rounded-2xl shadow-2xs flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Applications</span>
          <span className="text-2xl font-black text-primary-navy">{totalApplications}</span>
        </div>

        <div className="bg-white border border-slate-200/80 p-4.5 rounded-2xl shadow-2xs flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Interview Calls</span>
          <span className="text-2xl font-black text-primary-navy">{scheduledCount}</span>
        </div>

        <div className="bg-white border border-slate-200/80 p-4.5 rounded-2xl shadow-2xs flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Saved Jobs</span>
          <span className="text-2xl font-black text-primary-navy">{savedJobIds.length}</span>
        </div>

        <div className="bg-white border border-slate-200/80 p-4.5 rounded-2xl shadow-2xs flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Match Score</span>
          <span className="text-2xl font-black text-primary-navy">{profile.aiEmployabilityScore}%</span>
        </div>
      </div>

      {/* 3. Recommended Jobs (Max 3 Jobs) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary-navy">Recommended for You</h3>
          <Link href="/jobs?tab=recommended" className="text-xs font-bold text-blue-600 hover:text-primary-navy transition-colors flex items-center gap-1 group">
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="flex flex-col gap-3">
          {recommendedJobs.map((job) => (
            <Link href={`/jobs/${job.id}`} key={job.id} className="block group">
              <div className="p-4 border border-slate-200/80 rounded-xl bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 hover:shadow-2xs transition-all duration-200">
                <div className="flex gap-3.5 items-center min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200/80 text-primary-navy font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                    {job.logo}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-primary-navy group-hover:text-blue-600 transition-colors truncate">{job.title}</h4>
                    <p className="text-[11px] text-text-secondary mt-0.5 font-medium truncate">{job.companyName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 text-right">
                  <div className="flex flex-col gap-0.5 text-left sm:text-right">
                    <span className="text-xs font-bold text-primary-navy">{job.salaryRange}</span>
                    <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" /> {job.location}
                    </span>
                  </div>
                  
                  <span className="px-2.5 py-1 rounded-lg bg-primary-navy text-[10px] font-bold text-white border border-primary-navy flex items-center gap-1 flex-shrink-0">
                    <Sparkles className="h-3 w-3 text-white" />
                    <span>{job.matchScore}% Match</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/jobs" className="self-center mt-1">
          <Button variant="outline" size="sm" className="font-bold uppercase tracking-wider text-xs border-slate-200 text-primary-navy hover:bg-slate-50 rounded-xl px-6">
            Explore More Jobs
          </Button>
        </Link>
      </div>

    </div>
  );
}
