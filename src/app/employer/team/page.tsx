"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { UserPlus, Shield, X, UserCheck } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Recruiter";
  status: "Active" | "Pending";
}

export default function TeamMembersPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Recruiter">("Recruiter");
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "tm-1", name: "Sarah Khan", email: "sarah.khan@systemsltd.com", role: "Owner", status: "Active" },
    { id: "tm-2", name: "Kamran Shah", email: "kamran.shah@systemsltd.com", role: "Admin", status: "Active" },
    { id: "tm-3", name: "Siddique Ali", email: "siddique.ali@systemsltd.com", role: "Recruiter", status: "Active" }
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "Pending"
    };

    setMembers(prev => [...prev, newMember]);
    toast.success(`Invite sent successfully to ${inviteEmail}!`);
    setInviteEmail("");
  };

  const handleRemove = (id: string, name: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    toast.success(`Removed team member ${name}.`);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Team Member Management</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Add agency administrators, invite hiring recruiters, and configure system permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Invite Form */}
        <div className="md:col-span-4 bg-white border border-border-color rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3 flex items-center gap-1">
            <UserPlus className="h-4.5 w-4.5 text-primary-navy" />
            <span>Invite Colleague</span>
          </h3>

          <form onSubmit={handleInvite} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Email Address</label>
              <Input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full text-xs"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Account Role</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-lg border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-primary-navy"
              >
                <option value="Recruiter">Recruiter</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="font-bold uppercase tracking-wider text-xs w-full py-2.5 mt-2"
            >
              Send Invitation
            </Button>
          </form>
        </div>

        {/* Right Side: Members List */}
        <div className="md:col-span-8 bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-3">
            Active Workspace Recruiters
          </h3>

          <div className="flex flex-col gap-3.5">
            {members.map((member) => (
              <div key={member.id} className="p-4 border border-border-color rounded-xl bg-white flex items-center justify-between gap-4">
                <div className="flex gap-3.5 items-center">
                  <div className="h-9 w-9 rounded-lg bg-ice-blue border border-border-color text-primary-navy font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {member.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-navy">{member.name}</h4>
                    <p className="text-[10px] text-text-secondary mt-0.5">{member.email}</p>
                    
                    <div className="flex items-center gap-2 mt-2 text-[9px] font-bold uppercase tracking-wider">
                      <span className="text-primary-navy flex items-center gap-0.5">
                        <Shield className="h-3 w-3" /> {member.role}
                      </span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider border",
                        member.status === "Active"
                          ? "bg-primary-navy/10 text-primary-navy border-primary-navy/20"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      )}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                </div>

                {member.role !== "Owner" && (
                  <button
                    onClick={() => handleRemove(member.id, member.name)}
                    className="p-1.5 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:text-primary-navy transition-colors cursor-pointer"
                    title="Revoke Access"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
