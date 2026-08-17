"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "@/components/ui/Toast";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Link as LinkIcon,
  Code,
  Globe,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  Sparkles,
  Download,
  ExternalLink,
  MessageSquare,
  Award,
  BookOpen,
  Settings,
  CircleHelp,
  CheckCircle,
  Plus
} from "lucide-react";

import { AiCareerAssistantView } from "@/components/candidate/AiCareerAssistantView";
import { useSearchParams } from "next/navigation";

export default function CandidateProfilePage() {
  const { user, updateCandidateProfile } = useUserStore();
  const profile = user?.candidateProfile;
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  if (!profile) return null;

  const handleDownloadResume = () => {
    toast.success("Downloading Ahmad_Raza_Resume.pdf...");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    toast.success(`Message sent to Ahmad Raza: "${messageText.substring(0, 30)}..."`);
    setMessageText("");
    setContactModalOpen(false);
  };

  const tabsOptions = [
    { id: "overview", label: "Overview" },
    { id: "ai-assistant", label: "AI Career Assistant" },
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Portfolio" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Top Banner Profile Header */}
      <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden">
        
        {/* Cover Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-navy via-gold to-primary-navy-light" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary-navy to-primary-navy-light text-white font-black text-2xl flex items-center justify-center shadow-md">
              AR
            </div>
            <div>
              <h1 className="text-lg font-black text-primary-navy flex items-center gap-1.5 leading-none">
                <span>{profile.name}</span>
                <span className="h-4 w-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold" title="Verified Professional">✓</span>
              </h1>
              <p className="text-xs text-text-secondary font-bold mt-1.5">{profile.title}</p>
              
              <div className="flex items-center gap-3.5 text-[10px] font-bold text-text-muted uppercase tracking-wider mt-2.5">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {profile.location}</span>
                <div className="flex items-center gap-1.5 text-text-muted">
                  <a href="#" className="hover:text-primary-navy"><LinkIcon className="h-3.5 w-3.5" /></a>
                  <a href="#" className="hover:text-primary-navy"><Code className="h-3.5 w-3.5" /></a>
                  <a href="#" className="hover:text-primary-navy"><Globe className="h-3.5 w-3.5" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="primary" size="sm" className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 flex-1 md:flex-none justify-center" onClick={() => setContactModalOpen(true)}>
              <MessageSquare className="h-4 w-4" />
              <span>Contact Candidate</span>
            </Button>
            <Button variant="outline" size="sm" className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 border-primary-navy/15 text-primary-navy hover:bg-ice-blue flex-1 md:flex-none justify-center" onClick={handleDownloadResume}>
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 border-t border-slate-100 pt-5 mt-2">
          
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Experience</span>
            <span className="text-xs font-black text-primary-navy mt-0.5">{profile.experienceYears} Years</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Availability</span>
            <span className="text-xs font-black text-emerald-600 mt-0.5">{profile.availability}</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Preferred Salary</span>
            <span className="text-xs font-black text-primary-navy mt-0.5">{profile.preferredSalary}</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Preferred Cities</span>
            <span className="text-xs font-black text-primary-navy mt-0.5">{profile.preferredCities.join(", ")}</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Job Type</span>
            <span className="text-xs font-black text-primary-navy mt-0.5">{profile.jobType}</span>
          </div>

        </div>

      </div>

      {/* Main Body Content splits layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tabs and Profile Contents */}
        <div className="lg:col-span-8 flex flex-col gap-6 bg-white border border-border-color rounded-2xl p-6 shadow-sm">
          
          {/* Main Navigation Tabs */}
          <Tabs
            options={tabsOptions}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
            variant="underline"
            className="mb-4"
          />

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-8">
              
              {/* About Me */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">About Me</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                  {profile.aboutMe}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs font-semibold text-text-secondary">
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[10px] font-extrabold text-primary-navy uppercase tracking-wider w-24">Age</span>
                    <span className="text-primary-navy font-black">{profile.age} Years</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[10px] font-extrabold text-primary-navy uppercase tracking-wider w-24">Education</span>
                    <span className="text-primary-navy font-black">{profile.educationBg}</span>
                  </div>
                </div>
              </div>

              {/* Work Experience Timeline */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Work Experience</h3>
                  <button className="text-[10px] font-bold text-primary-navy hover:underline flex items-center gap-0.5">
                    View All
                  </button>
                </div>
                <div className="flex flex-col gap-5">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="flex gap-4 items-start relative pl-1 group">
                      <div className="h-8 w-8 rounded-lg bg-ice-blue border border-ice-blue-dark text-primary-navy flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        {exp.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-primary-navy">{exp.role}</h4>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{exp.period}</span>
                        </div>
                        <p className="text-[10px] text-text-secondary font-bold">{exp.company} • {exp.location}</p>
                        <ul className="list-disc list-inside text-[10px] text-text-secondary leading-relaxed mt-2.5 space-y-1 pl-1">
                          {exp.description.map((desc, idx) => (
                            <li key={idx} className="font-semibold">{desc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Timeline */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Education</h3>
                  <button className="text-[10px] font-bold text-primary-navy hover:underline flex items-center gap-0.5">
                    View All
                  </button>
                </div>
                <div className="flex flex-col gap-5">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="flex gap-4 items-start relative pl-1">
                      <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center text-xs flex-shrink-0">
                        🎓
                      </div>
                      <div className="flex-grow flex flex-col gap-0.5">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-primary-navy">{edu.degree}</h4>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{edu.period}</span>
                        </div>
                        <p className="text-[10px] text-text-secondary font-bold">{edu.school}</p>
                        <span className="text-[10px] text-emerald-600 font-extrabold mt-1.5">{edu.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab: AI Assistant */}
          {activeTab === "ai-assistant" && (
            <div className="w-full">
              <AiCareerAssistantView />
            </div>
          )}

          {/* Other tabs fallback - keeping it neat */}
          {activeTab !== "overview" && activeTab !== "ai-assistant" && (
            <div className="flex flex-col gap-6 w-full text-left">
              <div className="border-b border-slate-100 pb-3 flex flex-col gap-0.5">
                <h4 className="text-xs font-bold text-primary-navy capitalize">{activeTab} Details</h4>
                <p className="text-[10px] text-text-muted">Ahmad Raza's verified credentials and records.</p>
              </div>
              
              {/* Show structured fields dynamically */}
              {activeTab === "skills" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
                  {profile.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex justify-between text-xs font-bold text-primary-navy">
                        <span>{skill.name}</span>
                        <span>{skill.rating}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-navy rounded-full" style={{ width: `${skill.rating}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "projects" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
                  {profile.projects.map((proj) => (
                    <div key={proj.id} className="p-5 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-3 justify-between">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-xs font-bold text-primary-navy">{proj.name}</h4>
                        <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">{proj.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {proj.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white text-[8px] font-bold text-text-secondary border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "certificates" && (
                <div className="flex flex-col gap-3.5 w-full mt-2">
                  {profile.certificates.map((cert) => (
                    <div key={cert.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                      <div className="flex gap-3 items-start min-w-0">
                        <Award className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-primary-navy truncate">{cert.name}</h4>
                          <span className="text-[10px] text-text-muted font-semibold mt-0.5 block truncate">{cert.issuer}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider self-end sm:self-auto">{cert.year}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: AI Score and Resume */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* AI Employability Score */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">AI Employability Score</h3>
              <Sparkles className="h-4.5 w-4.5 text-gold animate-pulse-slow" />
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              {/* Radial Score Gauge */}
              <div className="relative h-28 w-28 flex items-center justify-center">
                <svg className="h-full w-full rotate-270" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="48" className="stroke-slate-100 fill-none" strokeWidth="8" />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-emerald-500 fill-none"
                    strokeWidth="8"
                    strokeDasharray="301"
                    strokeDashoffset={301 - (301 * profile.aiEmployabilityScore) / 100}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-primary-navy leading-none">{profile.aiEmployabilityScore}%</span>
                  <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Excellent</span>
                </div>
              </div>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1">
                You are in the top 8% of candidates
              </p>
            </div>

            {/* Score Breakdown lists */}
            <div className="flex flex-col gap-3 border-t border-slate-50 pt-4 text-xs font-bold text-text-secondary mt-1">
              <div className="flex justify-between items-center">
                <span className="text-text-muted font-semibold">Skills Match</span>
                <span className="text-primary-navy">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted font-semibold">Experience Score</span>
                <span className="text-primary-navy">90%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted font-semibold">Education Level</span>
                <span className="text-primary-navy">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted font-semibold">Certifications</span>
                <span className="text-primary-navy">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted font-semibold">Profile Strength</span>
                <span className="text-primary-navy">93%</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Checklist */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
              Profile Checklist
            </h3>
            <div className="flex flex-col gap-3 text-xs font-bold text-text-secondary">
              {[
                "Personal Information",
                "Work Experience Added",
                "Education Bg Added",
                "Technical Skills Verified",
                "Projects Added",
                "Certificates verified",
                "Resume Uploaded"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Card download */}
          <div className="bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
              Active CV File
            </h3>
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-xl">📄</span>
              <div>
                <h5 className="text-[10px] font-extrabold text-primary-navy leading-tight">Ahmad_Raza_Resume.pdf</h5>
                <span className="text-[8px] text-text-muted uppercase tracking-widest mt-0.5 block">Updated 2 days ago</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full py-2.5 font-bold uppercase tracking-wider text-[10px] border-primary-navy/15 text-primary-navy hover:bg-ice-blue">
              Update Resume File
            </Button>
          </div>

        </div>

      </div>

      {/* Message Recruiter Dialog */}
      <Dialog
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title="Contact Ahmad Raza"
        size="md"
      >
        <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3.5 bg-ice-blue border border-border-color rounded-xl mb-2">
            <div className="h-8 w-8 rounded-lg bg-primary-navy text-white flex items-center justify-center font-bold text-xs">
              AR
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary-navy">{profile.name}</h4>
              <p className="text-[10px] text-text-muted mt-0.5 leading-none">{profile.title}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Your Message
            </label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
              placeholder="Type your message..."
              required
              className="w-full p-4 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs"
              onClick={() => setContactModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs"
            >
              Send Message
            </Button>
          </div>
        </form>
      </Dialog>

    </div>
  );
}
