"use client";

import React, { useState } from "react";
import { useJobStore, JobApplication } from "@/store/useJobStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dialog } from "@/components/ui/Dialog";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { Search, Filter, Sparkles, Check, X, FileText, ChevronRight, CheckSquare, Square } from "lucide-react";

import { CvViewerModal, CandidateCvData } from "@/components/global/CvViewerModal";

export default function ApplicantsPage() {
  const { applications, updateApplicationStatus } = useJobStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [selectedCvCandidate, setSelectedCvCandidate] = useState<CandidateCvData | null>(null);

  const handleStatusChange = (appId: string, status: any) => {
    updateApplicationStatus(appId, status);
    toast.success(`Candidate status updated to ${status}`);
  };

  const handleBulkStatusChange = (status: any) => {
    if (selectedAppIds.length === 0) {
      toast.error("Please select candidates first.");
      return;
    }
    selectedAppIds.forEach(id => updateApplicationStatus(id, status));
    toast.success(`Updated status for ${selectedAppIds.length} candidates.`);
    setSelectedAppIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedAppIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedAppIds.length === filteredApps.length) {
      setSelectedAppIds([]);
    } else {
      setSelectedAppIds(filteredApps.map(a => a.id));
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.candidateTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Applicant Pipeline Tracking</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Review matching indexes, ATS scores, verify credentials, and manage candidate workflows.
        </p>
      </div>

      {/* Action Controls */}
      <div className="bg-white border border-border-color p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        
        {/* Row 1: Search Candidate field centered on its own row */}
        <div className="w-full max-w-xl mx-auto">
          <Input
            placeholder="Search candidates, positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-full text-xs text-center"
          />
        </div>

        {/* Row 2: All 6 Pipeline Filters with clear, generous spacing before and after each status */}
        <div className="flex flex-row items-center justify-center flex-wrap gap-2.5 sm:gap-3 md:gap-4 w-full pt-1">
          {["All", "Under Review", "Shortlisted", "Interview Scheduled", "Offer Received", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setSelectedAppIds([]);
              }}
              className={cn(
                "py-2 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold transition-all border uppercase tracking-wider cursor-pointer whitespace-nowrap text-center flex items-center justify-center shadow-2xs",
                statusFilter === status
                  ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-text-secondary hover:bg-slate-100"
              )}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Bulk Actions Console */}
      {selectedAppIds.length > 0 && (
        <div className="p-4 bg-ice-blue border border-ice-blue-dark/50 rounded-xl flex items-center justify-between animate-fade-in">
          <span className="text-[10px] font-bold text-primary-navy uppercase tracking-wider">
            {selectedAppIds.length} candidates selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="py-1 px-3 text-[9px] uppercase font-bold border-primary-navy/20 text-primary-navy bg-white hover:bg-ice-blue"
              onClick={() => handleBulkStatusChange("Shortlisted")}
            >
              Shortlist
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="py-1 px-3 text-[9px] uppercase font-bold"
              onClick={() => handleBulkStatusChange("Interview Scheduled")}
            >
              Invite Interview
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="py-1 px-3 text-[9px] uppercase font-bold border-slate-200 text-text-secondary bg-white hover:bg-slate-100"
              onClick={() => handleBulkStatusChange("Rejected")}
            >
              Reject
            </Button>
          </div>
        </div>
      )}

      {/* Applicants List Grid */}
      {filteredApps.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 pl-4 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-slate-100 pb-2">
            <button onClick={toggleSelectAll} className="p-1 hover:bg-slate-100 rounded cursor-pointer">
              {selectedAppIds.length === filteredApps.length ? (
                <CheckSquare className="h-4 w-4 text-primary-navy" />
              ) : (
                <Square className="h-4 w-4" />
              )}
            </button>
            <span className="flex-1">Candidate</span>
            <span className="w-40 hidden sm:block">Position</span>
            <span className="w-24 hidden md:block">Score</span>
            <span className="w-36 text-right">Workflow Status</span>
          </div>

          <div className="flex flex-col gap-3">
            {filteredApps.map((app) => {
              const isSelected = selectedAppIds.includes(app.id);
              return (
                <div
                  key={app.id}
                  className={cn(
                    "p-4 bg-white border border-border-color rounded-2xl shadow-sm flex items-center justify-between gap-4 transition-all",
                    isSelected && "border-primary-navy bg-ice-blue-light/30"
                  )}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button onClick={() => toggleSelect(app.id)} className="p-1 hover:bg-slate-100 rounded cursor-pointer flex-shrink-0">
                      {isSelected ? (
                        <CheckSquare className="h-4.5 w-4.5 text-primary-navy" />
                      ) : (
                        <Square className="h-4.5 w-4.5 text-text-muted" />
                      )}
                    </button>
                    <div className="h-9 w-9 rounded-lg bg-ice-blue border border-ice-blue-dark text-primary-navy font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {app.candidateName.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <div className="min-w-0 pr-4">
                      <h4 className="text-xs font-bold text-primary-navy truncate">{app.candidateName}</h4>
                      <p className="text-[10px] text-text-secondary truncate mt-0.5">{app.candidateTitle} • Lahore, PK</p>
                    </div>
                  </div>

                  <div className="w-40 hidden sm:block min-w-0">
                    <h5 className="text-xs font-bold text-primary-navy truncate">{app.jobTitle}</h5>
                    <p className="text-[9px] text-text-muted font-bold tracking-wider mt-0.5">Applied {app.appliedDate}</p>
                  </div>

                  <div className="w-24 hidden md:flex items-center gap-1">
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-primary-navy/5 text-primary-navy font-extrabold text-[9px] border border-primary-navy/15">
                      <Sparkles className="h-3 w-3 text-primary-navy" />
                      <span>{app.matchScore}%</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="px-2 py-1.5 border border-slate-200 bg-white rounded-lg text-[10px] font-bold text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary-navy"
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
                      className="py-1.5 px-3 text-[9px] uppercase font-black tracking-wider flex items-center gap-1"
                      onClick={() => setSelectedCvCandidate({ name: app.candidateName, title: app.jobTitle })}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">View CV</span>
                    </Button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-border-color rounded-2xl p-16 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl text-text-muted">
            👥
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-primary-navy">No Candidates Found</h3>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              We couldn't find any applicants matching your filter parameters.
            </p>
          </div>
        </div>
      )}

      {/* Dynamic Candidate CV Document Modal */}
      <CvViewerModal
        isOpen={!!selectedCvCandidate}
        onClose={() => setSelectedCvCandidate(null)}
        candidate={selectedCvCandidate}
      />

    </div>
  );
}
