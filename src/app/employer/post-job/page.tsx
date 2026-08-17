"use client";

import React, { useState } from "react";
import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostJobPage() {
  const router = useRouter();
  const { postJob } = useJobStore();
  const { user } = useUserStore();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [category, setCategory] = useState("IT & Software");
  const [experienceRequired, setExperienceRequired] = useState("1-3 Yrs");
  const [jobType, setJobType] = useState("Full Time");
  const [description, setDescription] = useState("");
  const [requirementsInput, setRequirementsInput] = useState("");
  const [benefitsInput, setBenefitsInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !salaryRange || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const requirements = requirementsInput.split(",").map(r => r.trim()).filter(Boolean);
      const benefits = benefitsInput.split(",").map(b => b.trim()).filter(Boolean);

      postJob({
        title,
        companyName: user?.employerProfile?.companyName || "Systems Limited",
        industry: user?.employerProfile?.industry || "Technology, IT Services",
        logo: user?.employerProfile?.companyName ? user.employerProfile.companyName.substring(0, 2).toUpperCase() : "SL",
        category,
        location,
        salaryRange,
        jobType,
        experienceRequired,
        description,
        requirements: requirements.length > 0 ? requirements : ["React.js", "JavaScript"],
        benefits: benefits.length > 0 ? benefits : ["Medical Insurance"],
        isFeatured: true,
      });

      toast.success("Job posting published successfully!");
      setSubmitting(false);
      router.push("/employer/dashboard");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/employer/dashboard" className="p-1.5 rounded-lg border border-border-color hover:bg-slate-50 text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4.5 w-4.5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-primary-navy">Post a New Vacancy</h1>
          <p className="text-xs font-semibold text-text-muted mt-1">Publish an opening to match candidate talent pools.</p>
        </div>
      </div>

      <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Job Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
              required
            />

            <Input
              type="text"
              label="Location / Workspace *"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lahore, Punjab or Remote"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input
              type="text"
              label="Salary Budget *"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="e.g. PKR 180k - 250k"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white border-border-color text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy h-[46px]"
              >
                <option value="IT & Software">IT & Software</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="AI & Data">AI & Data</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR & Recruitment">HR & Recruitment</option>
                <option value="Engineering">Engineering</option>
                <option value="Government">Government</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Sales">Sales</option>
                <option value="Customer Support">Customer Support</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">Experience Level</label>
              <select
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white border-border-color text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy h-[46px]"
              >
                <option value="Fresh / Intern">Fresh / Intern</option>
                <option value="1-3 Yrs">1-3 Yrs</option>
                <option value="2-4 Yrs">2-4 Yrs</option>
                <option value="3-5 Yrs">3-5 Yrs</option>
                <option value="5+ Yrs">5+ Yrs</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white border-border-color text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy h-[46px]"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">Job Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the job role and responsibilities..."
              className="w-full p-4 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all"
              required
            />
          </div>

          <Input
            type="text"
            label="Technical Requirements (comma separated)"
            value={requirementsInput}
            onChange={(e) => setRequirementsInput(e.target.value)}
            placeholder="e.g. React.js, TypeScript, Tailwind CSS"
          />

          <Input
            type="text"
            label="Perks & Benefits (comma separated)"
            value={benefitsInput}
            onChange={(e) => setBenefitsInput(e.target.value)}
            placeholder="e.g. Medical Insurance, Annual Bonus, Flexible Hours"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 mt-2 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
            isLoading={submitting}
          >
            <PlusCircle className="h-4.5 w-4.5" />
            <span>Publish Job Opening</span>
          </Button>

        </form>
      </div>
    </div>
  );
}
