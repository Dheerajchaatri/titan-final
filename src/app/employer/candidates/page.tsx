"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Star,
  Download,
  Calendar,
  Sparkles,
  FileText,
  CheckCircle,
  Eye,
  X,
  UserCheck
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  availability: "Available" | "1 Month Notice" | "Not Available";
  matchScore: number;
  email: string;
  phone: string;
  resumeUrl: string;
  saved: boolean;
  shortlisted: boolean;
}

export default function CandidateDirectory() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "c-1",
      name: "Ahmad Raza",
      title: "Senior Frontend Developer",
      location: "Lahore, Punjab",
      experience: "3-5 Yrs",
      education: "BS Computer Science",
      skills: ["React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
      availability: "Available",
      matchScore: 96,
      email: "ahmad.raza@email.com",
      phone: "+92 301 1234567",
      resumeUrl: "/resumes/ahmad_raza.pdf",
      saved: true,
      shortlisted: false
    },
    {
      id: "c-2",
      name: "Fatima Shah",
      title: "UI/UX Product Designer",
      location: "Karachi, Sindh",
      experience: "2-4 Yrs",
      education: "BFA Communication Design",
      skills: ["Figma", "Adobe XD", "Wireframing", "UI Design"],
      availability: "Available",
      matchScore: 92,
      email: "fatima.shah@email.com",
      phone: "+92 321 7654321",
      resumeUrl: "/resumes/fatima_shah.pdf",
      saved: false,
      shortlisted: true
    },
    {
      id: "c-3",
      name: "Zainab Ali",
      title: "Data Scientist & ML Architect",
      location: "Islamabad",
      experience: "3-5 Yrs",
      education: "MS Data Science",
      skills: ["Python", "TensorFlow", "Pandas", "Machine Learning"],
      availability: "1 Month Notice",
      matchScore: 89,
      email: "zainab.ali@email.com",
      phone: "+92 333 4567890",
      resumeUrl: "/resumes/zainab_ali.pdf",
      saved: false,
      shortlisted: false
    },
    {
      id: "c-4",
      name: "Bilal Khan",
      title: "Backend Node.js Engineer",
      location: "Lahore, Punjab",
      experience: "1-3 Yrs",
      education: "BS Computer Engineering",
      skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
      availability: "Available",
      matchScore: 85,
      email: "bilal.khan@email.com",
      phone: "+92 345 9876543",
      resumeUrl: "/resumes/bilal_khan.pdf",
      saved: false,
      shortlisted: false
    },
    {
      id: "c-5",
      name: "Ayesha Malik",
      title: "DevOps Engineer",
      location: "Remote",
      experience: "5+ Yrs",
      education: "BS Software Engineering",
      skills: ["AWS", "Kubernetes", "CI/CD", "Terraform"],
      availability: "1 Month Notice",
      matchScore: 94,
      email: "ayesha.malik@email.com",
      phone: "+92 312 3456789",
      resumeUrl: "/resumes/ayesha_malik.pdf",
      saved: true,
      shortlisted: false
    }
  ]);

  // Filters
  const [search, setSearch] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [availFilter, setAvailFilter] = useState("");

  // Preview Modal
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(null);

  // Schedule Interview Dialog
  const [scheduleCandidate, setScheduleCandidate] = useState<Candidate | null>(null);
  const [interviewDate, setInterviewDate] = useState("2026-05-25");
  const [interviewTime, setInterviewTime] = useState("10:00");

  const toggleSave = (id: string) => {
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, saved: !c.saved } : c
    ));
    const cand = candidates.find(c => c.id === id);
    if (cand) {
      toast.success(cand.saved ? "Removed candidate from saved list." : "Candidate saved successfully!");
    }
  };

  const toggleShortlist = (id: string) => {
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, shortlisted: !c.shortlisted } : c
    ));
    const cand = candidates.find(c => c.id === id);
    if (cand) {
      toast.success(cand.shortlisted ? "Candidate removed from shortlist." : "Candidate shortlisted successfully!");
    }
  };

  const handleDownloadResume = (name: string) => {
    toast.success(`Downloading ${name}'s resume document...`);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scheduleCandidate) {
      toast.success(`Interview scheduled with ${scheduleCandidate.name} on ${interviewDate} at ${interviewTime}!`);
      setScheduleCandidate(null);
    }
  };

  // Filter logic
  const filteredCandidates = candidates.filter(cand => {
    if (search && !cand.name.toLowerCase().includes(search.toLowerCase()) && !cand.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (locFilter && !cand.location.toLowerCase().includes(locFilter.toLowerCase())) return false;
    if (expFilter && cand.experience !== expFilter) return false;
    if (availFilter && cand.availability !== availFilter) return false;
    if (skillsFilter) {
      const match = cand.skills.some(s => s.toLowerCase().includes(skillsFilter.toLowerCase()));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      
      {/* Title */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start uppercase tracking-wider">
          <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
          <span>Talent Directory</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2.5">Candidate Search Directory</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Explore candidates profiles, check technical skill tags, and shortlist profiles for interview schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* Left Column: Directory Filters */}
        <div className="lg:col-span-3 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-gold" />
              <span>Filter Talent</span>
            </span>
            <button
              onClick={() => {
                setSearch("");
                setLocFilter("");
                setSkillsFilter("");
                setExpFilter("");
                setAvailFilter("");
              }}
              className="text-[10px] font-bold text-text-muted hover:text-rose-500 uppercase tracking-wider"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Keywords / Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Ahmad or Frontend"
            />

            <Input
              label="Location"
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
              placeholder="e.g. Lahore or Remote"
            />

            <Input
              label="Skills"
              value={skillsFilter}
              onChange={(e) => setSkillsFilter(e.target.value)}
              placeholder="e.g. React or Python"
            />

            {/* Experience Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">Experience Required</label>
              <select
                value={expFilter}
                onChange={(e) => setExpFilter(e.target.value)}
                className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-text-secondary focus:outline-none"
              >
                <option value="">Any Experience</option>
                <option value="Fresh / Intern">Fresh / Intern</option>
                <option value="1-3 Yrs">1-3 Yrs</option>
                <option value="2-4 Yrs">2-4 Yrs</option>
                <option value="3-5 Yrs">3-5 Yrs</option>
                <option value="5+ Yrs">5+ Yrs</option>
              </select>
            </div>

            {/* Availability Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">Availability</label>
              <select
                value={availFilter}
                onChange={(e) => setAvailFilter(e.target.value)}
                className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-text-secondary focus:outline-none"
              >
                <option value="">Any Availability</option>
                <option value="Available">Available</option>
                <option value="1 Month Notice">1 Month Notice</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Candidate Lists */}
        <div className="lg:col-span-9 flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Showing {filteredCandidates.length} Matching Profiles</span>
          </div>

          <div className="flex flex-col gap-4">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((cand) => (
                <div key={cand.id} className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-slate-300 transition-colors">
                  <div className="flex gap-4 items-start text-left min-w-0">
                    <div className="h-12 w-12 rounded-full bg-ice-blue border border-border-color text-primary-navy font-black text-sm flex items-center justify-center flex-shrink-0">
                      {cand.name.split(" ").map(n => n[0]).join("")}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-primary-navy truncate">{cand.name}</h3>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary-navy/5 to-indigo-600/10 text-[9px] font-black text-indigo-600 border border-indigo-100">
                          <Sparkles className="h-3 w-3 text-gold" />
                          <span>AI Match: {cand.matchScore}%</span>
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold text-primary-navy mt-1">{cand.title}</p>
                      
                      {/* Meta lists row */}
                      <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[10px] font-bold text-text-muted uppercase tracking-wider mt-2">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {cand.location}</span>
                        <span>•</span>
                        <span>Exp: {cand.experience}</span>
                        <span>•</span>
                        <span>Edu: {cand.education}</span>
                      </div>

                      {/* Skills Tags list */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cand.skills.map((skill) => (
                          <span key={skill} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[9px] font-black text-text-secondary uppercase">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="flex flex-wrap sm:flex-col items-end gap-2 justify-end sm:justify-start">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSave(cand.id)}
                        className={cn(
                          "p-2 rounded-lg border border-slate-200 transition-colors",
                          cand.saved ? "bg-amber-50 text-amber-500 border-amber-200" : "bg-white text-text-muted hover:text-primary-navy"
                        )}
                        title="Save Candidate"
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                      <button
                        onClick={() => setPreviewCandidate(cand)}
                        className="p-2 rounded-lg border border-slate-200 bg-white text-text-muted hover:text-primary-navy transition-colors"
                        title="Preview Resume"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadResume(cand.name)}
                        className="p-2 rounded-lg border border-slate-200 bg-white text-text-muted hover:text-primary-navy transition-colors"
                        title="Download Resume"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex gap-2 w-full mt-1.5">
                      <Button
                        variant={cand.shortlisted ? "secondary" : "outline"}
                        size="sm"
                        className={cn(
                          "flex-1 py-1.5 px-3 text-[9px] font-bold uppercase",
                          cand.shortlisted ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100" : "text-text-secondary border-slate-200 hover:bg-slate-50"
                        )}
                        onClick={() => toggleShortlist(cand.id)}
                      >
                        {cand.shortlisted ? "Shortlisted" : "Shortlist"}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 py-1.5 px-3 text-[9px] font-bold uppercase flex items-center justify-center gap-1"
                        onClick={() => setScheduleCandidate(cand)}
                      >
                        <Calendar className="h-3 w-3" />
                        <span>Schedule</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-border-color rounded-2xl p-12 text-center text-text-muted text-xs">
                No candidates found matching the filters.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* RESUME PREVIEW MODAL */}
      {previewCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white border border-border-color rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-black uppercase tracking-wider text-primary-navy">Resume Preview - {previewCandidate.name}</h3>
              </div>
              <button onClick={() => setPreviewCandidate(null)} className="text-text-muted hover:text-rose-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-xs font-semibold text-text-secondary leading-relaxed">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-primary-navy leading-none">{previewCandidate.name}</h2>
                <h4 className="text-xs text-indigo-600 mt-1 uppercase tracking-widest">{previewCandidate.title}</h4>
                <p className="text-[10px] text-text-muted mt-2 uppercase font-bold tracking-wider">{previewCandidate.email} • {previewCandidate.phone} • {previewCandidate.location}</p>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="font-black text-primary-navy uppercase tracking-widest text-[10px]">Academic Education</h5>
                <p className="font-semibold text-text-secondary">{previewCandidate.education}</p>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="font-black text-primary-navy uppercase tracking-widest text-[10px]">Work Experience</h5>
                <p className="font-semibold text-text-secondary">{previewCandidate.experience} required experience scope met.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h5 className="font-black text-primary-navy uppercase tracking-widest text-[10px]">Skills Inventory</h5>
                <div className="flex flex-wrap gap-1.5">
                  {previewCandidate.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/50 text-[9px] font-bold text-primary-navy uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="font-black text-primary-navy uppercase tracking-widest text-[10px]">System Suitability Metrics</h5>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-gold" />
                    <span className="font-bold text-primary-navy">AI Compatibility Assessment Score</span>
                  </div>
                  <span className="font-black text-indigo-600 text-sm">{previewCandidate.matchScore}/100</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <Button variant="outline" size="sm" className="py-2 px-4 uppercase text-[10px] font-bold" onClick={() => setPreviewCandidate(null)}>
                Close Preview
              </Button>
              <Button variant="primary" size="sm" className="py-2 px-4 uppercase text-[10px] font-bold flex items-center gap-1" onClick={() => handleDownloadResume(previewCandidate.name)}>
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW DIALOG */}
      {scheduleCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white border border-border-color rounded-2xl max-w-md w-full shadow-2xl text-left overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span>Set Recruitment Interview</span>
              </h3>
              <button onClick={() => setScheduleCandidate(null)} className="text-text-muted hover:text-rose-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="p-6 flex flex-col gap-4">
              <p className="text-xs font-semibold text-text-secondary leading-relaxed">
                Confirm availability slots and send custom video meet invite keys to **{scheduleCandidate.name}**.
              </p>

              <Input
                type="date"
                label="Interview Date *"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                required
              />

              <Input
                type="time"
                label="Interview Start Time *"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                required
              />

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                <Button variant="outline" size="sm" className="py-2 px-4 uppercase text-[10px] font-bold" type="button" onClick={() => setScheduleCandidate(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" className="py-2 px-4 uppercase text-[10px] font-bold" type="submit">
                  Send Schedule Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
