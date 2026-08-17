"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { Building, Globe, Mail, Users, MapPin, Save } from "lucide-react";

export default function CompanyProfilePage() {
  const { user } = useUserStore();
  
  const [companyName, setCompanyName] = useState(user?.employerProfile?.companyName || "Systems Limited");
  const [website, setWebsite] = useState("https://systemsltd.com");
  const [description, setDescription] = useState("Systems Limited is a premier tech powerhouse specializing in software development, cloud systems, integration architectures, and global outsourcing services.");
  const [industry, setIndustry] = useState("Technology, IT Services");
  const [size, setSize] = useState("5000+ Employees");
  const [address, setAddress] = useState("DHA Phase 6, Lahore, Pakistan");
  const [email, setEmail] = useState("recruitment@systemsltd.com");
  const [phone, setPhone] = useState("+92-42-111-778-778");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Company profile settings saved successfully!");
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Company Profile Settings</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Edit branding parameters, company descriptions, addresses, and recruiter contacts.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-6 text-left">
        
        {/* Banner Mock */}
        <div className="h-32 bg-gradient-to-r from-primary-navy to-primary-navy-light rounded-xl flex items-end p-4 relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-black/10" />
          <div className="h-16 w-16 bg-white rounded-xl border border-border-color flex items-center justify-center font-black text-xl text-primary-navy relative z-10 shadow shadow-primary-navy/20">
            SL
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Company Name</label>
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full font-semibold"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Industry</label>
            <Input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full font-semibold"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Website URL</label>
            <Input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              icon={<Globe className="h-4 w-4" />}
              className="w-full font-semibold"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Company Size</label>
            <Input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              icon={<Users className="h-4 w-4" />}
              className="w-full font-semibold"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Company Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3.5 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-primary-navy font-semibold leading-relaxed"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Official Address</label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            icon={<MapPin className="h-4 w-4" />}
            className="w-full font-semibold"
            required
          />
        </div>

        {/* Contact details */}
        <div className="border-t border-slate-50 pt-5 flex flex-col gap-4">
          <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Recruitment Contact info</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Recruitment Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
                className="w-full font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Recruiter Phone</label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full font-semibold"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="border-t border-slate-50 pt-5 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 px-6 py-2.5"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </Button>
        </div>

      </form>

    </div>
  );
}
