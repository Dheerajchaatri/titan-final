"use client";

import React, { useState } from "react";
import { useJobStore } from "@/store/useJobStore";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { Sparkles, BrainCircuit, ShieldAlert, Award, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

export default function AiCandidateMatchingPage() {
  const { applications } = useJobStore();
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || "app-1");

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const handleSendInvite = (candidateName: string) => {
    toast.success(`Interview invitation sent to ${candidateName}!`);
  };

  const aiMatchDetails = {
    skillsMatch: 95,
    experienceMatch: 90,
    educationMatch: 92,
    resumeStrength: 93,
    ranking: "#1 Top Candidate",
    hiringRecommendation: "Highly Recommended. The candidate exhibits strong system architecture knowledge, is highly proficient with React/Next.js stack, and has active badges in JavaScript data structures.",
    suggestedQuestions: [
      "Explain the rendering lifecycle of React Server Components compared with standard client side hydration.",
      "How would you optimize the rendering paint metrics of a massive dynamic listings split page under narrow networks?",
      "Describe a scenario where you decoupled shared Zustand states to resolve memory leak issues."
    ],
    skillsGap: [
      { name: "React / Next.js", match: true },
      { name: "TypeScript", match: true },
      { name: "Zustand State", match: true },
      { name: "Docker Containerization", match: false, comment: "Suggested learning track" },
      { name: "GraphQL APIs", match: false, comment: "Recruiter optional" }
    ]
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
          <BrainCircuit className="h-3.5 w-3.5 text-primary-navy animate-pulse-slow" />
          <span>AI Talent Matchmaker</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2">AI Candidate Matching</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Review candidates rank indicator arrays, skill gap tables, and retrieve automated AI interview questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: candidates rank picker */}
        <div className="lg:col-span-4 bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
            Applicants Rank list
          </h3>
          <div className="flex flex-col gap-2.5">
            {applications.map((app, idx) => {
              const isSelected = app.id === selectedAppId;
              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={cn(
                    "w-full p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between transition-all hover:bg-slate-50 text-left cursor-pointer",
                    isSelected && "border-primary-navy bg-ice-blue-light/35 ring-1 ring-primary-navy/5"
                  )}
                >
                  <div className="min-w-0 flex-grow pr-3">
                    <h4 className="text-xs font-black text-primary-navy truncate">{app.candidateName}</h4>
                    <p className="text-[9px] text-text-secondary truncate mt-1">{app.jobTitle}</p>
                  </div>
                  <span className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-black text-primary-navy">
                    #{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: matching matrix & AI recommendations */}
        {selectedApp ? (
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Compatibility card summary */}
            <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-ice-blue border border-ice-blue-dark text-primary-navy font-bold text-xs flex items-center justify-center">
                    {selectedApp.candidateName.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-primary-navy leading-none">{selectedApp.candidateName}</h3>
                    <p className="text-[10px] text-text-muted mt-1 leading-none font-semibold">Applying for: {selectedApp.jobTitle}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded bg-primary-navy text-[9px] font-black text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                  <span>{selectedApp.matchScore}% AI Match</span>
                </span>
              </div>

              {/* Match Score breakdown matrix grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1 text-center">
                  <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider">Skills Compatibility</span>
                  <span className="text-lg font-black text-primary-navy mt-1">{aiMatchDetails.skillsMatch}%</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1 text-center">
                  <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider">Experience Level</span>
                  <span className="text-lg font-black text-primary-navy mt-1">{aiMatchDetails.experienceMatch}%</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1 text-center">
                  <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider">Education match</span>
                  <span className="text-lg font-black text-primary-navy mt-1">{aiMatchDetails.educationMatch}%</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1 text-center">
                  <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider">Resume Strength</span>
                  <span className="text-lg font-black text-primary-navy mt-1">{aiMatchDetails.resumeStrength}%</span>
                </div>
              </div>

            </div>

            {/* Hiring Decision & Skill gap */}
            <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1.5">
                <BrainCircuit className="h-4.5 w-4.5 text-primary-navy animate-pulse-slow" />
                <span>AI Hiring Recommendation</span>
              </h3>
              <p className="text-xs font-semibold text-text-secondary leading-relaxed bg-slate-50 border border-slate-200 p-4 rounded-xl">
                {aiMatchDetails.hiringRecommendation}
              </p>

              {/* Skills Analysis */}
              <div className="flex flex-col gap-3 mt-2">
                <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Skill Checklist Gap Analysis</h4>
                <div className="flex flex-wrap gap-2.5">
                  {aiMatchDetails.skillsGap.map((skill) => (
                    <span
                      key={skill.name}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border",
                        skill.match
                          ? "bg-primary-navy/10 border-primary-navy/20 text-primary-navy"
                          : "bg-slate-50 border-slate-200 text-text-secondary"
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", skill.match ? "bg-primary-navy" : "bg-slate-400")} />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Interview Questions */}
            <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
                Suggested Interview Questions
              </h3>
              <div className="flex flex-col gap-3 text-xs font-semibold text-text-secondary leading-relaxed">
                {aiMatchDetails.suggestedQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex gap-3.5 items-start">
                    <span className="h-5 w-5 rounded-full bg-ice-blue border border-ice-blue-dark text-primary-navy flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="mt-0.5">{q}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-50 pt-5 mt-2 flex justify-end gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold uppercase tracking-wider text-xs border-primary-navy/15 text-primary-navy hover:bg-ice-blue"
                  onClick={() => toast.success("Copied interview questionnaire to clipboard!")}
                >
                  Copy Questions
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="font-bold uppercase tracking-wider text-xs flex items-center gap-1"
                  onClick={() => handleSendInvite(selectedApp.candidateName)}
                >
                  <span>Invite to Interview</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-white border border-border-color rounded-2xl p-16 shadow-sm text-center flex flex-col items-center justify-center">
            <span className="text-2xl text-text-muted">👥</span>
            <p className="text-xs text-text-muted mt-2">Please post a job or wait for applications to check AI matching indices.</p>
          </div>
        )}

      </div>

    </div>
  );
}
