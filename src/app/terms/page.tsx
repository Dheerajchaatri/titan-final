import React from "react";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-3xl w-full mx-auto px-6 py-16 flex flex-col gap-6 text-left">
        <h1 className="text-3xl font-extrabold text-primary-navy tracking-tight">Terms & Conditions</h1>
        <p className="text-xs text-text-muted">Last Updated: July 16, 2026</p>

        <hr className="border-slate-100 my-2" />

        <div className="flex flex-col gap-6 text-xs text-text-secondary leading-relaxed font-medium">
          <p>
            By accessing or using the TITAN Job Portal, you agree to comply with these terms. Please read them carefully before creating an account.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">1. Account Responsibility</h3>
          <p>
            You are responsible for maintaining the confidentiality of your credentials. Job Seekers must upload genuine work history, and Employers must publish valid, active job postings with clear descriptions.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">2. AI Assessments & Parsing</h3>
          <p>
            TITAN provides automated matching scores for evaluation support. These ratings are recommendations and do not guarantee interview placement or hiring decisions.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">3. Prohibited Activities</h3>
          <p>
            You may not scrape job listings, post misleading vacancies, upload malware-infected CV files, or attempt to bypass sandbox features.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">4. Limitation of Liability</h3>
          <p>
            TITAN is not liable for agreements reached between candidates and hiring organizations, or any interruptions in platform availability.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
