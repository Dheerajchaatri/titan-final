"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useJobStore, Job } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  MapPin,
  Briefcase,
  Bookmark,
  Sparkles,
  CheckCircle,
  Calendar,
  ChevronLeft,
  ArrowRight
} from "lucide-react";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  const { jobs, applications, applyJob, savedJobIds, toggleSaveJob } = useJobStore();
  const { user, isAuthenticated } = useUserStore();

  // Resolve initial job synchronously on first render frame to avoid any render flash or glitch
  const initialJob = React.useMemo(() => {
    if (!jobId || jobs.length === 0) return null;
    const foundJob = jobs.find(j => j.id === jobId);
    if (!foundJob) return null;

    let score = 75;
    if (user && user.candidateProfile) {
      const profile = user.candidateProfile;
      const skillScore = useJobStore.getState().calculateMatchScore(profile.skills, foundJob.requirements);
      const isPreferredCity = profile.preferredCities.some(city => foundJob.location.toLowerCase().includes(city.toLowerCase()));
      const isRemote = foundJob.location.toLowerCase() === "remote";
      const locationScore = (isPreferredCity || isRemote) ? 15 : 0;
      score = Math.min(skillScore + locationScore, 98);
    }
    return { ...foundJob, matchScore: score };
  }, [jobId, jobs, user]);

  const [job, setJob] = useState<Job | null>(initialJob);

  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("PKR 180k");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");
  const [portfolioLink, setPortfolioLink] = useState("https://linkedin.com/in/ahmadraza");
  const [resumeSource, setResumeSource] = useState<"uploaded" | "new">("uploaded");
  const [newResumeName, setNewResumeName] = useState("");

  useEffect(() => {
    if (initialJob) {
      setJob(initialJob);
    }
  }, [initialJob]);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center gap-4">
          <span className="text-3xl">🔍</span>
          <h2 className="text-sm font-black text-primary-navy">Job Not Found</h2>
          <Button variant="primary" size="sm" onClick={() => router.push("/jobs")}>
            Back to All Jobs
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const applied = user && applications.some(a => a.jobId === job.id && a.candidateId === user.id);

  const handleApplyClick = () => {
    if (!isAuthenticated || !user) {
      toast.info("Please log in to apply for this job.");
      router.push("/auth/login");
      return;
    }
    setCoverLetter(`I am highly interested in the ${job.title} position at ${job.companyName}. Based on my background, I believe my skills match your requirements.`);
    setApplyModalOpen(true);
  };

  const handleApplySubmit = () => {
    if (!user || !job) return;

    // Construct rich cover letter with all form inputs for high fidelity
    const richCoverLetter = `Expected Salary: ${expectedSalary}
Notice Period: ${noticePeriod}
Portfolio / LinkedIn: ${portfolioLink}
CV Option: ${resumeSource === "uploaded" ? "ahmad_raza_resume.pdf" : newResumeName || "new_uploaded_resume.pdf"}

Message:
${coverLetter}`;

    applyJob(
      job.id,
      user.id,
      user.name,
      user.candidateProfile?.title || "Developer",
      richCoverLetter,
      job.matchScore
    );
    toast.success(`Application sent to ${job.companyName}!`);
    setApplyModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12 flex flex-col gap-6">
        
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs font-bold text-text-secondary hover:text-primary-navy self-start transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Listings</span>
        </button>

        {/* Job Header */}
        <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-navy via-gold to-primary-navy-light" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-xl bg-ice-blue border border-border-color flex items-center justify-center text-primary-navy font-black text-base shadow-sm">
                {job.logo}
              </div>
              <div>
                <h1 className="text-lg font-black text-primary-navy leading-tight">{job.title}</h1>
                <p className="text-xs text-text-secondary mt-1 font-bold">{job.companyName}</p>
                
                <div className="flex flex-wrap gap-2.5 text-[9px] font-bold text-text-muted uppercase tracking-wider mt-2.5">
                  <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </span>
                  <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100 flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> {job.jobType}
                  </span>
                  <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    ⏱️ {job.experienceRequired}
                  </span>
                </div>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => toggleSaveJob(job.id)}
                className="p-2.5 rounded-xl border border-border-color text-text-muted hover:text-primary-navy transition-colors bg-white flex items-center justify-center cursor-pointer"
              >
                <Bookmark className={cn("h-5 w-5", isSaved && "fill-gold text-gold border-gold")} />
              </button>
              {applied ? (
                <span className="px-4 py-2.5 rounded-xl bg-emerald-50 text-xs font-black uppercase tracking-wider text-emerald-600 border border-emerald-100 flex items-center gap-1.5 flex-1 sm:flex-none justify-center">
                  <CheckCircle className="h-4 w-4" />
                  <span>Applied</span>
                </span>
              ) : (
                <Button
                  variant="primary"
                  className="py-2.5 px-6 font-bold uppercase tracking-wider text-xs flex-1 sm:flex-none"
                  onClick={handleApplyClick}
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Details content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Job Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Description */}
            <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2.5">
                Job Description
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2.5">
                Role Requirements
              </h3>
              <ul className="flex flex-col gap-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary font-semibold">
                    <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Skills Required */}
            <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2.5">
                Key Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-ice-blue/50 text-xs font-bold text-primary-navy border border-ice-blue-dark/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2.5">
                  Benefits & Perks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-primary-navy flex items-center gap-2">
                      <span>💎</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Insights & Details Summary */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* AI Fit */}
            {user && (
              <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-gold animate-pulse-slow" />
                  <span>AI Fit Compatibility</span>
                </h3>
                
                <div className="flex items-center gap-3.5 mt-1">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-primary-navy to-primary-navy-light text-white flex items-center justify-center font-black text-sm shadow-md">
                    {job.matchScore}%
                  </div>
                  <div>
                    <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-primary-navy">AI Score Card</h5>
                    <p className="text-[9px] text-text-secondary mt-0.5 leading-snug font-semibold">
                      {job.matchScore && job.matchScore >= 90
                        ? "Perfect match for your skill index!"
                        : "Good compatibility match score."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Information */}
            <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2">
                Summary details
              </h3>
              
              <div className="flex flex-col gap-3.5 text-xs font-semibold text-text-secondary">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Salary Range</span>
                  <span className="font-extrabold text-primary-navy">{job.salaryRange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Job Type</span>
                  <span className="font-extrabold text-primary-navy">{job.jobType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Experience</span>
                  <span className="font-extrabold text-primary-navy">{job.experienceRequired}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Posted Date</span>
                  <span className="font-extrabold text-primary-navy">{job.postedAt}</span>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2">
                Company Information
              </h3>
              <div className="flex flex-col gap-3 text-xs font-semibold text-text-secondary">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-black text-sm text-primary-navy border border-border-color">
                    {job.logo}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-navy">{job.companyName}</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">{job.industry}</p>
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed mt-1 font-semibold">
                  {job.companyName} is an industry-leading organization specializing in {job.industry || "general services"}. Committed to innovation and excellence, they offer a dynamic workplace environment promoting career growth and modern solutions.
                </p>
                <div className="border-t border-slate-100 pt-3 flex flex-col gap-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Location</span>
                    <span className="font-bold text-primary-navy">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Industry</span>
                    <span className="font-bold text-primary-navy">{job.industry}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />

      {/* Application Dialog Modal */}
      <Dialog
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title="Apply for Position"
        size="md"
      >
        <div className="flex flex-col gap-4 text-left">
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1">
            <span className="text-[8px] font-extrabold text-gold uppercase tracking-widest leading-none">Position</span>
            <h4 className="text-xs font-bold text-primary-navy mt-1 leading-none">{job.title}</h4>
            <p className="text-[10px] text-text-secondary font-semibold leading-none mt-1">{job.companyName}</p>
          </div>

          {/* Resume Option Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
              Select Resume / CV
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setResumeSource("uploaded")}
                className={cn(
                  "flex-1 py-2 px-3 border rounded-xl text-xs font-bold text-center transition-colors cursor-pointer",
                  resumeSource === "uploaded"
                    ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-text-secondary hover:bg-slate-100"
                )}
              >
                Use Uploaded CV
              </button>
              <button
                type="button"
                onClick={() => setResumeSource("new")}
                className={cn(
                  "flex-1 py-2 px-3 border rounded-xl text-xs font-bold text-center transition-colors cursor-pointer",
                  resumeSource === "new"
                    ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-text-secondary hover:bg-slate-100"
                )}
              >
                Upload New CV
              </button>
            </div>

            {resumeSource === "uploaded" ? (
              <div className="border border-border-color rounded-xl p-3 flex items-center justify-between bg-slate-50 mt-1 select-none">
                <div className="flex gap-2.5 items-center">
                  <span className="text-lg">📄</span>
                  <div>
                    <p className="text-[11px] font-bold text-primary-navy leading-none">ahmad_raza_resume.pdf</p>
                    <p className="text-[8px] text-text-muted mt-1 leading-none uppercase tracking-widest font-semibold">Verified in candidate database</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">Active</span>
              </div>
            ) : (
              <div className="mt-1 flex flex-col gap-2">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewResumeName(file.name);
                      toast.success(`Attached resume: ${file.name}`);
                    }
                  }}
                  className="w-full text-xs text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-ice-blue file:text-primary-navy file:cursor-pointer border border-border-color rounded-xl p-2 bg-slate-50"
                />
                {newResumeName && (
                  <p className="text-[10px] text-primary-navy font-bold pl-1">Selected: {newResumeName}</p>
                )}
              </div>
            )}
          </div>

          {/* Expected Salary & Notice Period Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
                Expected Salary
              </label>
              <Input
                type="text"
                placeholder="e.g. PKR 180k"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                className="w-full font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
                Notice Period
              </label>
              <select
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-primary-navy font-semibold"
              >
                <option value="Immediate">Immediate</option>
                <option value="15 Days">15 Days</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
                <option value="3 Months">3 Months</option>
              </select>
            </div>
          </div>

          {/* LinkedIn / Portfolio URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
              Portfolio / LinkedIn (Optional)
            </label>
            <Input
              type="url"
              placeholder="e.g. https://linkedin.com/in/username"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              className="w-full font-semibold"
            />
          </div>

          {/* Cover Letter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
              Cover Letter
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
              placeholder="Write a brief cover letter introduction..."
              className="w-full p-3.5 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all font-semibold"
            />
          </div>

          {/* Footer controls */}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs"
              onClick={() => setApplyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5"
              onClick={handleApplySubmit}
            >
              <span>Submit Application</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
