"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

export default function EmployerSettingsPage() {
  const { user, updateEmployerProfile } = useUserStore();
  const profile = user?.employerProfile;

  const [companyName, setCompanyName] = useState(profile?.companyName || "Systems Limited");
  const [industry, setIndustry] = useState(profile?.industry || "Technology, IT Services");
  const [employees, setEmployees] = useState(profile?.employees || "5,000 - 10,000");
  const [location, setLocation] = useState(profile?.location || "Lahore, Punjab, Pakistan");
  const [website, setWebsite] = useState(profile?.website || "www.systemsltd.com");
  const [about, setAbout] = useState(profile?.about || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployerProfile({
      companyName,
      industry,
      employees,
      location,
      website,
      about,
    });
    toast.success("Company settings and profiles updated successfully!");
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Company Profile Settings</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Update the profile details displayed to prospective job seekers.
        </p>
      </div>

      <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <Input
            type="text"
            label="Company Name *"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="Industry Segment"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Software Development"
              required
            />

            <Input
              type="text"
              label="Employee Count Size"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              placeholder="e.g. 100 - 500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <Input
              type="text"
              label="Website Address"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Company Description
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              placeholder="Describe the company mission and focus..."
              className="w-full p-4 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="py-3 mt-2 font-bold uppercase tracking-wider text-xs flex justify-center"
          >
            Save Company Details
          </Button>
        </form>
      </div>
    </div>
  );
}
