import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAiChatStore } from "./useAiChatStore";

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  grade: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Skill {
  name: string;
  rating: number; // 0 to 100
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface CandidateProfile {
  name: string;
  title: string;
  location: string;
  experienceYears: number;
  availability: string;
  preferredSalary: string;
  preferredCities: string[];
  jobType: string;
  aboutMe: string;
  email: string;
  phone: string;
  age: number;
  educationBg: string;
  skills: Skill[];
  experience: WorkExperience[];
  education: Education[];
  certificates: Certificate[];
  projects: Project[];
  languages: { name: string; level: string; rating: number }[];
  achievements: { title: string; desc: string }[];
  profileCompletion: number;
  aiEmployabilityScore: number;
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  employees: string;
  location: string;
  website: string;
  about: string;
  logo: string;
  jobsCount: number;
  founded: string;
}

export type UserRole = "candidate" | "employer" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
  candidateProfile?: CandidateProfile;
  employerProfile?: EmployerProfile;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (name: string, email: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateCandidateProfile: (profile: Partial<CandidateProfile>) => void;
  updateEmployerProfile: (profile: Partial<EmployerProfile>) => void;
  switchRole: (role: UserRole) => void;
}

const mockCandidateProfile: CandidateProfile = {
  name: "Ahmad Raza",
  title: "Frontend Developer",
  location: "Lahore, Punjab, Pakistan",
  experienceYears: 3.5,
  availability: "Available",
  preferredSalary: "PKR 150k - 200k",
  preferredCities: ["Lahore", "Islamabad"],
  jobType: "Full Time",
  aboutMe: "Motivated Frontend Developer with 3+ years of experience building responsive web applications using React.js, JavaScript, and modern CSS frameworks. Passionate about creating seamless user experiences and writing clean, maintainable code.",
  email: "ahmad.raza@email.com",
  phone: "+92 301 1234567",
  age: 26,
  educationBg: "BS Computer Science",
  profileCompletion: 85,
  aiEmployabilityScore: 92,
  skills: [
    { name: "React.js", rating: 95 },
    { name: "JavaScript", rating: 92 },
    { name: "TypeScript", rating: 85 },
    { name: "HTML5", rating: 95 },
    { name: "CSS3", rating: 90 },
    { name: "Tailwind CSS", rating: 88 },
    { name: "Redux Toolkit", rating: 80 },
    { name: "Git & GitHub", rating: 90 },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Frontend Developer",
      company: "Systems Limited",
      location: "Lahore, Pakistan",
      period: "Jan 2022 - Present",
      description: [
        "Developed and maintained responsive web applications using React.js",
        "Collaborated with UI/UX designers to implement pixel-perfect designs",
        "Optimized web application speed and performance",
      ],
    },
    {
      id: "exp-2",
      role: "Junior Web Developer",
      company: "DevStack",
      location: "Lahore, Pakistan",
      period: "Jan 2020 - Dec 2021",
      description: [
        "Assisted in developing and maintaining client websites",
        "Fixed bugs and improved website performance",
      ],
    },
    {
      id: "exp-3",
      role: "Intern Web Developer",
      company: "Techlogix",
      location: "Lahore, Pakistan",
      period: "Jun 2019 - Dec 2019",
      description: [
        "Worked on frontend development tasks",
        "Learned and implemented modern web technologies",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "BS Computer Science",
      school: "Virtual University of Pakistan",
      period: "2018 - 2022",
      grade: "CGPA: 3.45 / 4.00",
    },
    {
      id: "edu-2",
      degree: "FSc Pre-Engineering",
      school: "Punjab College Lahore",
      period: "2016 - 2018",
      grade: "Marks: 82%",
    },
  ],
  certificates: [
    {
      id: "cert-1",
      name: "Meta Frontend Developer",
      issuer: "Coursera",
      year: "2023",
    },
    {
      id: "cert-2",
      name: "JavaScript Algorithms",
      issuer: "freeCodeCamp",
      year: "2022",
    },
    {
      id: "cert-3",
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      year: "2021",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "E-Commerce Platform",
      description: "Built with React, Redux, Node.js, and Stripe integrations.",
      tech: ["React", "Redux", "Node.js", "Express"],
      link: "#",
    },
    {
      id: "proj-2",
      name: "Task Management App",
      description: "React, TypeScript, Tailwind CSS with Drag and Drop board.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      link: "#",
    },
    {
      id: "proj-3",
      name: "Portfolio Website",
      description: "Personal website built with React, Framer Motion, EmailJS.",
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      link: "#",
    },
  ],
  languages: [
    { name: "English", level: "Fluent", rating: 90 },
    { name: "Urdu", level: "Native", rating: 100 },
    { name: "Punjabi", level: "Native", rating: 100 },
  ],
  achievements: [
    { title: "Top Performer", desc: "Awarded at Systems Limited" },
    { title: "Best Project Award", desc: "For E-Commerce Platform" },
    { title: "100+ Problems Solved", desc: "On LeetCode profile" },
  ],
};

const mockEmployerProfile: EmployerProfile = {
  companyName: "Systems Limited",
  industry: "Technology, IT Services",
  employees: "5,000 - 10,000",
  location: "Lahore, Punjab, Pakistan",
  website: "www.systemsltd.com",
  about: "Systems Limited is a leading global technology and business process outsourcing service provider. Established in 1977, we excel in providing state-of-the-art software solutions, cloud services, and digital consulting to clients worldwide.",
  logo: "/company-logos/systems.png",
  jobsCount: 120,
  founded: "1977",
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        id: "cand-1",
        email: "ahmad.raza@email.com",
        role: "candidate",
        name: "Ahmad Raza",
        avatarUrl: "/avatars/ahmad.jpg",
        candidateProfile: mockCandidateProfile,
      },
      isAuthenticated: true,
      isLoading: false,

      login: async (email: string, password: string, role: UserRole) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API lag

        // Verify credentials
        const isValid =
          (role === "candidate" && email === "candidate@gmail.com" && password === "candidate123") ||
          (role === "employer" && email === "employer@gmail.com" && password === "employer123") ||
          (role === "admin" && email === "admin@gmail.com" && password === "admin123");

        if (!isValid) {
          set({ isLoading: false });
          throw new Error("Invalid credentials.");
        }

        let name = "Ahmad Raza";
        let candidateProfile: CandidateProfile | undefined = undefined;
        let employerProfile: EmployerProfile | undefined = undefined;

        if (role === "candidate") {
          name = "Ahmad Raza";
          candidateProfile = mockCandidateProfile;
        } else if (role === "employer") {
          name = "Sarah Khan";
          employerProfile = mockEmployerProfile;
        } else {
          name = "Admin System";
        }

        set({
          user: {
            id: role === "candidate" ? "cand-1" : role === "employer" ? "emp-1" : "admin-1",
            email,
            role,
            name,
            candidateProfile,
            employerProfile,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      },

      register: async (name: string, email: string, role: UserRole) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 800));

        set({
          user: {
            id: Math.random().toString(36).substring(7),
            email,
            role,
            name,
            candidateProfile: role === "candidate" ? { ...mockCandidateProfile, name } : undefined,
            employerProfile: role === "employer" ? { ...mockEmployerProfile, companyName: name + " Ltd" } : undefined,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      },

      logout: () => {
        try {
          useAiChatStore.getState().initSession("", "", "");
        } catch (e) {}
        set({ user: null, isAuthenticated: false });
      },

      updateCandidateProfile: (profileUpdates) => {
        const currentUser = get().user;
        if (!currentUser || currentUser.role !== "candidate" || !currentUser.candidateProfile) return;

        const updatedProfile = {
          ...currentUser.candidateProfile,
          ...profileUpdates,
        };

        // Recalculate completion score based on standard fields
        let completed = 0;
        const total = 7;
        if (updatedProfile.name) completed++;
        if (updatedProfile.experience.length > 0) completed++;
        if (updatedProfile.education.length > 0) completed++;
        if (updatedProfile.skills.length > 0) completed++;
        if (updatedProfile.projects.length > 0) completed++;
        if (updatedProfile.certificates.length > 0) completed++;
        if (updatedProfile.aboutMe) completed++;
        updatedProfile.profileCompletion = Math.round((completed / total) * 100);

        set({
          user: {
            ...currentUser,
            candidateProfile: updatedProfile,
          },
        });
      },

      updateEmployerProfile: (profileUpdates) => {
        const currentUser = get().user;
        if (!currentUser || currentUser.role !== "employer" || !currentUser.employerProfile) return;

        set({
          user: {
            ...currentUser,
            employerProfile: {
              ...currentUser.employerProfile,
              ...profileUpdates,
            },
          },
        });
      },

      switchRole: (role: UserRole) => {
        const currentUser = get().user;
        if (!currentUser) return;
        
        let name = currentUser.name;
        if (role === "candidate") name = "Ahmad Raza";
        else if (role === "employer") name = "Sarah Khan";
        else name = "Super Admin";

        set({
          user: {
            ...currentUser,
            role,
            name,
            candidateProfile: role === "candidate" ? mockCandidateProfile : undefined,
            employerProfile: role === "employer" ? mockEmployerProfile : undefined,
          },
        });
      },
    }),
    {
      name: "titan-user-storage-v2",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
