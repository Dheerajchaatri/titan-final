"use client";

import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import {
  Sparkles,
  FileText,
  Download,
  Save,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Eye,
  CheckCircle,
  Copy
} from "lucide-react";
import { cn } from "@/utils/cn";

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location: string;
  dates: string;
  details: string;
}

interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  dates: string;
  cgpa?: string;
}

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tech: string;
  url?: string;
}

interface CertificationItem {
  id: string;
  name: string;
  org: string;
  date: string;
}

export default function ResumeBuilderPage() {
  const { user } = useUserStore();

  // Selected Template layout state
  const [template, setTemplate] = useState<"Modern" | "Professional" | "Executive" | "Minimal" | "Creative" | "Corporate">("Modern");

  // Form Section States
  const [fullName, setFullName] = useState(user?.name || "Ahmad Raza");
  const [profTitle, setProfTitle] = useState(user?.candidateProfile?.title || "Senior Software Engineer");
  const [email, setEmail] = useState(user?.email || "ahmad.raza@example.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [location, setLocation] = useState("Lahore, Punjab");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/ahmadraza");
  const [portfolio, setPortfolio] = useState("ahmadraza.dev");
  const [summary, setSummary] = useState("Results-driven Software Engineer with extensive expertise in React, Next.js, and TypeScript. Experienced in architecting robust front-end web platforms and leading collaborative development sprints to optimize system scalability and performance.");

  // Lists
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "exp-1",
      company: "Systems Limited",
      title: "Senior Frontend Developer",
      location: "Lahore, Pakistan",
      dates: "2024 - Present",
      details: "Engineered responsive SaaS portals using React 19 and Next.js 16. Optimized web page load speeds by 40% using asynchronous bundling."
    },
    {
      id: "exp-2",
      company: "10Pearls",
      title: "Frontend Developer",
      location: "Karachi, Pakistan",
      dates: "2022 - 2024",
      details: "Constructed interface layout components, handled state routing maps using Redux, and built dashboard analytics tools."
    }
  ]);

  const [education, setEducation] = useState<EducationItem[]>([
    {
      id: "edu-1",
      degree: "BS Computer Science",
      school: "FAST NUCES",
      location: "Lahore, Pakistan",
      dates: "2018 - 2022",
      cgpa: "3.62/4.00"
    }
  ]);

  const [skills, setSkills] = useState<string[]>(["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Zustand", "Node.js", "SQL", "Git & GitHub"]);
  const [newSkill, setNewSkill] = useState("");

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "proj-1",
      name: "TITAN Enterprise Platform",
      description: "Recruitment tracking system built using Next.js 16 and Zustand state engine.",
      tech: "Next.js, TypeScript, Tailwind, Zustand",
      url: "https://titan.portal"
    }
  ]);

  const [certifications, setCertifications] = useState<CertificationItem[]>([
    {
      id: "cert-1",
      name: "AWS Certified Developer - Associate",
      org: "Amazon Web Services",
      date: "2025"
    }
  ]);

  const [achievements, setAchievements] = useState<string[]>([
    "1st Place Winner at FAST National Speed Programming Competition (2021)",
    "Published research paper on AI-driven parsing heuristics at PakTech Journal (2023)"
  ]);
  const [newAchievement, setNewAchievement] = useState("");

  // ATS and AI States
  const [atsScore, setAtsScore] = useState(92);
  const [savingStatus, setSavingStatus] = useState("Saved locally");
  const [activeTab, setActiveTab] = useState<"info" | "summary" | "exp" | "edu" | "skills" | "projects" | "certs" | "achieve">("info");

  // Auto save simulator
  useEffect(() => {
    setSavingStatus("Saving changes...");
    const timer = setTimeout(() => {
      setSavingStatus("Draft saved locally");
    }, 800);
    return () => clearTimeout(timer);
  }, [fullName, profTitle, email, phone, location, linkedin, portfolio, summary, experiences, education, skills, projects, certifications, achievements]);

  // AI helper functions
  const handleAiSummary = () => {
    const aiSummaries = [
      "Dynamic Software Engineer with over 4 years of hands-on experience designing and building client-facing web applications. Proficient in modern UI architectures, React, TypeScript, and state storage loops. Driven to improve application loading times and implement semantic SEO features.",
      "Expert Frontend Developer specializing in React.js and Next.js platforms. Strong analytical mindset and design thinking skills. Passionate about writing clean modular code, optimizing web application bundles, and deploying micro-frontends.",
      "Innovative developer with solid background in software architecture and state systems. Skilled in translating product requirements into high-performance web systems using TypeScript, Next.js, and CSS tools."
    ];
    const picked = aiSummaries[Math.floor(Math.random() * aiSummaries.length)];
    setSummary(picked);
    setAtsScore(prev => Math.min(prev + 2, 98));
    toast.success("AI Summary generated!");
  };

  const handleSuggestSkills = () => {
    const potentialSkills = ["Docker", "Kubernetes", "GraphQL", "Redux Toolkit", "PostgreSQL", "System Design", "Agile Sprints"];
    const missing = potentialSkills.filter(s => !skills.includes(s));
    if (missing.length > 0) {
      const suggest = missing[0];
      setSkills(prev => [...prev, suggest]);
      setAtsScore(prev => Math.min(prev + 3, 98));
      toast.success(`Suggested skill added: ${suggest}`);
    } else {
      toast.info("All recommended skills are already in your resume.");
    }
  };

  const handleOptimizeAts = () => {
    toast.success("ATS keyword optimization complete!");
    setAtsScore(98);
  };

  const handleRewriteBullets = () => {
    if (experiences.length > 0) {
      setExperiences(prev => prev.map((exp, idx) => {
        if (idx === 0) {
          return {
            ...exp,
            details: "Architected high-scale portal infrastructure using React 19. Reduced bundle payload sizes by 40% and improved search ranking signals."
          };
        }
        return exp;
      }));
      setAtsScore(prev => Math.min(prev + 1, 99));
      toast.success("Rewrote experience details using action verbs!");
    }
  };

  // Add lists handlers
  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Math.random().toString(36).substring(7)}`,
      company: "New Company",
      title: "Software Engineer",
      location: "Location",
      dates: "Dates",
      details: "Describe your job responsibilities and achievements..."
    };
    setExperiences(prev => [...prev, newItem]);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(x => x.id !== id));
  };

  const handleExperienceChange = (id: string, field: keyof ExperienceItem, value: string) => {
    setExperiences(prev => prev.map(x => x.id === id ? { ...x, [field]: value } : x));
  };

  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Math.random().toString(36).substring(7)}`,
      degree: "Degree Name",
      school: "University / School",
      location: "Location",
      dates: "Dates"
    };
    setEducation(prev => [...prev, newItem]);
  };

  const handleDeleteEducation = (id: string) => {
    setEducation(prev => prev.filter(x => x.id !== id));
  };

  const handleEducationChange = (id: string, field: keyof EducationItem, value: string) => {
    setEducation(prev => prev.map(x => x.id === id ? { ...x, [field]: value } : x));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill("");
      setAtsScore(prev => Math.min(prev + 1, 98));
    }
  };

  const handleDeleteSkill = (name: string) => {
    setSkills(prev => prev.filter(s => s !== name));
  };

  const handleAddProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Math.random().toString(36).substring(7)}`,
      name: "New Project",
      description: "Project description...",
      tech: "Technologies used"
    };
    setProjects(prev => [...prev, newItem]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleProjectChange = (id: string, field: keyof ProjectItem, value: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddCert = () => {
    const newItem: CertificationItem = {
      id: `cert-${Math.random().toString(36).substring(7)}`,
      name: "Certification Title",
      org: "Organization",
      date: "Year"
    };
    setCertifications(prev => [...prev, newItem]);
  };

  const handleDeleteCert = (id: string) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
  };

  const handleCertChange = (id: string, field: keyof CertificationItem, value: string) => {
    setCertifications(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements(prev => [...prev, newAchievement.trim()]);
      setNewAchievement("");
    }
  };

  const handleDeleteAchievement = (idx: number) => {
    setAchievements(prev => prev.filter((_, i) => i !== idx));
  };

  // Mock download
  const handleDownloadDoc = (type: string) => {
    toast.success(`Preparing your ${template} resume layout. Downloading ${type} file...`);
  };

  return (
    <div className="flex flex-col gap-6 text-left max-w-7xl mx-auto w-full">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 uppercase tracking-wider">
            <BrainCircuit className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
            <span>AI Resume Studio</span>
          </span>
          <h1 className="text-2xl font-black text-primary-navy mt-2">AI Resume Builder</h1>
          <p className="text-xs font-semibold text-text-muted mt-1">
            Create a professional ATS-optimized resume with AI assistance.
          </p>
        </div>

        {/* Save indicator & templates */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{savingStatus}</span>
          </div>
        </div>
      </div>

      {/* Workspace columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Resume Editor Form */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          
          {/* AI Assistance Toolbar Panel */}
          <div className="bg-gradient-to-br from-primary-navy to-primary-navy-light rounded-2xl p-5 text-white flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-gold flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-gold" />
              <span>AI Writing Tools</span>
            </h3>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="py-1.5 px-3 bg-white/10 hover:bg-white/20 border-none text-[10px] font-bold uppercase tracking-wider text-white"
                onClick={handleAiSummary}
              >
                Generate Summary
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="py-1.5 px-3 bg-white/10 hover:bg-white/20 border-none text-[10px] font-bold uppercase tracking-wider text-white"
                onClick={handleRewriteBullets}
              >
                Rewrite Action Bullets
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="py-1.5 px-3 bg-white/10 hover:bg-white/20 border-none text-[10px] font-bold uppercase tracking-wider text-white"
                onClick={handleSuggestSkills}
              >
                Suggest Skills
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="py-1.5 px-3 bg-white/10 hover:bg-white/20 border-none text-[10px] font-bold uppercase tracking-wider text-white"
                onClick={handleOptimizeAts}
              >
                ATS Optimize
              </Button>
            </div>
          </div>

          {/* Form Tabs Navs */}
          <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
            {[
              { id: "info", label: "Profile" },
              { id: "summary", label: "Summary" },
              { id: "exp", label: "Experience" },
              { id: "edu", label: "Education" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "certs", label: "Certs" },
              { id: "achieve", label: "Awards" },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors",
                  activeTab === tab.id
                    ? "bg-white text-primary-navy shadow border border-slate-200"
                    : "text-text-secondary hover:text-primary-navy"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm min-h-[350px]">
            
            {/* Info Tab */}
            {activeTab === "info" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <Input
                    label="Professional Title"
                    value={profTitle}
                    onChange={(e) => setProfTitle(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Input
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Input
                    label="LinkedIn Profile"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                  <Input
                    label="Portfolio Website"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">Profile Image Mock</label>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-xs text-text-muted select-none">
                        AR
                      </div>
                      <span className="text-[9px] font-semibold text-text-muted">ahmad_raza_photo.jpg (Uploaded)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === "summary" && (
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy flex justify-between items-center mb-2">
                  <span>Professional Summary</span>
                  <button
                    type="button"
                    onClick={handleAiSummary}
                    className="text-[9px] font-bold text-indigo-600 uppercase flex items-center gap-0.5"
                  >
                    <Sparkles className="h-3 w-3 text-gold" />
                    <span>Auto-Write</span>
                  </button>
                </h3>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full min-h-[150px] p-3 text-xs font-semibold text-text-secondary bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-navy"
                  placeholder="Summarize your professional achievements and tech expertise..."
                />
              </div>
            )}

            {/* Work Experience Tab */}
            {activeTab === "exp" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Work Experience</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="py-1 px-2.5 text-[9px] font-bold uppercase flex items-center gap-1"
                    onClick={handleAddExperience}
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </Button>
                </div>

                <div className="flex flex-col gap-4 divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-1">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="pt-4 first:pt-0 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Company Details</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="text-text-muted hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Company Name"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                        />
                        <Input
                          label="Job Title"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(exp.id, "title", e.target.value)}
                        />
                        <Input
                          label="Dates Active"
                          value={exp.dates}
                          onChange={(e) => handleExperienceChange(exp.id, "dates", e.target.value)}
                        />
                        <Input
                          label="Location"
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-text-secondary uppercase">Responsibilities & Outputs</label>
                        <textarea
                          value={exp.details}
                          onChange={(e) => handleExperienceChange(exp.id, "details", e.target.value)}
                          className="w-full min-h-[80px] p-2.5 text-xs font-semibold text-text-secondary bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-navy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === "edu" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Academic Education</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="py-1 px-2.5 text-[9px] font-bold uppercase flex items-center gap-1"
                    onClick={handleAddEducation}
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </Button>
                </div>

                <div className="flex flex-col gap-4 divide-y divide-slate-100">
                  {education.map((edu) => (
                    <div key={edu.id} className="pt-4 first:pt-0 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Institute Details</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEducation(edu.id)}
                          className="text-text-muted hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Degree / Major"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                        />
                        <Input
                          label="School / University"
                          value={edu.school}
                          onChange={(e) => handleEducationChange(edu.id, "school", e.target.value)}
                        />
                        <Input
                          label="Dates / Graduation"
                          value={edu.dates}
                          onChange={(e) => handleEducationChange(edu.id, "dates", e.target.value)}
                        />
                        <Input
                          label="CGPA (Optional)"
                          value={edu.cgpa}
                          onChange={(e) => handleEducationChange(edu.id, "cgpa", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Skills Inventory</h3>
                
                {/* Add new skill inputs */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      label="Add Technical or Soft Skill Tag"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g. Next.js, Docker, Negotiation"
                    />
                  </div>
                  <Button
                    variant="primary"
                    className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]"
                    onClick={handleAddSkill}
                  >
                    Add Tag
                  </Button>
                </div>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ice-blue border border-border-color text-xs font-bold text-primary-navy"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(skill)}
                        className="text-text-muted hover:text-rose-500 font-extrabold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <p className="text-[10px] text-text-secondary font-semibold max-w-[280px]">
                    Need keyword suggestions? Tap to scan common industry skills matching your role.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="py-1 px-3 text-[9px] font-bold uppercase"
                    onClick={handleSuggestSkills}
                  >
                    Scan Skills
                  </Button>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Product Projects</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="py-1 px-2.5 text-[9px] font-bold uppercase flex items-center gap-1"
                    onClick={handleAddProject}
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </Button>
                </div>

                <div className="flex flex-col gap-4 divide-y divide-slate-100">
                  {projects.map((proj) => (
                    <div key={proj.id} className="pt-4 first:pt-0 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Project Details</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id)}
                          className="text-text-muted hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Project Name"
                          value={proj.name}
                          onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
                        />
                        <Input
                          label="Project URL"
                          value={proj.url || ""}
                          onChange={(e) => handleProjectChange(proj.id, "url", e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Input
                          label="Technologies Used"
                          value={proj.tech}
                          onChange={(e) => handleProjectChange(proj.id, "tech", e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-text-secondary uppercase">Project Description</label>
                        <textarea
                          value={proj.description}
                          onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                          className="w-full min-h-[60px] p-2.5 text-xs font-semibold text-text-secondary bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-navy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === "certs" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Professional Certifications</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="py-1 px-2.5 text-[9px] font-bold uppercase flex items-center gap-1"
                    onClick={handleAddCert}
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </Button>
                </div>

                <div className="flex flex-col gap-4 divide-y divide-slate-100">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="pt-4 first:pt-0 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-text-muted uppercase">Credential Details</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCert(cert.id)}
                          className="text-text-muted hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <Input
                            label="Certification Name"
                            value={cert.name}
                            onChange={(e) => handleCertChange(cert.id, "name", e.target.value)}
                          />
                        </div>
                        <Input
                          label="Year Completed"
                          value={cert.date}
                          onChange={(e) => handleCertChange(cert.id, "date", e.target.value)}
                        />
                      </div>
                      <Input
                        label="Issuing Organization"
                        value={cert.org}
                        onChange={(e) => handleCertChange(cert.id, "org", e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achieve" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Awards & Competitions</h3>
                
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      label="Add Award, Competition or Publication description"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="e.g. Winner at Hackathon 2025"
                    />
                  </div>
                  <Button
                    variant="primary"
                    className="py-3 px-4 font-bold uppercase tracking-wider text-[10px]"
                    onClick={handleAddAchievement}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  {achievements.map((ach, idx) => (
                    <div key={idx} className="p-3 border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-text-secondary">{ach}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteAchievement(idx)}
                        className="text-text-muted hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: Live Resume Preview + ATS Score */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full lg:sticky lg:top-24">
          
          {/* ATS Compatibility Widget & Actions */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            
            {/* ATS Score Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 flex items-center justify-center font-black text-sm text-indigo-600 animate-spin-slow">
                  {atsScore}
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-primary-navy">ATS Compatibility Score</h4>
                  <p className="text-[9px] font-bold text-text-muted mt-0.5 uppercase tracking-wider">
                    {atsScore >= 90 ? "Excellent ATS Alignment" : "Needs Keyword optimization"}
                  </p>
                </div>
              </div>

              {/* Template selector switcher */}
              <div className="flex flex-col gap-1 items-end">
                <label className="text-[8px] font-black uppercase tracking-widest text-text-muted">Layout Template</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as any)}
                  className="p-1.5 border border-slate-200 bg-white rounded-lg text-[10px] font-bold text-text-secondary focus:outline-none cursor-pointer"
                >
                  <option value="Modern">Modern Layout</option>
                  <option value="Professional">Professional Layout</option>
                  <option value="Executive">Executive Layout</option>
                  <option value="Minimal">Minimal Layout</option>
                  <option value="Creative">Creative Layout</option>
                  <option value="Corporate">Corporate Layout</option>
                </select>
              </div>
            </div>

            {/* ATS Breakdown Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-slate-50">
              {[
                { label: "Formatting", val: "95%" },
                { label: "Keywords", val: atsScore >= 98 ? "98%" : "85%" },
                { label: "Experience", val: "92%" },
                { label: "Education", val: "90%" },
                { label: "Skills", val: "94%" },
              ].map(bar => (
                <div key={bar.label} className="flex flex-col gap-1">
                  <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">{bar.label}</span>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: bar.val }} />
                  </div>
                  <span className="text-[9px] font-bold text-primary-navy mt-0.5">{bar.val}</span>
                </div>
              ))}
            </div>

            {/* Download and Action Button layouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-50">
              <Button
                variant="primary"
                size="sm"
                className="py-2 text-[9px] uppercase font-bold flex items-center justify-center gap-1 shadow-sm"
                onClick={() => handleDownloadDoc("PDF")}
              >
                <Download className="h-3 w-3" />
                <span>Get PDF</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="py-2 text-[9px] uppercase font-bold flex items-center justify-center gap-1 border border-slate-200 hover:bg-slate-50 text-text-secondary"
                onClick={() => handleDownloadDoc("DOCX")}
              >
                <Download className="h-3 w-3" />
                <span>Get DOCX</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="py-2 text-[9px] uppercase font-bold flex items-center justify-center gap-1 border border-slate-200 hover:bg-slate-50 text-text-secondary"
                onClick={() => toast.success("Resume data synchronized with online profile!")}
              >
                <Save className="h-3 w-3" />
                <span>Save Data</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="py-2 text-[9px] uppercase font-bold flex items-center justify-center gap-1 border border-slate-200 hover:bg-slate-50 text-text-secondary"
                onClick={() => toast.success("Duplicate copy created in dashboard resume list.")}
              >
                <Copy className="h-3 w-3" />
                <span>Copy Copy</span>
              </Button>
            </div>

          </div>

          {/* DYNAMIC LIVE RESUME PREVIEW PANEL */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col gap-6">
            
            {/* Live Indicator tag */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-text-muted flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-indigo-600" />
                <span>Real-Time Output ({template})</span>
              </span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-widest">
                Active Preview
              </span>
            </div>

            {/* Template Conditional Rendering */}
            <div className={cn(
              "p-6 border border-slate-100 rounded-xl font-sans text-left min-h-[450px] flex flex-col gap-5",
              template === "Minimal" ? "bg-white font-mono text-slate-900 border-none" : "bg-slate-50/20",
              template === "Creative" ? "border-l-4 border-l-indigo-600" : "",
              template === "Executive" ? "border-t-4 border-t-gold" : "",
              template === "Corporate" ? "bg-white border border-slate-200" : ""
            )}>
              
              {/* Header Section */}
              <div className={cn(
                "flex flex-col gap-1 border-b pb-4",
                template === "Executive" ? "text-center items-center border-gold" : "border-slate-200"
              )}>
                <h2 className={cn(
                  "font-black tracking-tight",
                  template === "Minimal" ? "text-lg text-black font-normal" : "text-xl text-primary-navy"
                )}>
                  {fullName}
                </h2>
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{profTitle}</h3>
                
                {/* Meta data tags row */}
                <div className={cn(
                  "flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-bold text-text-muted uppercase tracking-wider mt-1.5",
                  template === "Executive" ? "justify-center" : ""
                )}>
                  <span>{email}</span>
                  <span>•</span>
                  <span>{phone}</span>
                  <span>•</span>
                  <span>{location}</span>
                </div>
                
                <div className={cn(
                  "flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-bold text-indigo-600 tracking-wider mt-1",
                  template === "Executive" ? "justify-center" : ""
                )}>
                  <span>{linkedin}</span>
                  <span>•</span>
                  <span>{portfolio}</span>
                </div>
              </div>

              {/* Summary Section */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Professional Summary</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
                  {summary || "Write a brief summary of your tech expertise..."}
                </p>
              </div>

              {/* Work Experience Section */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Professional Experience</h4>
                <div className="flex flex-col gap-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1 text-[10px]">
                      <div className="flex justify-between font-bold text-primary-navy">
                        <span>{exp.title} at {exp.company}</span>
                        <span className="text-text-muted">{exp.dates}</span>
                      </div>
                      <div className="flex justify-between text-[9px] text-text-muted font-bold uppercase tracking-wider">
                        <span>{exp.location}</span>
                      </div>
                      <p className="text-[9px] text-text-secondary font-semibold mt-0.5 leading-relaxed">
                        {exp.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Education</h4>
                <div className="flex flex-col gap-2.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex flex-col gap-0.5 text-[10px]">
                      <div className="flex justify-between font-bold text-primary-navy">
                        <span>{edu.degree} — {edu.school}</span>
                        <span className="text-text-muted">{edu.dates}</span>
                      </div>
                      <div className="flex justify-between text-[9px] text-text-muted font-bold uppercase">
                        <span>{edu.location}</span>
                        {edu.cgpa && <span className="text-indigo-600 font-extrabold">{edu.cgpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Technical Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-slate-100 text-primary-navy text-[9px] font-bold rounded uppercase border border-slate-200/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              {projects.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Selected Projects</h4>
                  <div className="flex flex-col gap-2">
                    {projects.map((proj) => (
                      <div key={proj.id} className="flex flex-col gap-0.5 text-[10px]">
                        <div className="flex justify-between font-bold text-primary-navy">
                          <span>{proj.name}</span>
                          {proj.url && <span className="text-[9px] text-indigo-600 font-bold">{proj.url}</span>}
                        </div>
                        <p className="text-[9px] text-text-secondary font-semibold leading-relaxed">
                          {proj.description}
                        </p>
                        <span className="text-[8px] text-text-muted font-bold uppercase mt-0.5">Tech: {proj.tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {certifications.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Certifications</h4>
                  <div className="flex flex-col gap-1 text-[9px] font-bold text-text-secondary">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between">
                        <span>{cert.name} — {cert.org}</span>
                        <span className="text-text-muted">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements Section */}
              {achievements.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Key Achievements</h4>
                  <ul className="list-disc pl-4 flex flex-col gap-1 text-[9px] font-semibold text-text-secondary leading-relaxed">
                    {achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
