"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { FileText, Download, BarChart2, ShieldAlert, Award } from "lucide-react";

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
}

export default function EmployerReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string>("rep-1");

  const reports: ReportTemplate[] = [
    { id: "rep-1", title: "Recruitment Performance Summary", description: "Comprehensive breakdown of hires, conversion metrics, and average time-to-hire across departments.", category: "Hiring", size: "1.2 MB" },
    { id: "rep-2", title: "Video Interviews Ledger", description: "Chronological lists of scheduled, completed, and canceled recruiter panel meetings.", category: "Interviews", size: "480 KB" },
    { id: "rep-3", title: "ATS Match Index Audits", description: "Statistical mapping of semantic match precision, candidate profile rankings, and resume keywords.", category: "AI Performance", size: "820 KB" }
  ];

  const handleExport = (title: string, format: string) => {
    toast.success(`Exporting ${title} in ${format} format...`);
  };

  const activeReport = reports.find(r => r.id === selectedReportId) || reports[0];

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Talent Acquisition Reports</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Compile custom statistics, download recruiter sheets, and analyze workflow logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left: Report Templates List */}
        <div className="md:col-span-5 bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1">
            <BarChart2 className="h-4.5 w-4.5 text-primary-navy" />
            <span>Available Summaries</span>
          </h3>

          <div className="flex flex-col gap-2.5">
            {reports.map((rep) => {
              const isSelected = rep.id === selectedReportId;
              return (
                <button
                  key={rep.id}
                  onClick={() => setSelectedReportId(rep.id)}
                  className={cn(
                    "w-full p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col transition-all hover:bg-slate-50 text-left cursor-pointer",
                    isSelected && "border-primary-navy bg-ice-blue-light/35"
                  )}
                >
                  <h4 className="text-xs font-black text-primary-navy leading-snug">{rep.title}</h4>
                  <span className="text-[8px] font-bold text-primary-navy bg-primary-navy/10 border border-primary-navy/20 px-2 py-0.5 rounded-md mt-2 self-start uppercase tracking-wider">
                    {rep.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Report actions */}
        {activeReport && (
          <div className="md:col-span-7 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6 animate-fade-in">
            <div className="border-b border-slate-50 pb-4">
              <h3 className="text-sm font-black text-primary-navy leading-snug">{activeReport.title}</h3>
              <p className="text-[10px] text-text-muted mt-1 leading-none uppercase tracking-wider font-bold">Category: {activeReport.category}</p>
            </div>

            <p className="text-xs font-semibold text-text-secondary leading-relaxed">
              {activeReport.description}
            </p>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-wider">
              <span>Estimated File Weight</span>
              <span className="text-primary-navy font-black">{activeReport.size}</span>
            </div>

            {/* Export buttons */}
            <div className="border-t border-slate-50 pt-5 mt-2 flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="font-bold uppercase tracking-wider text-xs flex-1 justify-center py-2.5 flex items-center gap-1.5 border-primary-navy/15 text-primary-navy hover:bg-ice-blue"
                onClick={() => handleExport(activeReport.title, "Excel")}
              >
                <Download className="h-4 w-4" />
                <span>Export Excel</span>
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                className="font-bold uppercase tracking-wider text-xs flex-1 justify-center py-2.5 flex items-center gap-1.5"
                onClick={() => handleExport(activeReport.title, "PDF")}
              >
                <FileText className="h-4 w-4" />
                <span>Download PDF</span>
              </Button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
