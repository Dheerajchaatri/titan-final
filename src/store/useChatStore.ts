import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isAi: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  category: "application" | "message" | "alert" | "system";
  read: boolean;
  timestamp: string;
  link?: string;
}

interface ChatState {
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<AppNotification, "id" | "read" | "timestamp">) => void;
  generateAiCoverLetter: (jobTitle: string, companyName: string, candidateName: string, skills: string[]) => string;
  analyzeResume: (fileContent: string) => { isSupported?: boolean; unsupportedField?: string; score: number; atsScore: number; feedback: string[]; missingSkills: string[]; matches?: any[] };
}

const defaultNotifications: AppNotification[] = [
  {
    id: "n-1",
    title: "Application Shortlisted",
    description: "Congratulations! You have been shortlisted for Senior Frontend Developer at Systems Limited.",
    category: "application",
    read: false,
    timestamp: "2 hours ago",
    link: "/candidate/dashboard",
  },
  {
    id: "n-2",
    title: "Interview Scheduled",
    description: "Your interview with Systems Limited has been scheduled for May 25, 2026, at 10:00 AM.",
    category: "application",
    read: false,
    timestamp: "4 hours ago",
    link: "/candidate/dashboard",
  },
  {
    id: "n-3",
    title: "New Message Received",
    description: "Sarah Khan sent you a message: 'Great! I have scheduled the interview...'",
    category: "message",
    read: false,
    timestamp: "5 hours ago",
    link: "/candidate/messages",
  },
  {
    id: "n-4",
    title: "AI Profile Optimization Alert",
    description: "AI Insight: Adding 'Next.js' and 'TypeScript' as explicit tags could boost your match rate by 15%.",
    category: "alert",
    read: false,
    timestamp: "1 day ago",
    link: "/candidate/profile",
  },
  {
    id: "n-5",
    title: "New Job Match Recommendation",
    description: "NetSol Technologies posted: AI/ML Engineer (93% Match score with your profile).",
    category: "alert",
    read: false,
    timestamp: "2 days ago",
    link: "/jobs",
  },
  {
    id: "n-6",
    title: "Skill Assessment Completed",
    description: "You passed the React.js Skill Assessment (Top 5% score, Gold Badge earned).",
    category: "system",
    read: false,
    timestamp: "3 days ago",
    link: "/candidate/dashboard",
  },
  {
    id: "n-7",
    title: "Recruiter Visited Your Profile",
    description: "Recruiters from 10Pearls and Daraz viewed your profile today.",
    category: "system",
    read: false,
    timestamp: "4 days ago",
    link: "/candidate/dashboard",
  },
  {
    id: "n-8",
    title: "Resume Score Updated",
    description: "AI Resume Analyzer rated your uploaded resume 85/100 (Good compatibility).",
    category: "alert",
    read: false,
    timestamp: "5 days ago",
    link: "/candidate/resume-analyzer",
  },
];

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      notifications: defaultNotifications,

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      addNotification: (notif) => {
        const newNotif: AppNotification = {
          ...notif,
          id: `notif-${Date.now()}`,
          read: false,
          timestamp: "Just now",
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications],
        }));
      },

      generateAiCoverLetter: (jobTitle, companyName, candidateName, skills) => {
        return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. As a developer skilled in ${skills.slice(0, 4).join(", ")}, I believe my profile aligns perfectly with the requirements of this role.

During my career, I have successfully engineered responsive user interfaces, optimized web application performance, and collaborated in agile cross-functional environments. I am enthusiastic about the opportunity to bring my technical expertise to ${companyName} and contribute to your team's ongoing success.

Thank you for your time and consideration. I look forward to the possibility of discussing how my experience can benefit ${companyName}.

Sincerely,
${candidateName}`;
      },

      analyzeResume: (fileName) => {
        const lowerName = fileName.toLowerCase();
        const hash = fileName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

        // 1. Determine if it is in an unsupported field
        let unsupportedField = "";
        if (lowerName.includes("pharmacy") || lowerName.includes("pharma")) {
          unsupportedField = "Pharmacy";
        } else if (lowerName.includes("medicine") || lowerName.includes("doctor") || lowerName.includes("mbbs") || lowerName.includes("nursing") || lowerName.includes("nurse")) {
          unsupportedField = "Medicine";
        } else if (lowerName.includes("dentist") || lowerName.includes("dental") || lowerName.includes("dentistry")) {
          unsupportedField = "Dentist";
        } else if (lowerName.includes("veterinary") || lowerName.includes("vet")) {
          unsupportedField = "Veterinary";
        } else if (lowerName.includes("agriculture") || lowerName.includes("agri")) {
          unsupportedField = "Agriculture";
        } else if (lowerName.includes("hotel") || lowerName.includes("hospitality")) {
          unsupportedField = "Hotel Management";
        } else if (lowerName.includes("aviation") || lowerName.includes("pilot") || lowerName.includes("flight")) {
          unsupportedField = "Aviation";
        } else if (lowerName.includes("marine") || lowerName.includes("naval")) {
          unsupportedField = "Marine";
        } else if (lowerName.includes("fashion")) {
          unsupportedField = "Fashion Design";
        }

        if (unsupportedField) {
          return {
            isSupported: false,
            unsupportedField,
            score: 0,
            atsScore: 0,
            feedback: [],
            missingSkills: [],
            matches: []
          };
        }

        // 2. Fetch active jobs from useJobStore
        let activeJobs = [];
        try {
          const { useJobStore } = require("./useJobStore");
          activeJobs = useJobStore.getState().jobs || [];
        } catch (e) {
          // fallback
        }

        // 3. Determine Candidate Domain & Role
        let candidateDomain = "IT & Software";
        let candidateRole = "Frontend Developer";
        let candidateSkills = ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Git"];
        
        if (lowerName.includes("react") || lowerName.includes("frontend") || lowerName.includes("developer") || lowerName.includes("web")) {
          candidateDomain = "IT & Software";
          candidateRole = "Frontend Developer";
          candidateSkills = ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux Toolkit", "Figma", "Git"];
        } else if (lowerName.includes("graphic") || lowerName.includes("designer") || lowerName.includes("design") || lowerName.includes("ui") || lowerName.includes("ux")) {
          candidateDomain = "Graphic Design";
          candidateRole = "Graphic Designer";
          candidateSkills = ["Figma", "Adobe XD", "UI Design", "UX Research", "Wireframing", "Photoshop"];
        } else if (lowerName.includes("ai") || lowerName.includes("ml") || lowerName.includes("data") || lowerName.includes("python") || lowerName.includes("scientist") || lowerName.includes("science")) {
          candidateDomain = "AI & Data";
          candidateRole = "Data Scientist";
          candidateSkills = ["Python", "PyTorch", "TensorFlow", "Machine Learning", "SQL", "Pandas", "Statistics"];
        } else if (lowerName.includes("marketing") || lowerName.includes("seo") || lowerName.includes("digital")) {
          candidateDomain = "Marketing";
          candidateRole = "Marketing Executive";
          candidateSkills = ["Google Ads", "SEO Optimization", "Google Analytics", "Content Strategy", "Social Media"];
        } else if (lowerName.includes("finance") || lowerName.includes("audit") || lowerName.includes("tax") || lowerName.includes("analyst") || lowerName.includes("accounting")) {
          candidateDomain = "Finance";
          candidateRole = "Financial Analyst";
          candidateSkills = ["Accounting", "Corporate Finance", "Auditing", "Excel", "Tax Compliance", "SAP"];
        } else if (lowerName.includes("hr") || lowerName.includes("recruiter") || lowerName.includes("officer") || lowerName.includes("talent")) {
          candidateDomain = "HR & Recruitment";
          candidateRole = "HR Officer";
          candidateSkills = ["Talent Sourcing", "Technical Screening", "Communication", "ATS Systems", "HRIS"];
        } else if (lowerName.includes("engineer") || lowerName.includes("engineering") || lowerName.includes("mechanical") || lowerName.includes("electrical") || lowerName.includes("civil")) {
          candidateDomain = "Engineering";
          candidateRole = "Mechanical Engineer";
          candidateSkills = ["Electrical Engineering", "Civil Engineering", "AutoCAD", "Project Management", "MATLAB"];
        } else if (lowerName.includes("government") || lowerName.includes("gov") || lowerName.includes("board")) {
          candidateDomain = "Government";
          candidateRole = "Government Officer";
          candidateSkills = ["MS SQL Server", "Query optimization", "Database setups", "Cluster architectures"];
        } else {
          const options = [
            { domain: "IT & Software", role: "Frontend Developer", skills: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux Toolkit", "Figma", "Git"] },
            { domain: "AI & Data", role: "Data Scientist", skills: ["Python", "PyTorch", "TensorFlow", "Machine Learning", "SQL", "Pandas", "Statistics"] },
            { domain: "Graphic Design", role: "Graphic Designer", skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Wireframing", "Photoshop"] },
            { domain: "Marketing", role: "Marketing Executive", skills: ["Google Ads", "SEO Optimization", "Google Analytics", "Content Strategy", "Social Media"] }
          ];
          const choice = options[hash % options.length];
          candidateDomain = choice.domain;
          candidateRole = choice.role;
          candidateSkills = choice.skills;
        }

        // 4. Calculate Scores Dynamically based on hash
        const baseScore = 65 + (hash % 20); // 65-85
        const formattingQuality = 80 + (hash % 15); // 80-95
        const atsScore = Math.round((baseScore + formattingQuality) / 2); // 72-90
        
        // 5. Generate dynamically structured feedback (AI Recommendations)
        let feedback = [];
        if (candidateDomain === "IT & Software") {
          feedback = [
            "Improve ATS formatting to ensure optimal crawler indexing.",
            "Add measurable achievements to past role entries (e.g. 'Optimized app load speed by 25%').",
            "Include your GitHub Portfolio link prominently in the header section.",
            "Mention deployment experience (e.g., Vercel, AWS S3, CI/CD pipeline set up)."
          ];
        } else if (candidateDomain === "Marketing") {
          feedback = [
            "Add Campaign KPIs with numerical statistics (e.g., 'Lowered CAC by 18%').",
            "Mention Meta Ads experience explicitly in your core skills tags.",
            "Include your Google Analytics Certification to stand out in screening filters.",
            "Optimize keyword density matching SEO/SEM platforms."
          ];
        } else if (candidateDomain === "Finance") {
          feedback = [
            "Add Financial Software experience (e.g., QuickBooks, SAP, Excel advanced modeling).",
            "Mention audit exposure and balance sheet validation timeline stats.",
            "Include financial reporting experience aligning with local and IFRS protocols.",
            "Improve ATS structure of headers and date ranges formatting."
          ];
        } else {
          feedback = [
            `Strong profile alignment for roles matching ${candidateRole}.`,
            `High keyword frequency detected for: ${candidateSkills.slice(0, 3).join(", ")}.`,
            "Formatting analysis: Section structure is clear and complies with standard ATS headers.",
            "Consider listing professional certifications prominently in the profile header block."
          ];
        }

        // 6. Generate missing keywords dynamically
        let missingSkillsOverall = ["Next.js", "Docker", "GraphQL"];
        if (candidateDomain === "IT & Software") {
          missingSkillsOverall = ["Next.js", "Docker", "CI/CD", "GraphQL"];
        } else if (candidateDomain === "AI & Data") {
          missingSkillsOverall = ["MLOps", "KubeFlow", "BigQuery", "Model Deployment"];
        } else if (candidateDomain === "Graphic Design") {
          missingSkillsOverall = ["Prototyping", "Design Systems", "Figma Auto-Layout", "UX Audit"];
        } else if (candidateDomain === "Marketing") {
          missingSkillsOverall = ["Meta Ads", "Google Analytics", "SEO", "GA4"];
        } else if (candidateDomain === "Finance") {
          missingSkillsOverall = ["SAP", "QuickBooks", "IFRS", "Financial Reporting"];
        } else if (candidateDomain === "HR & Recruitment") {
          missingSkillsOverall = ["SuccessFactors", "Workday HR", "Sourcing Algorithms", "Talent Acquisition"];
        } else if (candidateDomain === "Engineering") {
          missingSkillsOverall = ["ETAP", "Primavera P6", "Structural Analytics", "CAD modeling"];
        } else if (candidateDomain === "Government") {
          missingSkillsOverall = ["GIS Mapping", "Public Procurement", "Database Security Audit", "GovTech Standards"];
        }

        // 7. Filter active jobs from the portal that belong ONLY to the detected category
        const matchingJobsInCategory = activeJobs.filter((job: any) => job.category === candidateDomain);

        // 8. Compare and generate matches
        const jobMatches = matchingJobsInCategory
          .map((job: any) => {
            const jobReqsLower = (job.requirements || []).map((r: string) => r.toLowerCase());
            const matchedSkills = candidateSkills.filter(s => jobReqsLower.includes(s.toLowerCase()));
            const missingSkills = (job.requirements || []).filter((r: string) => !candidateSkills.some(s => s.toLowerCase() === r.toLowerCase()));
            
            const skillMatchFactor = job.requirements && job.requirements.length > 0 
              ? matchedSkills.length / job.requirements.length 
              : 0.5;

            let roleRelevance = 0.5;
            if (job.title.toLowerCase().includes(candidateRole.toLowerCase()) || candidateRole.toLowerCase().includes(job.title.toLowerCase())) {
              roleRelevance = 0.95;
            }

            const rawMatchScore = Math.round((skillMatchFactor * 60) + (roleRelevance * 40));
            const finalMatchScore = Math.min(Math.max(rawMatchScore, 40), 98);

            const expFactor = (hash + job.title.length) % 3;
            const experienceMatch = expFactor === 0 ? "Excellent Match (3+ Years)" : expFactor === 1 ? "Good Match (2 Years)" : "Adequate Match (1 Year)";

            const qualFactor = (hash + job.companyName.length) % 2;
            const qualificationMatch = qualFactor === 0 ? "High Compatibility (Degree / Equivalent)" : "Medium Compatibility (Relevant Certification)";

            let atsComp = "Good";
            if (finalMatchScore > 85) atsComp = "Outstanding";
            else if (finalMatchScore > 75) atsComp = "Strong";
            else if (finalMatchScore > 60) atsComp = "Satisfactory";
            else atsComp = "Needs Improvement";

            let certifications = ["AWS Certified Cloud Practitioner", "Scrum Alliance CSM"];
            if (job.category === "IT & Software") certifications = ["Meta Front-End Developer Professional Certificate", "React Advanced Certification"];
            else if (job.category === "AI & Data") certifications = ["Google Professional Data Engineer", "TensorFlow Developer Certificate"];
            else if (job.category === "Graphic Design") certifications = ["Adobe Certified Professional in Visual Design", "Interaction Design Foundation UX Certificate"];
            
            let learningPath = "Build portfolio projects in production environments";
            let course = "Next.js Architecture & Performance optimization";
            if (job.category === "AI & Data") {
              learningPath = "Practice algorithms optimization using PyTorch";
              course = "Machine Learning Engineering for Production (MLOps)";
            } else if (job.category === "Graphic Design") {
              learningPath = "Engage in user testing methodologies";
              course = "Advance UI Design Patterns & Component Architectures";
            }

            return {
              jobId: job.id,
              title: job.title,
              companyName: job.companyName,
              location: job.location,
              matchScore: finalMatchScore,
              matchingSkills: matchedSkills,
              missingSkills: missingSkills.slice(0, 4),
              qualificationMatch,
              experienceMatch,
              atsCompatibility: atsComp,
              certifications,
              learningPath,
              course
            };
          })
          .sort((a: any, b: any) => b.matchScore - a.matchScore)
          .slice(0, 3);

        return {
          isSupported: true,
          score: baseScore,
          atsScore: atsScore,
          feedback: feedback,
          missingSkills: missingSkillsOverall,
          matches: jobMatches
        };
      }
    }),
    {
      name: "titan-chat-storage",
    }
  )
);
