"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { Calendar, Video, Clock, Check, X, Clipboard, ExternalLink } from "lucide-react";

interface InterviewSession {
  id: string;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  link: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
}

export default function InterviewManagementPage() {
  const [interviews, setInterviews] = useState<InterviewSession[]>([
    { id: "int-1", candidateName: "Ahmad Raza", jobTitle: "Senior Frontend Developer", date: "May 25, 2026", time: "10:00 AM", link: "https://meet.google.com/abc-defg-hij", status: "Scheduled", notes: "Focus on Next.js hydration optimization patterns." },
    { id: "int-2", candidateName: "Fatima Shah", jobTitle: "UI/UX Product Designer", date: "May 26, 2026", time: "02:00 PM", link: "https://meet.google.com/xyz-qprs-tuv", status: "Scheduled", notes: "Review design systems and Figma component properties." }
  ]);

  const handleUpdateStatus = (id: string, status: "Completed" | "Cancelled") => {
    setInterviews(prev => prev.map(i => 
      i.id === id ? { ...i, status } : i
    ));
    toast.success(`Interview session marked as ${status}.`);
  };

  const handleLaunchMeeting = (link: string) => {
    window.open(link, "_blank");
    toast.info("Launching recruitment meeting room...");
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
          <Calendar className="h-3.5 w-3.5 text-primary-navy" />
          <span>Interview Console</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2">Interview Scheduler</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Monitor upcoming video calls, calendar availability slots, and track feedback scorecards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Upcoming Interviews */}
        <div className="lg:col-span-8 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
            Scheduled Sessions
          </h3>

          <div className="flex flex-col gap-4">
            {interviews.length > 0 ? (
              interviews.map((session) => (
                <div key={session.id} className="p-4 border border-border-color rounded-xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-3.5 items-start">
                    <div className="h-10 w-10 rounded-xl bg-ice-blue border border-border-color text-primary-navy flex items-center justify-center flex-shrink-0">
                      <Video className="h-5 w-5 text-primary-navy" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-primary-navy">{session.candidateName}</h4>
                      <p className="text-[10px] text-text-secondary mt-0.5 font-semibold">Role: {session.jobTitle}</p>
                      
                      <div className="flex items-center gap-3.5 text-[9px] font-bold text-text-muted uppercase tracking-wider mt-2.5">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {session.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.time}</span>
                      </div>
                      
                      {session.notes && (
                        <p className="text-[9px] text-text-secondary italic mt-3 bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                          Recruiter Focus: {session.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {session.status === "Scheduled" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="py-1.5 px-3 text-[9px] uppercase font-bold border-slate-200 text-text-secondary bg-white hover:bg-slate-100 flex items-center gap-1"
                          onClick={() => handleUpdateStatus(session.id, "Cancelled")}
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Cancel</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="py-1.5 px-3 text-[9px] uppercase font-black tracking-wider flex items-center gap-1 border-primary-navy/20 text-primary-navy hover:bg-ice-blue"
                          onClick={() => handleUpdateStatus(session.id, "Completed")}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Complete</span>
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="py-1.5 px-3 text-[9px] uppercase font-black tracking-wider flex items-center gap-1"
                          onClick={() => handleLaunchMeeting(session.link)}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Join</span>
                        </Button>
                      </>
                    ) : (
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border",
                        session.status === "Completed"
                          ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      )}>
                        {session.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-text-muted text-xs">No interviews scheduled yet.</div>
            )}
          </div>
        </div>

        {/* Right column: Availability calendar layout */}
        <div className="lg:col-span-4 bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
            Availability Grid
          </h3>

          <div className="grid grid-cols-7 gap-1 text-center text-[8px] font-bold text-text-muted uppercase tracking-widest mb-1">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, idx) => {
              const day = idx + 1;
              const hasInterview = day === 25 || day === 26;
              return (
                <div
                  key={day}
                  className={cn(
                    "h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border border-slate-100 transition-colors select-none",
                    hasInterview
                      ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                      : "bg-slate-50/50 hover:bg-slate-100 text-text-primary"
                  )}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary">
              <span className="h-3 w-3 rounded-md bg-primary-navy flex-shrink-0" />
              <span>Interview Session Confirmed</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary">
              <span className="h-3 w-3 rounded-md bg-slate-50 border border-slate-200 flex-shrink-0" />
              <span>Available scheduler slots</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
