import React from "react";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-3xl w-full mx-auto px-6 py-16 flex flex-col gap-6 text-left">
        <h1 className="text-3xl font-extrabold text-primary-navy tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-text-muted">Last Updated: July 16, 2026</p>

        <hr className="border-slate-100 my-2" />

        <div className="flex flex-col gap-6 text-xs text-text-secondary leading-relaxed font-medium">
          <p>
            Welcome to TITAN. We are committed to protecting the personal data of our candidates and recruiters. This policy explains what information we collect when you use our portal.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">1. Information We Collect</h3>
          <p>
            We collect information you provide directly, including your name, email address, password, resume files (PDF), skill list updates, and work experience details.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">2. How We Use Information</h3>
          <p>
            We process your information to match your resume to job requirements using our AI engine, manage your applications, display analytics to recruiters, and send you email alerts for relevant openings.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">3. Data Sharing</h3>
          <p>
            Your CV details and suitability match scores are only shared with recruiting organizations when you explicitly apply for a job posting. We do not sell candidate information to third parties.
          </p>

          <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider mt-4">4. Security</h3>
          <p>
            We implement encryption and access controls to secure your personal documents. You can request deletion of your account and files at any time via your account settings.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
