"use client";

import React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, FileText } from "lucide-react";

export interface CandidateCvData {
  id?: string;
  name: string;
  title: string;
  email?: string;
  phone?: string;
  location?: string;
  aboutMe?: string;
  skills?: { name: string; rating?: number }[];
  experience?: {
    role: string;
    company: string;
    location: string;
    period: string;
    description: string[];
  }[];
  education?: {
    degree: string;
    school: string;
    period: string;
    grade?: string;
  }[];
  certificates?: { name: string; issuer: string; year: string }[];
  projects?: { name: string; description: string; tech: string[] }[];
}

interface CvViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateCvData | null;
}

export const getCandidateCvProfile = (candidateName: string, jobTitle?: string): CandidateCvData => {
  const cleanName = candidateName || "Candidate";

  if (cleanName.includes("Ahmad") || cleanName.includes("Raza")) {
    return {
      name: "Ahmad Raza",
      title: "Senior Frontend Developer",
      email: "ahmad.raza@email.com",
      phone: "+92 301 1234567",
      location: "Lahore, Punjab, Pakistan",
      aboutMe: "Motivated Senior Frontend Developer with 4+ years of experience building responsive, highly optimized web applications using React.js, Next.js, TypeScript, and modern CSS architectures. Passionate about system design, web performance optimization, and scalable UI state management.",
      skills: [
        { name: "React.js" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Zustand" },
        { name: "REST & GraphQL" },
        { name: "Git & GitHub" },
        { name: "Jest & Cypress" }
      ],
      experience: [
        {
          role: "Senior Frontend Developer",
          company: "Systems Limited",
          location: "Lahore, Pakistan",
          period: "2024 – Present",
          description: [
            "Architected responsive enterprise web portals using React 19, Next.js 15, and TypeScript.",
            "Optimized core web vitals and initial paint metrics by 40% using code splitting and dynamic imports.",
            "Mentored a team of 5 junior engineers and established frontend code review standards."
          ]
        },
        {
          role: "Frontend Engineer",
          company: "10Pearls",
          location: "Karachi, Pakistan",
          period: "2022 – 2024",
          description: [
            "Constructed interactive dashboard tools, analytics graphs, and reusable UI component libraries.",
            "Integrated complex web forms with server validation and seamless error feedback handling."
          ]
        }
      ],
      education: [
        {
          degree: "BS Computer Science",
          school: "FAST NUCES",
          period: "2018 – 2022",
          grade: "3.6 GPA"
        }
      ],
      certificates: [
        { name: "Meta Frontend Developer Professional Certificate", issuer: "Coursera / Meta", year: "2024" },
        { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", year: "2023" }
      ],
      projects: [
        {
          name: "TITAN AI Job Matching Engine",
          description: "Full-stack job portal featuring real-time AI skill scoring, automated ATS resume analysis, and dynamic recruiter analytics.",
          tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"]
        }
      ]
    };
  }

  if (cleanName.includes("Fatima") || cleanName.includes("Shah")) {
    return {
      name: "Fatima Shah",
      title: jobTitle || "UI/UX Product Designer",
      email: "fatima.shah@email.com",
      phone: "+92 321 9876543",
      location: "Karachi, Sindh, Pakistan",
      aboutMe: "Creative UI/UX Product Designer with 3+ years of experience leading user research, creating high-fidelity Figma prototypes, and crafting intuitive design systems for high-growth tech platforms.",
      skills: [
        { name: "Figma" },
        { name: "UI/UX Design" },
        { name: "User Research" },
        { name: "Wireframing" },
        { name: "Design Systems" },
        { name: "Prototyping" },
        { name: "Adobe XD" }
      ],
      experience: [
        {
          role: "Lead UI/UX Designer",
          company: "10Pearls",
          location: "Karachi, Pakistan",
          period: "2023 – Present",
          description: [
            "Designed end-to-end user journeys and responsive design components for SaaS products.",
            "Conducted usability testing sessions with over 50 users to optimize onboarding conversion."
          ]
        }
      ],
      education: [
        {
          degree: "BS Visual Communication Design",
          school: "National College of Arts (NCA)",
          period: "2019 – 2023"
        }
      ],
      certificates: [
        { name: "Google UX Design Professional Certificate", issuer: "Coursera / Google", year: "2023" }
      ]
    };
  }

  if (cleanName.includes("Bilal") || cleanName.includes("Hassan")) {
    return {
      name: "Bilal Hassan",
      title: jobTitle || "Product Designer",
      email: "bilal.hassan@email.com",
      phone: "+92 333 4445566",
      location: "Islamabad, ICT, Pakistan",
      aboutMe: "Senior Product Designer with 4+ years of experience architecting design systems, high-fidelity prototypes, and design tokens for multi-platform SaaS applications. Passionate about user-centered design, micro-interactions, and visual clarity.",
      skills: [
        { name: "Product Design" },
        { name: "Figma Design Systems" },
        { name: "UI Architecture" },
        { name: "Prototyping" },
        { name: "Design Tokens" },
        { name: "Micro-interactions" },
        { name: "User Research" }
      ],
      experience: [
        {
          role: "Senior Product Designer",
          company: "10Pearls",
          location: "Islamabad, Pakistan",
          period: "2023 – Present",
          description: [
            "Architected complete enterprise design system used by over 30 engineers across 4 core product teams.",
            "Led product redesign initiatives that increased user task completion speed by 28%."
          ]
        },
        {
          role: "UI/UX Designer",
          company: "NetSol Technologies",
          location: "Lahore, Pakistan",
          period: "2021 – 2023",
          description: [
            "Created responsive web layouts, interactive dashboards, and design assets for financial applications."
          ]
        }
      ],
      education: [
        {
          degree: "BS Graphic & Media Design",
          school: "NUST Islamabad",
          period: "2017 – 2021"
        }
      ],
      certificates: [
        { name: "Certified Design System Specialist", issuer: "UX Design Institute", year: "2023" }
      ]
    };
  }

  // Default fallback candidate structure
  return {
    name: cleanName,
    title: jobTitle || "Software Engineer",
    email: `${cleanName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    phone: "+92 300 5551234",
    location: "Lahore, Pakistan",
    aboutMe: `Dedicated ${jobTitle || "professional"} with proven track record in software engineering, project delivery, and cross-functional collaboration. Highly skilled in analytical problem solving and modern web practices.`,
    skills: [
      { name: "Software Development" },
      { name: "Problem Solving" },
      { name: "TypeScript" },
      { name: "System Architecture" },
      { name: "Git & Version Control" }
    ],
    experience: [
      {
        role: jobTitle || "Software Developer",
        company: "Tech Systems",
        location: "Pakistan",
        period: "2023 – Present",
        description: [
          "Developed core platform features, maintained codebase quality, and participated in agile sprints.",
          "Collaborated with cross-functional teams to deploy scalable client solutions."
        ]
      }
    ],
    education: [
      {
        degree: "BS Computer Science",
        school: "University of Engineering & Technology",
        period: "2019 – 2023"
      }
    ]
  };
};

export const CvViewerModal: React.FC<CvViewerModalProps> = ({
  isOpen,
  onClose,
  candidate
}) => {
  if (!candidate) return null;

  const cvData = getCandidateCvProfile(candidate.name, candidate.title);

  const handleDownloadPdf = () => {
    toast.success(`Downloading ${cvData.name}_Resume.pdf...`);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="xl" title={`Curriculum Vitae — ${cvData.name}`}>
      <div className="flex flex-col gap-6 py-1">
        
        {/* Top Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-primary-navy">
            <FileText className="h-4 w-4 text-primary-navy" />
            <span>Verified Candidate Document Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="py-1.5 px-3 text-[10px] uppercase font-bold border-slate-200 text-text-secondary hover:bg-slate-100"
              onClick={onClose}
            >
              Close Preview
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="py-1.5 px-3 text-[10px] uppercase font-extrabold flex items-center gap-1.5"
              onClick={handleDownloadPdf}
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download CV PDF</span>
            </Button>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-8 shadow-sm flex flex-col gap-6 font-montserrat text-primary-navy max-w-3xl mx-auto w-full">
          
          {/* Resume Header Block */}
          <div className="border-b border-slate-200 pb-5 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-primary-navy leading-none">
                  {cvData.name}
                </h1>
                <p className="text-xs font-extrabold uppercase tracking-wider text-text-secondary mt-1.5">
                  {cvData.title}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-primary-navy/10 text-primary-navy text-[9px] font-black uppercase tracking-wider border border-primary-navy/20">
                Verified Candidate
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-text-muted mt-2">
              {cvData.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-primary-navy" />
                  {cvData.email}
                </span>
              )}
              {cvData.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-primary-navy" />
                  {cvData.phone}
                </span>
              )}
              {cvData.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary-navy" />
                  {cvData.location}
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {cvData.aboutMe && (
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <span>Professional Summary</span>
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                {cvData.aboutMe}
              </p>
            </div>
          )}

          {/* Core Skills */}
          {cvData.skills && cvData.skills.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5 text-primary-navy" />
                <span>Skills & Competencies</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-primary-navy"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {cvData.experience && cvData.experience.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-primary-navy" />
                <span>Work Experience</span>
              </h3>

              <div className="flex flex-col gap-4">
                {cvData.experience.map((exp, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-primary-navy">
                        {exp.role} — <span className="font-extrabold">{exp.company}</span>
                      </h4>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-text-muted">{exp.location}</p>
                    <ul className="list-disc pl-4 text-xs font-medium text-text-secondary space-y-1 mt-1">
                      {exp.description.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education && cvData.education.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-primary-navy" />
                <span>Education</span>
              </h3>

              <div className="flex flex-col gap-2">
                {cvData.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline text-xs">
                    <div>
                      <span className="font-bold text-primary-navy">{edu.degree}</span>
                      <span className="text-text-muted font-semibold"> — {edu.school}</span>
                    </div>
                    <span className="text-[10px] font-bold text-text-muted">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {cvData.certificates && cvData.certificates.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-primary-navy" />
                <span>Certifications & Verified Badges</span>
              </h3>

              <div className="flex flex-col gap-2">
                {cvData.certificates.map((cert, idx) => (
                  <div key={idx} className="flex justify-between items-baseline text-xs font-semibold text-text-secondary">
                    <span>{cert.name} ({cert.issuer})</span>
                    <span className="text-[10px] font-bold text-text-muted">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </Dialog>
  );
};
