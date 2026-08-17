"use client";

import React, { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { Upload, Sparkles, CheckCircle, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";

export default function ResumeAnalyzerPage() {
  const { analyzeResume } = useChatStore();
  const { user } = useUserStore();
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [report, setReport] = useState<{
    isSupported?: boolean;
    unsupportedField?: string;
    score: number;
    atsScore: number;
    feedback: string[];
    missingSkills: string[];
    matches?: any[];
  } | null>(null);

  const loadingSteps = [
    "Uploading Resume...",
    "Extracting Resume Data...",
    "Reading Experience...",
    "Detecting Skills...",
    "Checking Education...",
    "Identifying Career Field...",
    "Matching Against TITAN Jobs...",
    "Calculating ATS Score...",
    "Generating AI Recommendations..."
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleStartAnalysis = () => {
    if (!file) {
      toast.error("Please choose a file to analyze.");
      return;
    }
    
    // File validation
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'doc' && ext !== 'docx') {
      toast.error("Invalid file format. Please upload a PDF, DOC, or DOCX document.");
      return;
    }

    setIsParsing(true);
    setCurrentStepIdx(0);
    setReport(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setCurrentStepIdx(step);
      } else {
        clearInterval(interval);
        const results = analyzeResume(file.name);
        setReport(results);
        setIsParsing(false);
        toast.success("AI Resume Analysis completed!");
      }
    }, 450);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-navy/5 text-[9px] font-black text-primary-navy border border-primary-navy/10 uppercase tracking-widest">
          <Sparkles className="h-3 w-3 text-gold" />
          <span>AI Parser Tools</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2">AI Resume Analyzer</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Upload your PDF CV and our parser will analyze it against standard ATS scoring parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Upload Column */}
        <div className="lg:col-span-5 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-primary-navy">Upload PDF CV</h3>
            <p className="text-[10px] text-text-muted">Maximum file size: 5MB</p>
          </div>

          <label className="border-2 border-dashed border-border-color hover:border-primary-navy rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/50 transition-all select-none cursor-pointer flex flex-col items-center gap-3">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="h-8 w-8 text-primary-navy" />
            <div>
              <p className="text-xs font-bold text-primary-navy leading-none">
                {file ? file.name : "Choose CV File"}
              </p>
              <p className="text-[9px] text-text-muted mt-1 leading-none">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "or drag and drop here"}
              </p>
            </div>
          </label>

          <Button
            variant="primary"
            className="w-full py-3 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
            onClick={handleStartAnalysis}
            isLoading={isParsing}
            disabled={!file}
          >
            {isParsing ? "Scanning Document..." : "Analyze CV Profile"}
          </Button>
        </div>

        {/* Audit Report Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {report && !isParsing ? (
            report.isSupported === false ? (
              /* Unsupported Field Information Card */
              <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-center flex-col text-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200/65 flex items-center justify-center text-amber-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-black text-primary-navy uppercase tracking-wider">Career Field Not Available</h3>
                  <p className="text-[11px] text-text-muted font-bold">Your resume has been successfully analyzed.</p>
                </div>
                
                <div className="bg-slate-50 border border-slate-100/80 rounded-xl p-4 flex flex-col gap-3 text-xs font-semibold text-text-secondary">
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">Detected Career Field</span>
                    <span className="text-rose-500 font-extrabold">{report.unsupportedField}</span>
                  </div>
                  
                  <div className="border-t border-slate-200/50 pt-3">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1.5">Currently TITAN supports only</span>
                    <ul className="grid grid-cols-2 gap-2 text-[10px]">
                      <li className="flex items-center gap-1.5">&bull; IT & Software</li>
                      <li className="flex items-center gap-1.5">&bull; Graphic Design</li>
                      <li className="flex items-center gap-1.5">&bull; AI & Data</li>
                      <li className="flex items-center gap-1.5">&bull; Marketing</li>
                      <li className="flex items-center gap-1.5">&bull; Finance</li>
                      <li className="flex items-center gap-1.5">&bull; HR & Recruitment</li>
                      <li className="flex items-center gap-1.5">&bull; Engineering</li>
                      <li className="flex items-center gap-1.5">&bull; Government</li>
                    </ul>
                  </div>
                  
                  <p className="text-[9px] text-text-muted font-semibold mt-1 italic border-t border-slate-200/50 pt-2">
                    More industries will be added in future updates.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Audit Scorecard</h3>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">
                    Success
                  </span>
                </div>

                {/* Gauges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                    <div>
                      <h5 className="text-[10px] font-extrabold text-primary-navy uppercase tracking-wider">Resume Score</h5>
                      <p className="text-lg font-black text-primary-navy mt-1 leading-none">{report.score}/100</p>
                    </div>
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                    <div>
                      <h5 className="text-[10px] font-extrabold text-primary-navy uppercase tracking-wider">ATS Score</h5>
                      <p className="text-lg font-black text-emerald-600 mt-1 leading-none">{report.atsScore}%</p>
                    </div>
                    <Sparkles className="h-6 w-6 text-gold" />
                  </div>
                </div>

                {/* Findings */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Key Findings</h4>
                  <ul className="flex flex-col gap-2.5 text-xs font-semibold text-text-secondary">
                    {report.feedback.map((feed, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        {feed.includes("Consider") || feed.includes("Improve") ? (
                          <AlertTriangle className="h-4.5 w-4.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="h-4.5 w-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        )}
                        <span>{feed}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Skills */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-rose-500">Missing Critical Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {report.missingSkills.map((sk) => (
                      <span key={sk} className="px-2.5 py-1 rounded-lg bg-rose-50 text-[9px] font-extrabold text-rose-600 border border-rose-100">
                        + Add {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job Matches */}
                {report.matches && report.matches.length > 0 ? (
                  <div className="flex flex-col gap-4 border-t border-slate-100 pt-5">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Recommended Job Matches</h4>
                    <div className="flex flex-col gap-4">
                      {report.matches.map((match: any, idx: number) => (
                        <div key={match.jobId} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                {idx === 0 ? "Best Match" : idx === 1 ? "Second Match" : "Third Match"}
                              </span>
                              <h5 className="text-xs font-black text-primary-navy mt-0.5">{match.title}</h5>
                              <p className="text-[10px] text-text-muted font-semibold">{match.companyName} &bull; {match.location}</p>
                            </div>
                            <span className="text-sm font-black text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-2.5 py-1 rounded-lg">
                              {match.matchScore}%
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3.5 border-t border-slate-200/40 pt-3 text-[10px] font-semibold text-text-secondary">
                            <div>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Matching Skills</span>
                              <div className="flex flex-wrap gap-1">
                                {match.matchingSkills.map((sk: string) => (
                                  <span key={sk} className="px-1.5 py-0.5 rounded bg-emerald-50 text-[8px] text-emerald-600 font-extrabold">{sk}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Missing Skills</span>
                              <div className="flex flex-wrap gap-1">
                                {match.missingSkills.map((sk: string) => (
                                  <span key={sk} className="px-1.5 py-0.5 rounded bg-rose-50 text-[8px] text-rose-600 font-extrabold">{sk}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 border-t border-slate-200/40 pt-3 text-[9px] font-bold text-text-muted">
                            <div>
                              <span className="block text-[8px] text-slate-400 uppercase tracking-widest mb-0.5">Qualification Match</span>
                              <span className="text-primary-navy font-extrabold">{match.qualificationMatch}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-slate-400 uppercase tracking-widest mb-0.5">Experience Match</span>
                              <span className="text-primary-navy font-extrabold">{match.experienceMatch}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-slate-400 uppercase tracking-widest mb-0.5">ATS Compatibility</span>
                              <span className="text-primary-navy font-extrabold">{match.atsCompatibility}</span>
                            </div>
                          </div>
                          
                          {/* Skill Gap Analysis detail */}
                          <div className="border-t border-slate-200/40 pt-3 flex flex-col gap-2 text-[9px]">
                            <div>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Recommended Certifications</span>
                              <p className="text-text-secondary font-semibold">{match.certifications.join(", ")}</p>
                            </div>
                            <div>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Suggested Learning Path & Course</span>
                              <p className="text-text-secondary font-semibold">{match.learningPath} &bull; <span className="text-primary-navy font-extrabold">{match.course}</span></p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-center flex flex-col items-center gap-2 border-t border-slate-100 pt-5 mt-4">
                    <AlertCircle className="h-5 w-5 text-slate-400" />
                    <h5 className="text-xs font-bold text-primary-navy">No Job Match Available</h5>
                    <p className="text-[10px] text-text-muted max-w-xs font-semibold leading-relaxed">
                      Currently, there are no matching job openings available for your profile on the TITAN platform. Please check again later or explore other available opportunities.
                    </p>
                  </div>
                )}

              </div>
            )
          ) : isParsing ? (
            /* Progressive AI Loading Card */
            <div className="bg-white border border-border-color rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px] gap-4">
              <RefreshCw className="h-8 w-8 text-primary-navy animate-spin" />
              <div className="flex flex-col items-center gap-1.5 text-center">
                <h4 className="text-sm font-black text-primary-navy uppercase tracking-wider">AI Audit In Progress</h4>
                <p className="text-xs font-bold text-slate-500 animate-pulse mt-1">
                  {loadingSteps[currentStepIdx]}
                </p>
              </div>
              
              <div className="w-full max-w-[240px] h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-primary-navy to-primary-navy-light transition-all duration-300"
                  style={{ width: `${((currentStepIdx + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
            </div>
          ) : null}

        </div>

      </div>

    </div>
  );
}
