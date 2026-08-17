"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { BookOpen, FileText, Award, Download, ExternalLink, HelpCircle, Flame, DollarSign, Layers, Compass, Video, ChevronRight } from "lucide-react";

export default function CareerResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const downloadableTemplates = [
    { title: "Standard ATS Resume Template", format: "DOCX", size: "120 KB", downloads: "12,450" },
    { title: "Modern Software Engineer Resume", format: "PDF", size: "240 KB", downloads: "8,920" },
    { title: "Recruiter Cover Letter Layout", format: "DOCX", size: "95 KB", downloads: "5,410" },
  ];

  const roadmaps = [
    { title: "Frontend Web Developer (2026)", steps: ["React 19", "Next.js 16 (Turbopack)", "Tailwind v4", "TypeScript", "Zustand State Engine"] },
    { title: "AI / ML Solutions Engineer", steps: ["Python & Pandas", "TensorFlow & PyTorch", "Model Evaluation & Deployment", "AWS SageMaker"] },
    { title: "Full Stack Node.js Architect", steps: ["Express & Node.js", "PostgreSQL Database Design", "Microservices & Docker", "GraphQL APIs"] },
  ];

  const techTrends = [
    { name: "React 19 Server Components", growth: "+145%", demand: "Very High" },
    { name: "Next.js Turbopack Compilers", growth: "+92%", demand: "High" },
    { name: "Tailwind CSS v4 Engine", growth: "+80%", demand: "High" },
    { name: "Docker Containerization & K8s", growth: "+64%", demand: "Steady" },
  ];

  const handleDownload = (filename: string) => {
    toast.success(`Downloading template: ${filename}`);
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      
      {/* Hero Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start uppercase tracking-wider">
          <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
          <span>Knowledge Hub</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2.5">Career Resource Center</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Explore curated resume guidelines, interview prep sheets, salary insights, and professional roadmaps.
        </p>
      </div>

      {/* Main split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Guides, Templates, Roadmaps */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          
          {/* Resume Writing Tips & Templates */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-indigo-600 animate-pulse-slow" />
              <span>Resume Writing & Downloadable Templates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-2">
                <h4 className="text-xs font-bold text-primary-navy">ATS Optimization Guidelines</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
                  Ensure your resume passes ATS sifting algorithms. Avoid heavy tables or multi-column grids, use simple header symbols, and integrate key requirements tags explicitly in your experience lists.
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-2">
                <h4 className="text-xs font-bold text-primary-navy">Strong Action Verbs List</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
                  Replace weak descriptive tags. Use action-focused verbs like "engineered user interfaces", "architected data models", "optimized bundle sizes", and "moderated backend pools".
                </p>
              </div>
            </div>

            {/* Template lists */}
            <div className="flex flex-col gap-3 mt-1">
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Free Downloadable Templates</h4>
              <div className="flex flex-col gap-2.5">
                {downloadableTemplates.map((tmp) => (
                  <div key={tmp.title} className="p-3.5 border border-slate-100 rounded-xl bg-white flex items-center justify-between gap-4 hover:border-slate-200 transition-colors">
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="h-8 w-8 rounded-lg bg-ice-blue border border-border-color text-primary-navy text-[10px] font-black flex items-center justify-center flex-shrink-0">
                        {tmp.format}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-primary-navy truncate">{tmp.title}</h5>
                        <p className="text-[9px] text-text-muted mt-0.5 font-bold uppercase tracking-wider">{tmp.size} • {tmp.downloads} downloads</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="py-1 px-3 text-[9px] uppercase font-bold flex items-center gap-1"
                      onClick={() => handleDownload(tmp.title)}
                    >
                      <Download className="h-3 w-3" />
                      <span>Get</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Career Roadmaps */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-indigo-600" />
              <span>Interactive Career Roadmaps</span>
            </h3>

            <div className="flex flex-col gap-4">
              {roadmaps.map((rm) => (
                <div key={rm.title} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-primary-navy">{rm.title}</h4>
                  
                  {/* Timeline steps */}
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {rm.steps.map((step, idx) => (
                      <React.Fragment key={step}>
                        <span className="px-2.5 py-1 rounded bg-white text-[9px] font-black border border-slate-200 text-text-secondary uppercase tracking-wider shadow-sm">
                          {step}
                        </span>
                        {idx < rm.steps.length - 1 && (
                          <ChevronRight className="h-3.5 w-3.5 text-text-muted flex-shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Preparation Articles & Videos */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-2">
              <Video className="h-4.5 w-4.5 text-indigo-600" />
              <span>Interview Prep & Video Guides</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Mastering Behavioral Rounds", dur: "12 Mins", platform: "Video" },
                { title: "React 19 Sprints Interview Prep", dur: "8 Mins Read", platform: "Article" },
                { title: "Negotiating Tech Salary PKR", dur: "15 Mins", platform: "Video" },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 border border-slate-100 rounded-xl bg-slate-50/30 flex flex-col justify-between gap-3 text-left">
                  <span className="text-[8px] font-black uppercase text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded bg-indigo-50 self-start">
                    {item.platform}
                  </span>
                  <h4 className="text-xs font-bold text-primary-navy leading-snug mt-1.5">{item.title}</h4>
                  <span className="text-[9px] text-text-muted mt-2 font-bold uppercase">{item.dur}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Tech Trends, Salary bands, FAQ */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Trending Technologies */}
          <div className="bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-gold animate-bounce" />
              <span>Trending Technologies</span>
            </h3>

            <div className="flex flex-col gap-3">
              {techTrends.map((trend) => (
                <div key={trend.name} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50/40">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary-navy">{trend.name}</span>
                    <span className="text-[8px] text-emerald-600 font-extrabold mt-0.5 uppercase tracking-wider">Demand: {trend.demand}</span>
                  </div>
                  <span className="text-xs font-black text-indigo-600">{trend.growth}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Salary guides PKR */}
          <div className="bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1">
              <DollarSign className="h-4.5 w-4.5 text-indigo-600" />
              <span>Salary Guides (PKR)</span>
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { title: "Senior Frontend Developer", range: "PKR 180k - 280k", loc: "Lahore" },
                { title: "AI/ML Solutions Architect", range: "PKR 220k - 350k", loc: "Islamabad" },
                { title: "UI/UX Product Designer", range: "PKR 120k - 190k", loc: "Karachi" },
              ].map((sal, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold text-primary-navy">
                    <span>{sal.title}</span>
                    <span className="text-indigo-600">{sal.loc}</span>
                  </div>
                  <span className="text-[10px] text-text-muted mt-1 font-bold">{sal.range} / Month</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs section */}
          <div className="bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1">
              <HelpCircle className="h-4.5 w-4.5 text-gold" />
              <span>Job Search FAQs</span>
            </h3>

            <div className="flex flex-col gap-3.5 text-left text-xs font-semibold text-text-secondary leading-relaxed">
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-primary-navy">How often should I tune my CV keywords?</h4>
                <p className="text-[10px] text-text-muted font-medium">Update tags for every job submission. Make sure they exactly mirror key developer requirements listed in the post.</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-3">
                <h4 className="font-bold text-primary-navy">Can I negotiate remote allowances?</h4>
                <p className="text-[10px] text-text-muted font-medium">Yes. Most tech businesses in Karachi and Lahore provide remote home internet stipends of PKR 5,000 to PKR 15,000 monthly.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
