"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { Check, HelpCircle, ShieldAlert, Sparkles, Building, Zap } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<string>("monthly");

  const handleSubscribe = (planName: string) => {
    toast.success(`Subscribing to ${planName} plan... Redirecting to secure sandbox checkout.`);
  };

  const candidatePlans = [
    {
      name: "Starter Seeker",
      price: "PKR 0",
      description: "Explore opportunities and track applications.",
      features: [
        "Create public candidate portfolio",
        "Search & apply for jobs",
        "Basic dashboard tracking",
        "Upload PDF resume",
      ],
      cta: "Current Free Tier",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro Career Builder",
      price: billingPeriod === "monthly" ? "PKR 1,200" : "PKR 950",
      description: "Supercharge your applications with AI tools.",
      features: [
        "All Starter Seeker features",
        "Unlimited AI cover letter generations",
        "Resume ATS parser compatibility analyzer",
        "Unlimited access to AI Career Assistant",
        "Skill Assessment validation badges",
        "Priority match highlight for recruiters",
      ],
      cta: "Upgrade to Pro",
      variant: "gold" as const,
      popular: true,
    },
  ];

  const employerPlans = [
    {
      name: "Recruiter Standard",
      price: billingPeriod === "monthly" ? "PKR 4,500" : "PKR 3,600",
      description: "For small teams and growing companies.",
      features: [
        "Post up to 10 active job listings",
        "Recruitment pipeline board tracker",
        "Standard AI candidate match suggestions",
        "Direct candidate messaging (100 messages/mo)",
        "2 recruiter seats",
      ],
      cta: "Start Hiring",
      variant: "primary" as const,
      popular: false,
    },
    {
      name: "Enterprise Pro",
      price: billingPeriod === "monthly" ? "PKR 12,000" : "PKR 9,800",
      description: "For large scale recruitment campaigns.",
      features: [
        "Unlimited job postings",
        "Priority AI match compatibility parsing",
        "Recruitment analytics dashboard & reports",
        "Unlimited candidate messaging & notifications",
        "10+ recruiter seats with permission levels",
        "Dedicated accounts manager & phone support",
      ],
      cta: "Contact Enterprise",
      variant: "primary" as const,
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-16 flex flex-col gap-12 items-center">
        
        {/* Header */}
        <div className="text-center flex flex-col gap-3 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-center">
            <Zap className="h-3.5 w-3.5 text-gold animate-bounce" />
            <span>SaaS Subscription Models</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-navy tracking-tight leading-tight">
            Flexible Plans Tailored For Your Success
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-text-muted leading-relaxed">
            Upgrade to unlock AI-powered cover letters, ATS resume reports, or enterprise recruiting pipelines.
          </p>
        </div>

        {/* Billing Period toggle and selection */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Tabs
            options={[
              { id: "monthly", label: "Monthly Billing" },
              { id: "yearly", label: "Yearly Billing (Save 20%)" },
            ]}
            activeId={billingPeriod}
            onChange={(id) => setBillingPeriod(id)}
            variant="capsule"
          />
        </div>

        {/* Plans Container Grid */}
        <div className="w-full flex flex-col gap-12 mt-4">
          
          {/* Candidate Sections */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-primary-navy border-l-4 border-gold pl-3 self-start">
              For Job Seekers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {candidatePlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white border rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all duration-300 ${
                    plan.popular
                      ? "border-gold ring-1 ring-gold shadow-lg shadow-gold/5 -translate-y-1"
                      : "border-border-color hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-extrabold text-primary-navy leading-none">{plan.name}</h4>
                        <p className="text-xs text-text-muted mt-1 leading-snug">{plan.description}</p>
                      </div>
                      {plan.popular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-[9px] font-black text-gold-dark border border-gold/20 uppercase tracking-wider">
                          Popular Fit
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 py-3 border-y border-slate-100">
                      <span className="text-3xl font-black text-primary-navy">{plan.price}</span>
                      <span className="text-xs font-semibold text-text-muted">
                        / {billingPeriod === "monthly" ? "month" : "month, billed yearly"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3 py-3 text-xs font-semibold text-text-secondary">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="h-4.5 w-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={plan.variant}
                    className="w-full mt-8 py-3 font-bold uppercase tracking-wider text-xs"
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={plan.cta.includes("Current")}
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Employer Sections */}
          <div className="flex flex-col gap-6 mt-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-primary-navy border-l-4 border-primary-navy pl-3 self-start">
              For Recruiters & Companies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {employerPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white border rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all duration-300 ${
                    plan.popular
                      ? "border-primary-navy ring-1 ring-primary-navy shadow-lg shadow-primary-navy/5 -translate-y-1"
                      : "border-border-color hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-extrabold text-primary-navy leading-none">{plan.name}</h4>
                        <p className="text-xs text-text-muted mt-1 leading-snug">{plan.description}</p>
                      </div>
                      {plan.popular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-navy/5 text-[9px] font-black text-primary-navy border border-primary-navy/10 uppercase tracking-wider">
                          Best Value
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 py-3 border-y border-slate-100">
                      <span className="text-3xl font-black text-primary-navy">{plan.price}</span>
                      <span className="text-xs font-semibold text-text-muted">
                        / {billingPeriod === "monthly" ? "month" : "month, billed yearly"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3 py-3 text-xs font-semibold text-text-secondary">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="h-4.5 w-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full mt-8 py-3 font-bold uppercase tracking-wider text-xs"
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
