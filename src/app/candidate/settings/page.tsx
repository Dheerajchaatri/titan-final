"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

export default function CandidateSettingsPage() {
  const { user, updateCandidateProfile } = useUserStore();
  const profile = user?.candidateProfile;

  const [title, setTitle] = useState(profile?.title || "");
  const [preferredSalary, setPreferredSalary] = useState(profile?.preferredSalary || "");
  const [availability, setAvailability] = useState(profile?.availability || "Available");
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile({
      title,
      preferredSalary,
      availability,
      aboutMe,
    });
    toast.success("Settings saved and profile details updated successfully!");
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Account Settings</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Customize your job seeking status and preferences.
        </p>
      </div>

      <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <Input
            type="text"
            label="Professional Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="Preferred Salary"
              value={preferredSalary}
              onChange={(e) => setPreferredSalary(e.target.value)}
              placeholder="e.g. PKR 180k - 250k"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                Availability Status
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white border-border-color text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all shadow-sm h-[46px]"
              >
                <option value="Available">Available</option>
                <option value="Interviewing">Currently Interviewing</option>
                <option value="Open to offers">Open to Offers</option>
                <option value="Not available">Not Available</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Profile Summary / Bio
            </label>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={4}
              placeholder="Type your bio..."
              className="w-full p-4 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="py-3 mt-2 font-bold uppercase tracking-wider text-xs flex justify-center"
          >
            Save Account Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
