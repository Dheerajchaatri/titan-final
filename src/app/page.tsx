"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { useAiChatStore } from "@/store/useAiChatStore";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Accordion } from "@/components/ui/Accordion";
import { toast } from "@/components/ui/Toast";
import { BinocularCharacter } from "@/components/ui/BinocularCharacter";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Building,
  Upload,
  Calendar,
  Monitor,
  Palette,
  Cpu,
  Megaphone,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const { jobs } = useJobStore();
  const { user, isAuthenticated } = useUserStore();

  // Mouse Parallax coordinates tracker
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / (window.innerWidth || 1)) * 2 - 1;
    const y = (clientY / (window.innerHeight || 1)) * 2 - 1;
    setMousePos({ x, y });
  };

  // Search local states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("Min - Max");
  const [experience, setExperience] = useState("Any experience");
  const [jobType, setJobType] = useState("All types");
  const [isRemote, setIsRemote] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to jobs page with query params
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (location) params.append("location", location);
    if (salary !== "Min - Max") params.append("salary", salary);
    if (experience !== "Any experience") params.append("experience", experience);
    if (isRemote) params.append("isRemote", "true");
    router.push(`/jobs?${params.toString()}`);
  };

  const handleUploadCV = () => {
    if (isAuthenticated) {
      router.push("/candidate/resume-analyzer");
    } else {
      toast.info("Please log in to upload and analyze your CV.");
      router.push("/auth/login");
    }
  };

  const handleTalkToAi = () => {
    if (isAuthenticated && user) {
      if (user.role === "employer") {
        router.push("/employer/dashboard");
      } else {
        useAiChatStore.getState().sendMessage("Hello AI, help me recommend jobs", user.id, user.role, user.name);
        router.push("/candidate/career-assistant");
      }
    } else {
      toast.info("Please log in to talk to the AI Assistant.");
      router.push("/auth/login");
    }
  };

  const categories = [
    { label: "IT & Software", count: "12,540 Jobs", Icon: Monitor },
    { label: "Graphic Design", count: "4,320 Jobs", Icon: Palette },
    { label: "AI & Data", count: "2,810 Jobs", Icon: Cpu },
    { label: "Marketing", count: "6,720 Jobs", Icon: Megaphone }
  ];

  const featuredJobs = jobs.filter(j => j.isFeatured).slice(0, 5);

  const topCompanies = [
    { name: "Systems Limited", industry: "Technology, IT Services", count: 120, logo: "SL", color: "from-blue-600 to-indigo-700" },
    { name: "NetSol Technologies", industry: "Software Development", count: 95, logo: "NS", color: "from-sky-500 to-blue-600" },
    { name: "10Pearls", industry: "IT Services & Consulting", count: 65, logo: "10P", color: "from-slate-800 to-slate-950" },
    { name: "Daraz", industry: "E-commerce", count: 50, logo: "DZ", color: "from-orange-500 to-red-600" },
    { name: "Meezan Bank", industry: "Banking & Finance", count: 45, logo: "MB", color: "from-emerald-600 to-teal-700" }
  ];

  const testimonials = [
    {
      text: "TITAN helped me find the perfect job in just 2 weeks. The AI matching score let me know exactly which applications to focus on!",
      author: "Ahmad Raza",
      role: "Software Engineer",
      avatar: "AR",
      rating: 5
    },
    {
      text: "The best job portal in Pakistan. Clean interface, relevant job listings, and the AI Career assistant drafted a highly customized cover letter that got me hired.",
      author: "Fatima Khan",
      role: "UI/UX Designer",
      avatar: "FK",
      rating: 5
    },
    {
      text: "Got multiple interview calls within days of uploading my resume. The resume keywords analyzer matches ATS filters exactly.",
      author: "Usman Ali",
      role: "Product Manager",
      avatar: "UA",
      rating: 5
    }
  ];

  const faqs = [
    {
      id: "faq-1",
      title: "How does AI matching work?",
      content: "TITAN AI processes the technical skills, certificates, and work experiences listed on your profile and cross-analyzes them against the specific recruiter requirements using semantic parsing, producing a real-time match percentage rating."
    },
    {
      id: "faq-2",
      title: "Is it free to use TITAN?",
      content: "Yes, job searches, profile listings, and dashboard application tracking are completely free for all candidates. We offer low-cost premium packages for advanced AI mock-interviews and CV polishing."
    },
    {
      id: "faq-3",
      title: "How can I post a job?",
      content: "Simply switch your role to Employer, go to the Post Job page, fill in the requirements, and publish. The system will immediately notify matching candidates."
    },
    {
      id: "faq-4",
      title: "Can I apply for jobs without an account?",
      content: "You need to log in or create an account. This allows the recruiter to review your CV and allows our engine to compute your match compatibility score."
    },
    {
      id: "faq-5",
      title: "How do I upload my CV?",
      content: "Head to your dashboard under Resume Analysis, upload your PDF resume, and our AI parser will analyze and suggest optimization scores instantly."
    },
    {
      id: "faq-6",
      title: "How does remote work filter work?",
      content: "Our smart search bar contains a Remote toggle. Switched on, the system displays only jobs flagged for full-time work-from-home."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Main Hero Container */}
      <main className="flex-grow">
        
        {/* Redesigned Hero Section */}
        <section className="relative px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 bg-white overflow-hidden">
          {/* Ambient subtle background shapes */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-slate-50/80 blur-[120px] -z-10" />
            <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-[100px] -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 -z-10" />
          </div>

          <div className="mx-auto max-w-4xl flex flex-col items-center text-center relative z-20">
            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-navy tracking-tight leading-[1.15] max-w-3xl">
              Find Jobs in Pakistan
            </h1>

            {/* Short Supporting Statement */}
            <p className="mt-4 text-sm sm:text-base font-medium text-text-secondary max-w-xl leading-relaxed">
              Explore thousands of verified job opportunities from leading companies and remote teams across Pakistan.
            </p>

            {/* Search Container & Animated Character */}
            <div className="w-full mt-10 relative">

              {/* Animated Job-Seeker Character emerging from behind search bar */}
              <div className="relative -mb-6 sm:-mb-8 z-10 flex justify-center pointer-events-none">
                <BinocularCharacter />
              </div>

              {/* Search Interface */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl p-4 sm:p-5 relative z-20 backdrop-blur-sm">
                <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-3">
                  
                  {/* Keyword Input */}
                  <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus-within:bg-white focus-within:border-primary-navy/40 focus-within:ring-2 focus-within:ring-primary-navy/10 transition-all">
                    <Search className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Job title, keyword, or company"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-text-primary placeholder:text-text-muted focus:outline-none"
                    />
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-8 bg-slate-200" />

                  {/* Location Selector */}
                  <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus-within:bg-white focus-within:border-primary-navy/40 focus-within:ring-2 focus-within:ring-primary-navy/10 transition-all">
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="City, province, or Remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-text-primary placeholder:text-text-muted focus:outline-none"
                    />
                  </div>

                  {/* Search Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full md:w-auto px-8 py-3.5 bg-primary-navy hover:bg-primary-navy-light text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search Jobs</span>
                  </Button>
                </form>
              </div>

              {/* Relevant Popular Search Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs font-semibold text-text-muted">
                <span className="font-bold text-primary-navy mr-1">Popular:</span>
                {[
                  "Web Developer",
                  "UI/UX Designer",
                  "Remote",
                  "Karachi",
                  "Lahore",
                  "Islamabad"
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      if (["Karachi", "Lahore", "Islamabad", "Remote"].includes(chip)) {
                        setLocation(chip);
                      } else {
                        setKeyword(chip);
                      }
                      const params = new URLSearchParams();
                      if (["Karachi", "Lahore", "Islamabad", "Remote"].includes(chip)) {
                        params.append("location", chip);
                        if (keyword) params.append("keyword", keyword);
                      } else {
                        params.append("keyword", chip);
                        if (location) params.append("location", location);
                      }
                      router.push(`/jobs?${params.toString()}`);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-blue-50/70 hover:border-blue-300 text-text-secondary hover:text-primary-navy transition-all cursor-pointer shadow-2xs font-semibold"
                  >
                    {chip}
                  </button>
                ))}
              </div>

            </div>



          </div>
        </section>

        {/* Popular Categories */}
        <section className="mx-auto max-w-7xl px-6 py-20 flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy">Popular Categories</h2>
            <p className="text-xs text-text-muted font-medium">Browse opportunities categorized by technical sectors</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto w-full">
            {categories.map((cat) => {
              const CategoryIcon = cat.Icon;
              return (
                <Link key={cat.label} href={`/jobs?category=${encodeURIComponent(cat.label)}`} className="group">
                  <div className="bg-white border border-border-color rounded-xl p-5 text-center flex flex-col items-center gap-3 group-hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-primary-navy group-hover:bg-primary-navy group-hover:text-white transition-all duration-200 shadow-2xs">
                      <CategoryIcon className="h-5.5 w-5.5 stroke-[1.75]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-extrabold text-primary-navy group-hover:text-primary-navy-light transition-colors line-clamp-1">{cat.label}</span>
                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{cat.count}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Jobs & Top Companies Grid */}
        <section className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Featured Jobs List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5">
              <h2 className="text-xl font-extrabold text-primary-navy tracking-tight">Featured Jobs</h2>
              <Link href="/jobs" className="text-xs font-bold text-blue-600 hover:text-primary-navy transition-colors flex items-center gap-1 group">
                <span>View All Jobs</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-col gap-3.5">
              {featuredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 hover:shadow-2xs transition-all duration-200 relative group cursor-pointer"
                >
                  <div className="flex gap-4 items-start">
                    <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-primary-navy font-extrabold text-sm flex-shrink-0 shadow-2xs">
                      {job.logo}
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm font-bold text-primary-navy group-hover:text-blue-600 transition-colors truncate min-w-0">
                          {job.title}
                        </h4>
                        <span className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg flex-shrink-0 whitespace-nowrap">
                          {job.salaryRange}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary font-medium">{job.companyName}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mt-2">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-slate-400" /> {job.jobType}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-slate-400" /> {job.experienceRequired}</span>
                      </div>
                    </div>
                  </div>
                  {job.isNew && (
                    <span className="absolute top-4 right-4 px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-bold text-blue-700 border border-blue-100/80">
                      New
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <Link href="/jobs" className="self-center mt-2">
              <Button variant="outline" size="sm" className="font-bold uppercase tracking-wider text-xs border-slate-200 text-primary-navy hover:bg-slate-50 rounded-xl">
                View All Jobs
              </Button>
            </Link>
          </div>

          {/* Top Companies List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5">
              <h2 className="text-xl font-extrabold text-primary-navy tracking-tight">Top Companies</h2>
              <Link href="/companies" className="text-xs font-bold text-blue-600 hover:text-primary-navy transition-colors flex items-center gap-1 group">
                <span>View All Companies</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-col gap-3.5">
              {topCompanies.map((comp) => (
                <div key={comp.name} className="bg-white border border-slate-200/80 rounded-xl p-4.5 flex items-center justify-between hover:border-slate-300 hover:shadow-2xs transition-all duration-200">
                  <div className="flex gap-4 items-center min-w-0">
                    <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200/80 text-primary-navy font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-2xs">
                      {comp.logo}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-primary-navy truncate">{comp.name}</h4>
                      <p className="text-[11px] text-text-muted mt-0.5 font-medium truncate">{comp.industry}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <span className="text-xs font-bold text-primary-navy bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg inline-block">{comp.count} Jobs</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/companies" className="self-center mt-2">
              <Button variant="outline" size="sm" className="font-bold uppercase tracking-wider text-xs border-slate-200 text-primary-navy hover:bg-slate-50 rounded-xl">
                View All Companies
              </Button>
            </Link>
          </div>

        </section>

        {/* Platform Stats Section */}
        <section className="bg-white border-y border-border-color py-12">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-black text-primary-navy">95,944+</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Active Jobs</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-black text-primary-navy">8,500+</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Companies Hiring</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-black text-primary-navy">2.4M+</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Job Seekers</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-black text-primary-navy">98%</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">AI Match Accuracy</span>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-6 py-20 flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy">What Job Seekers Say</h2>
            <p className="text-xs text-text-muted font-semibold">Success stories from candidates who found their calling</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, idx) => (
              <div key={idx} className="bg-white border border-border-color p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed italic font-medium">"{testi.text}"</p>
                </div>
                <div className="flex items-center gap-3 mt-6 border-t border-slate-50 pt-4">
                  <div className="h-9 w-9 rounded-full bg-ice-blue border border-ice-blue-dark text-primary-navy font-black text-xs flex items-center justify-center shadow-inner">
                    {testi.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-primary-navy leading-none">{testi.author}</h5>
                    <span className="text-[10px] text-text-muted mt-1 leading-none block font-semibold">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="mx-auto max-w-4xl px-6 py-10 flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy">Frequently Asked Questions</h2>
            <p className="text-xs text-text-muted font-semibold">Answers to commonly asked questions about the platform</p>
          </div>

          <Accordion items={faqs} />
        </section>

      </main>

      <Footer />
    </div>
  );
}
