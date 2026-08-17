"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { CreditCard, Check, ShieldAlert, Award, FileText } from "lucide-react";

export default function EmployerBillingPage() {
  const invoices = [
    { id: "inv-2289", date: "May 01, 2026", desc: "Enterprise Recruiter Plan (Monthly)", amount: "PKR 15,000", status: "Paid" },
    { id: "inv-2144", date: "Apr 01, 2026", desc: "Enterprise Recruiter Plan (Monthly)", amount: "PKR 15,000", status: "Paid" }
  ];

  const handleUpgrade = () => {
    toast.success("Redirecting to subscription partner stripe console...");
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Billing & Workspace subscription</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Review your recruiting package, print historic invoices, or configure credit card payment profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left column: plan card */}
        <div className="md:col-span-5 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1">
            <CreditCard className="h-4.5 w-4.5 text-indigo-600 animate-pulse-slow" />
            <span>Active Plan</span>
          </h3>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-navy to-primary-navy-light text-white relative overflow-hidden shadow-lg shadow-primary-navy/15">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold">Enterprise Recruiter</h4>
            <span className="text-2xl font-black block mt-2">PKR 15k<span className="text-xs font-medium text-slate-300">/mo</span></span>
            
            <p className="text-[10px] text-slate-300 mt-2 leading-relaxed font-semibold">
              Advanced AI matchmaking parameters, unlimited job postings, and active recruiter console permissions.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-xs font-bold text-text-secondary">
            {[
              "Unlimited Active Jobs",
              "AI Profile Sifting Indicators",
              "Custom recruiter video interfaces",
              "Priority candidate response tracking"
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full py-2.5 font-bold uppercase tracking-wider text-[10px] border-primary-navy/15 text-primary-navy hover:bg-ice-blue mt-1"
            onClick={handleUpgrade}
          >
            Upgrade Workspace
          </Button>
        </div>

        {/* Right column: invoices list */}
        <div className="md:col-span-7 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
            Invoice history ledger
          </h3>

          <div className="flex flex-col gap-3.5">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 border border-border-color rounded-xl bg-white flex items-center justify-between gap-4">
                <div className="flex gap-3.5 items-center">
                  <div className="h-9 w-9 rounded-lg bg-ice-blue border border-border-color text-primary-navy flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4.5 w-4.5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-navy">{inv.desc}</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">{inv.date} • ID: {inv.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-primary-navy">{inv.amount}</span>
                  <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
