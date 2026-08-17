"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useJobStore, Job } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";
import { Dialog } from "@/components/ui/Dialog";
import { toast } from "@/components/ui/Toast";
import {
  Search,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  Award,
  ChevronRight,
  UserCheck,
  CheckCircle,
  Clock
} from "lucide-react";

function JobsPageContent() {
  const searchParams = useSearchParams();
  const { jobs, applications, applyJob, savedJobIds, toggleSaveJob } = useJobStore();
  const { user } = useUserStore();

  // Search parameters from URL
  const initialKeyword = searchParams.get("keyword") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialRemote = searchParams.get("remote") === "true";
  const initialTab = searchParams.get("tab") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialType = searchParams.get("type") || "";

  // Local filter states
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [isRemote, setIsRemote] = useState(initialRemote);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(
    initialType ? [initialType === "internship" ? "Internship" : initialType] : []
  );
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  
  // Active job details modal or sidebar
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  
  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("PKR 180k");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");
  const [portfolioLink, setPortfolioLink] = useState("https://linkedin.com/in/ahmadraza");
  const [resumeSource, setResumeSource] = useState<"uploaded" | "new">("uploaded");
  const [newResumeName, setNewResumeName] = useState("");

  // Sync search parameters from URL query when page is loaded or routed
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "internship") {
      setSelectedJobTypes(["Internship"]);
    } else if (typeParam) {
      setSelectedJobTypes([typeParam === "internship" ? "Internship" : typeParam]);
    }
    
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    }

    const kwParam = searchParams.get("keyword");
    if (kwParam) {
      setKeyword(kwParam);
    }

    const locParam = searchParams.get("location");
    if (locParam) {
      setLocation(locParam);
    }

    const remoteParam = searchParams.get("remote");
    if (remoteParam === "true") {
      setIsRemote(true);
    }
  }, [searchParams]);

  // Sync URL query state dynamically
  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    if (isRemote) params.set("remote", "true");
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedJobTypes.length > 0) params.set("types", selectedJobTypes.join(","));
    if (selectedExperience.length > 0) params.set("experience", selectedExperience.join(","));
    if (initialTab) params.set("tab", initialTab);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [keyword, location, isRemote, selectedCategory, selectedJobTypes, selectedExperience]);

  // Handle default selection and category/filter synchronization
  useEffect(() => {
    const activeProfile = user?.candidateProfile;
    const currentJobsWithScores = jobs.map((job) => {
      let score = 70;
      if (activeProfile) {
        const skillScore = useJobStore.getState().calculateMatchScore(activeProfile.skills, job.requirements);
        const isPreferredCity = activeProfile.preferredCities.some(city => job.location.toLowerCase().includes(city.toLowerCase()));
        const isRemote = job.location.toLowerCase() === "remote";
        const locationScore = (isPreferredCity || isRemote) ? 15 : 0;
        score = Math.min(skillScore + locationScore, 98);
      }
      return { ...job, matchScore: score };
    });

    const activeFiltered = currentJobsWithScores.filter((job) => {
      if (keyword) {
        const kw = keyword.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(kw);
        const matchCompany = job.companyName.toLowerCase().includes(kw);
        const matchDesc = job.description.toLowerCase().includes(kw);
        const matchReqs = job.requirements.some(r => r.toLowerCase().includes(kw));
        const matchLocation = job.location.toLowerCase().includes(kw);
        if (!matchTitle && !matchCompany && !matchDesc && !matchReqs && !matchLocation) return false;
      }
      if (location) {
        const loc = location.toLowerCase();
        if (!job.location.toLowerCase().includes(loc)) return false;
      }
      if (isRemote) {
        if (job.location.toLowerCase() !== "remote") return false;
      }
      if (selectedJobTypes.length > 0) {
        const formattedTypes = selectedJobTypes.map(t => t.toLowerCase());
        if (!formattedTypes.includes(job.jobType.toLowerCase())) return false;
      }
      if (selectedExperience.length > 0) {
        if (!selectedExperience.includes(job.experienceRequired)) return false;
      }
      if (selectedCategory) {
        const catLower = selectedCategory.toLowerCase();
        const jobCatLower = job.category.toLowerCase();
        if (
          jobCatLower !== catLower &&
          !jobCatLower.includes(catLower) &&
          !catLower.includes(jobCatLower)
        ) {
          return false;
        }
      }
      return true;
    });

    if (activeFiltered.length > 0) {
      const exists = activeFiltered.some(j => j.id === activeJob?.id);
      if (!exists) {
        setActiveJob(activeFiltered[0]);
      }
    } else {
      setActiveJob(null);
    }
  }, [keyword, location, isRemote, selectedCategory, selectedJobTypes, selectedExperience, jobs, user]);

  // Calculate scores and filter
  const profile = user?.candidateProfile;
  const jobsWithScores = jobs.map((job) => {
    let score = 70;
    if (profile) {
      const skillScore = useJobStore.getState().calculateMatchScore(profile.skills, job.requirements);
      const isPreferredCity = profile.preferredCities.some(city => job.location.toLowerCase().includes(city.toLowerCase()));
      const isRemote = job.location.toLowerCase() === "remote";
      const locationScore = (isPreferredCity || isRemote) ? 15 : 0;
      score = Math.min(skillScore + locationScore, 98);
    }
    return { ...job, matchScore: score };
  });

  // Filtering Logic
  const filteredJobs = jobsWithScores.filter((job) => {
    // Keyword match
    if (keyword) {
      const kw = keyword.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(kw);
      const matchCompany = job.companyName.toLowerCase().includes(kw);
      const matchDesc = job.description.toLowerCase().includes(kw);
      const matchReqs = job.requirements.some(r => r.toLowerCase().includes(kw));
      const matchLocation = job.location.toLowerCase().includes(kw);
      if (!matchTitle && !matchCompany && !matchDesc && !matchReqs && !matchLocation) return false;
    }

    // Location match
    if (location) {
      const loc = location.toLowerCase();
      if (!job.location.toLowerCase().includes(loc)) return false;
    }

    // Remote match
    if (isRemote) {
      if (job.location.toLowerCase() !== "remote") return false;
    }

    // Job Type match
    if (selectedJobTypes.length > 0) {
      const formattedTypes = selectedJobTypes.map(t => t.toLowerCase());
      if (!formattedTypes.includes(job.jobType.toLowerCase())) return false;
    }

    // Experience match
    if (selectedExperience.length > 0) {
      if (!selectedExperience.includes(job.experienceRequired)) return false;
    }

    // Category match
    if (selectedCategory) {
      if (job.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    return true;
  });

  // Sorting Logic: Recommended sorts by highest compatibility
  if (initialTab === "recommended") {
    filteredJobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  } else {
    filteredJobs.sort((a, b) => {
      const numA = parseInt(a.id.replace("job-", "")) || 0;
      const numB = parseInt(b.id.replace("job-", "")) || 0;
      return numB - numA;
    });
  }

  // Check if candidate already applied for a job
  const hasApplied = (jobId: string) => {
    if (!user) return false;
    return applications.some(a => a.jobId === jobId && a.candidateId === user.id);
  };

  const handleApplyClick = (job: Job) => {
    if (!user) {
      toast.info("Please log in to apply for this job.");
      return;
    }
    setApplyingJob(job);
    setCoverLetter(`I am highly interested in the ${job.title} position at ${job.companyName}. Based on my background, I believe my skills match your requirements.`);
    setApplyModalOpen(true);
  };

  const handleApplySubmit = () => {
    if (!applyingJob || !user) return;
    
    // Construct rich cover letter with all form inputs for high fidelity
    const richCoverLetter = `Expected Salary: ${expectedSalary}
Notice Period: ${noticePeriod}
Portfolio / LinkedIn: ${portfolioLink}
CV Option: ${resumeSource === "uploaded" ? "ahmad_raza_resume.pdf" : newResumeName || "new_uploaded_resume.pdf"}

Message:
${coverLetter}`;

    applyJob(
      applyingJob.id,
      user.id,
      user.name,
      user.candidateProfile?.title || "Developer",
      richCoverLetter,
      applyingJob.matchScore
    );
    
    toast.success(`Application sent to ${applyingJob.companyName}!`);
    setApplyModalOpen(false);
    setApplyingJob(null);
  };

  const handleJobTypeToggle = (type: string) => {
    setSelectedJobTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleExperienceToggle = (exp: string) => {
    setSelectedExperience(prev =>
      prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        
        {/* Search header bar */}
        <div className="bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <Input
              type="text"
              placeholder="Search job title, skills, or keywords"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              icon={<Search className="h-4.5 w-4.5" />}
              className="border-none shadow-none focus:ring-0"
            />
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div className="flex-1 w-full">
            <Input
              type="text"
              placeholder="Location or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={<MapPin className="h-4.5 w-4.5" />}
              className="border-none shadow-none focus:ring-0"
            />
          </div>
          <div className="flex items-center gap-4 select-none">
            <label className="flex items-center gap-2 text-xs font-bold text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="rounded border-slate-300 text-primary-navy focus:ring-primary-navy"
              />
              Remote Only
            </label>
          </div>
        </div>

        {/* Workspace body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Advanced Filters Sidebar */}
          <div className="lg:col-span-3 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-gold" />
                <span>Filters</span>
              </span>
              <button
                onClick={() => {
                  setKeyword("");
                  setLocation("");
                  setIsRemote(false);
                  setSelectedJobTypes([]);
                  setSelectedExperience([]);
                  setSelectedCategory("");
                }}
                className="text-[10px] font-bold text-text-muted hover:text-rose-500 uppercase tracking-wider transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Filter Group: Category */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Category</h4>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary-navy"
              >
                <option value="">All Categories</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="AI & Data">AI & Data</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Filter Group: Job Type */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Job Type</h4>
              <div className="flex flex-col gap-2">
                {["Full Time", "Part Time", "Contract", "Internship"].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 text-xs font-semibold text-text-secondary select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedJobTypes.includes(type)}
                      onChange={() => handleJobTypeToggle(type)}
                      className="rounded border-slate-300 text-primary-navy focus:ring-primary-navy h-4 w-4"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Experience */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Experience Required</h4>
              <div className="flex flex-col gap-2">
                {["Fresh / Intern", "1-3 Yrs", "3-5 Yrs", "2-4 Yrs", "5+ Yrs"].map((exp) => (
                  <label key={exp} className="flex items-center gap-2.5 text-xs font-semibold text-text-secondary select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedExperience.includes(exp)}
                      onChange={() => handleExperienceToggle(exp)}
                      className="rounded border-slate-300 text-primary-navy focus:ring-primary-navy h-4 w-4"
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* AI Assistant Banner */}
            <div className="rounded-xl bg-gradient-to-br from-primary-navy to-primary-navy-light p-4 text-white flex flex-col gap-2">
              <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-gold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse-slow" />
                <span>AI Job Matching</span>
              </h5>
              <p className="text-[9px] text-slate-300 leading-snug">
                Click a job card to view custom AI compatibility ratings based on your profile skills!
              </p>
            </div>
          </div>

          {/* Right Column: Search Results */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
            
            {/* List of Jobs */}
            <div className={cn("flex flex-col gap-4 w-full col-span-12", activeJob ? "lg:col-span-5" : "lg:col-span-12")}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Showing {filteredJobs.length} Jobs
                </p>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="bg-white border border-border-color rounded-2xl p-12 text-center flex flex-col items-center gap-4">
                  <span className="text-3xl">🔍</span>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-primary-navy">No Jobs Found</h4>
                    <p className="text-xs text-text-muted">Try adjusting your filters or keyword query.</p>
                  </div>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isActive = activeJob?.id === job.id;
                  const applied = hasApplied(job.id);
                  const isSaved = savedJobIds.includes(job.id);
                  
                  return (
                    <div
                      key={job.id}
                      onClick={() => setActiveJob(job)}
                      className={cn(
                        "bg-white border rounded-xl p-5 hover:shadow-md transition-all cursor-pointer relative overflow-hidden group flex flex-col gap-3",
                        isActive ? "border-primary-navy ring-1 ring-primary-navy" : "border-border-color"
                      )}
                    >
                      <div className="flex gap-3.5 items-start">
                        <div className="h-10 w-10 rounded-lg bg-ice-blue border border-ice-blue-dark text-primary-navy font-black text-xs flex items-center justify-center flex-shrink-0">
                          {job.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-primary-navy truncate group-hover:text-primary-navy-light transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-[10px] text-text-secondary font-semibold mt-0.5 truncate">
                            {job.companyName}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[9px] font-bold text-text-muted uppercase tracking-wider">
                        <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{job.location}</span>
                        <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{job.jobType}</span>
                        <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{job.experienceRequired}</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-1.5">
                        <span className="text-xs font-black text-primary-navy">{job.salaryRange}</span>
                        
                        {/* Dynamic actions */}
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className="p-1.5 rounded-lg border border-border-color text-text-muted hover:text-primary-navy transition-colors bg-white"
                          >
                            <Bookmark className={cn("h-4 w-4", isSaved && "fill-gold text-gold border-gold")} />
                          </button>
                          {applied ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 border border-emerald-100">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Applied</span>
                            </span>
                          ) : (
                            <Button
                              variant="primary"
                              size="sm"
                              className="py-1 px-3 text-[10px] uppercase font-bold tracking-wider"
                              onClick={() => handleApplyClick(job)}
                            >
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* AI recommendations highlight */}
                      {user && job.matchScore && (
                        <div className="absolute top-0 right-0 bg-primary-navy/5 px-2 py-1 text-[8px] font-black text-primary-navy rounded-bl-lg border-l border-b border-primary-navy/10 flex items-center gap-0.5">
                          <Sparkles className="h-2.5 w-2.5 text-gold" />
                          <span>{job.matchScore}% Match</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Selected Job Detail Panel */}
            {activeJob && (
              <div className="col-span-12 lg:col-span-7 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6 sticky top-28 max-h-[80vh] overflow-y-auto">
                <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
                  <div className="h-12 w-12 rounded-xl bg-ice-blue border border-border-color flex items-center justify-center text-primary-navy font-black text-base flex-shrink-0 shadow-sm">
                    {activeJob.logo}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-black text-primary-navy leading-tight">{activeJob.title}</h3>
                    <p className="text-xs text-text-secondary mt-0.5 font-bold">{activeJob.companyName}</p>
                    <div className="flex flex-wrap gap-2.5 text-[9px] font-bold text-text-muted uppercase tracking-wider mt-2.5">
                      <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{activeJob.location}</span>
                      <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{activeJob.jobType}</span>
                      <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">⏱️ {activeJob.experienceRequired}</span>
                    </div>
                  </div>
                </div>

                {/* AI Employability / Suitability Insight */}
                {user && (
                  <div className="rounded-xl bg-gradient-to-r from-ice-blue to-ice-blue-light border border-ice-blue-dark/50 p-4.5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary-navy text-white flex items-center justify-center font-bold text-xs">
                        {activeJob.matchScore}%
                      </div>
                      <div>
                        <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-primary-navy">AI Fit Compatibility</h5>
                        <p className="text-[9px] text-text-secondary mt-0.5 leading-tight font-semibold">
                          {activeJob.matchScore && activeJob.matchScore > 90
                            ? "Excellent match! Your skills are a perfect fit."
                            : "Good match! Consider adding missing skills to resume."}
                        </p>
                      </div>
                    </div>
                    <Sparkles className="h-5 w-5 text-gold animate-pulse-slow" />
                  </div>
                )}

                {/* Job Description */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Job Description</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                    {activeJob.description}
                  </p>
                </div>

                {/* Requirements */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Requirements</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Skills Required */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Key Skills Required</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeJob.requirements.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-ice-blue text-[10px] font-bold text-primary-navy border border-ice-blue-dark/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                {activeJob.benefits && activeJob.benefits.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Perks & Benefits</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeJob.benefits.map((ben, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Company Information */}
                <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-navy">Company Information</h4>
                  <div className="flex flex-col gap-2 text-xs font-semibold text-text-secondary bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center font-black text-xs text-primary-navy border border-border-color shadow-sm">
                        {activeJob.logo}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-primary-navy">{activeJob.companyName}</h4>
                        <p className="text-[9px] text-text-muted mt-0.5">{activeJob.industry}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-text-secondary leading-relaxed mt-1 font-medium">
                      {activeJob.companyName} is a premier business specializing in {activeJob.industry}. They foster a highly collaborative workspace focused on career acceleration.
                    </p>
                  </div>
                </div>

                {/* Sticky Apply Callout */}
                <div className="mt-4 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider leading-none">Salary Budget</span>
                    <span className="text-sm font-black text-primary-navy mt-1 leading-none">{activeJob.salaryRange}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveJob(activeJob.id)}
                      className="p-2.5 rounded-xl border border-border-color text-text-muted hover:text-primary-navy transition-all bg-white hover:bg-slate-50"
                    >
                      <Bookmark className={cn("h-4.5 w-4.5", savedJobIds.includes(activeJob.id) && "fill-gold text-gold border-gold")} />
                    </button>
                    {hasApplied(activeJob.id) ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 border border-emerald-100">
                        <CheckCircle className="h-4.5 w-4.5" />
                        <span>Application Submitted</span>
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        size="md"
                        className="px-6 py-2.5 font-bold uppercase tracking-wider text-xs"
                        onClick={() => handleApplyClick(activeJob)}
                      >
                        Apply for Job
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />

      {/* Apply Modal */}
      <Dialog
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for ${applyingJob?.title}`}
        size="md"
      >
        <div className="flex flex-col gap-4 text-left">
          <div className="p-4 bg-ice-blue border border-border-color rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-primary-navy leading-tight">{applyingJob?.companyName}</h4>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5 block">{applyingJob?.location}</span>
            </div>
            {applyingJob?.matchScore && (
              <span className="px-2 py-1 rounded bg-white text-[9px] font-extrabold text-primary-navy border border-ice-blue-dark">
                AI Match Score: {applyingJob.matchScore}%
              </span>
            )}
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
              className="font-bold uppercase tracking-wider text-xs"
              onClick={handleApplySubmit}
            >
              Submit Application
            </Button>
          </div>
        </div>
      </Dialog>

    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <svg className="animate-spin h-8 w-8 text-primary-navy" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    }>
      <JobsPageContent />
    </Suspense>
  );
}
