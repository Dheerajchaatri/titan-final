"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, MapPin, Building, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CompaniesPage() {
  const [query, setQuery] = useState("");

  const companiesList = [
    { name: "Systems Limited", industry: "Technology, IT Services", location: "Lahore, Pakistan", count: 120, logo: "SL", size: "5,000 - 10,000", color: "from-blue-600 to-indigo-700" },
    { name: "NetSol Technologies", industry: "Software Development", location: "Islamabad, Pakistan", count: 95, logo: "NS", size: "1,000 - 5,000", color: "from-sky-500 to-blue-600" },
    { name: "10Pearls", industry: "IT Services & Consulting", location: "Karachi, Pakistan", count: 65, logo: "10P", size: "1,000 - 5,000", color: "from-slate-800 to-slate-950" },
    { name: "Daraz", industry: "E-commerce", location: "Remote / Karachi", count: 50, logo: "DZ", size: "2,000 - 5,000", color: "from-orange-500 to-red-600" },
    { name: "Meezan Bank", industry: "Banking & Finance", location: "Lahore / Karachi", count: 45, logo: "MB", size: "10,000+", color: "from-emerald-600 to-teal-700" },
    { name: "Habib Bank Limited", industry: "Banking", location: "Karachi, Pakistan", count: 31, logo: "HB", size: "15,000+", color: "from-emerald-800 to-teal-900" }
  ];

  const filteredCompanies = companiesList.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.industry.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-16 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-primary-navy tracking-tight">Hiring Partner Directory</h1>
          <p className="text-xs font-semibold text-text-muted mt-2">
            Explore companies hiring developers, designers, and managers across Pakistan.
          </p>
        </div>

        {/* Search Input */}
        <div className="bg-white border border-border-color rounded-2xl p-4 shadow-sm max-w-lg w-full flex items-center">
          <Input
            type="text"
            placeholder="Search by company name or industry..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="h-4.5 w-4.5" />}
            className="border-none shadow-none focus:ring-0"
          />
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {filteredCompanies.map((comp) => (
            <div key={comp.name} className="bg-white border border-border-color rounded-2xl p-6 flex items-start justify-between shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-4 items-start">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-tr ${comp.color} text-white font-black text-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                  {comp.logo}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-primary-navy leading-snug">{comp.name}</h3>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{comp.industry}</p>
                  
                  <div className="flex flex-col gap-1 mt-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-text-muted" /> {comp.location}</span>
                    <span className="flex items-center gap-1.5"><Building className="h-3.5 w-3.5 text-text-muted" /> {comp.size} Employees</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-xs font-black text-primary-navy">{comp.count} Active Jobs</span>
                <Link href={`/jobs?keyword=${encodeURIComponent(comp.name)}`}>
                  <Button variant="secondary" size="sm" className="px-3.5 py-1.5 text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <span>Jobs</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
