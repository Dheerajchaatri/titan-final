# Walkthrough - TITAN Job Portal

TITAN is a complete, enterprise-grade AI-powered Job Portal built using **Next.js 16**, **React 19**, **Zustand**, **Tailwind CSS v4**, and **Framer Motion**. It inherits the exact premium SaaS design tokens, layout cards, and color guidelines from the reference images.

---

## 🚀 Key Highlights & Accomplishments

1. **Production-Ready Build**: The entire project compiles cleanly under Next.js production bundlers with **0 type-checking errors** or routing issues.
2. **Interactive State Sandbox Engine**: We implemented a centralized client-side database using **Zustand** stores (`src/store/`). To help verify the platform's features, we added a **Sandbox Role Switcher** dropdown directly in the global header navbar:
   - **Candidate mode**: Log in as candidate **Ahmad Raza** to view CV analysis scorecards, apply for jobs with cover letters, save openings, and message recruiters.
   - **Employer mode**: Log in as recruiter **Sarah Khan** to publish new jobs and change candidate status on the recruiting pipeline board.
   - **Admin mode**: Log in as administrator to audit platform-wide listings and review system logs.
3. **Responsive Premium Aesthetics**: Spacing, borders, gradients, glass panels, and spring-based animations match the reference mockups.

---

## 📁 Codebase Directory Structure

```
src/
├── app/
│   ├── globals.css             # Colors, custom keyframe animation, scrollbars, and glass classes
│   ├── layout.tsx              # Wrapper injection for Toast notifications and AI Chat Assistant
│   ├── page.tsx                # Image 1 Homepage (Hero, Search card, Categories, testimonials, FAQs)
│   ├── about/                  # About Us - Org context & pillars
│   ├── pricing/                # Subscription grids (Seekers & Recruiters tiers)
│   ├── contact/                # Query form binding
│   ├── companies/              # Directory of hiring organizations
│   ├── privacy/                # Privacy policy terms
│   ├── terms/                  # Terms & conditions of service
│   ├── auth/
│   │   ├── login/              # Image 3 Login Screen (SSO options, tabbed credentials autofills)
│   │   └── register/           # Signup validation
│   ├── candidate/              # Candidate dashboard area (Image 4 & 5 matching)
│   │   ├── layout.tsx          # Navigation control layout
│   │   ├── dashboard/          # Profile completion circle, recent jobs, SVG analytical charts
│   │   ├── profile/            # Timeline work experience, skill gauges, languages, download resume
│   │   ├── career-assistant/   # [NEW] AI Career Assistant chat panel & Roadmap timeline
│   │   ├── interview-prep/     # [NEW] AI Mock Interview simulator & score evaluator
│   │   ├── skills-assessment/  # [NEW] MCQ quiz testing center & profile rating updates
│   │   ├── certificates/       # [NEW] Earned badges ledger, filters & document previews
│   │   ├── notifications/      # [NEW] Alert log & clear-inbox clear indicators
│   │   ├── resume-analyzer/    # AI CV parser report sandbox
│   │   ├── resume-builder/     # AI Cover Letter custom writer
│   │   ├── applied-jobs/       # Applied listings status checklist
│   │   ├── saved-jobs/         # Bookmarked roles
│   │   ├── messages/           # Sandbox messaging panel
│   │   └── settings/           # Seekers status preferences form
│   ├── employer/               # Employer dashboard area
│   │   ├── layout.tsx          # Recruiter console layout
│   │   ├── dashboard/          # Recruitment pipeline board
│   │   ├── post-job/           # Publish jobs form
│   │   └── settings/           # Manage company profiles
│   └── admin/                  # Admin dashboard area
│       ├── layout.tsx          # Admin layout check
│       └── dashboard/          # платформы moderation & activity logs
├── components/
│   ├── ui/                     # Reusable UI primitives (Button, Input, Accordion, Tabs, Dialog, Toast)
│   └── global/                 # Shared components (Navbar, Footer, Sidebar, ChatWidget)
├── store/
│   ├── useUserStore.ts         # User auth sessions and profiles CRUD
│   ├── useJobStore.ts          # Jobs search queries and application actions
│   └── useChatStore.ts         # Direct messaging logs and AI assistant responses
└── prisma/
    └── schema.prisma           # Postgres DB schema blueprints
```

---

## 🛠️ Verification & Compilation Output

Prerendering compilation output from the Next.js compiler:
```bash
✓ Compiled successfully in 5.1s
Running TypeScript ...
Finished TypeScript in 5.3s ...
Collecting page data using 7 workers ...
Generating static pages using 7 workers (0/30) ...
Generating static pages using 7 workers (7/30) 
Generating static pages using 7 workers (14/30) 
Generating static pages using 7 workers (22/30) 
✓ Generating static pages using 7 workers (30/30) in 637ms
Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /admin/dashboard
├ ○ /auth/login
├ ○ /auth/register
├ ○ /candidate/applied-jobs
├ ○ /candidate/career-assistant
├ ○ /candidate/certificates
├ ○ /candidate/dashboard
├ ○ /candidate/interview-prep
├ ○ /candidate/messages
├ ○ /candidate/notifications
├ ○ /candidate/profile
├ ○ /candidate/resume-analyzer
├ ○ /candidate/resume-builder
├ ○ /candidate/saved-jobs
├ ○ /candidate/settings
├ ○ /candidate/skills-assessment
├ ○ /companies
├ ○ /contact
├ ○ /employer/dashboard
├ ○ /employer/post-job
├ ○ /employer/settings
├ ○ /jobs
├ ○ /pricing
├ ○ /privacy
└ ○ /terms
```
> [!NOTE]
> All newly added routes compile static-rendered (`○`), ensuring absolute loading speeds during navigation.
