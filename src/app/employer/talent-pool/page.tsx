"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { Search, Database, Heart, Mail, Tag, FileSpreadsheet, Plus } from "lucide-react";

interface TalentCandidate {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: string;
  saved: boolean;
  tags: string[];
  notes?: string;
}

export default function TalentPoolPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState<TalentCandidate[]>([
    { id: "tc-1", name: "Ahmad Raza", title: "Senior Frontend Developer", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"], experience: "4 Years", saved: true, tags: ["Frontend", "Top Talent"], notes: "Excellent coding structure." },
    { id: "tc-2", name: "Fatima Shah", title: "UI/UX Product Designer", skills: ["Figma", "Design Systems", "Prototyping", "User Research"], experience: "3 Years", saved: false, tags: ["Design", "Immediate"], notes: "Portfolio looks sleek." },
    { id: "tc-3", name: "Imran Ahmed", title: "AI/ML Solutions Architect", skills: ["Python", "TensorFlow", "PyTorch", "AWS Cloud"], experience: "5 Years", saved: false, tags: ["AI/ML", "Senior"], notes: "Strong engineering background." },
    { id: "tc-4", name: "Sania Malik", title: "Full Stack Engineer", skills: ["Node.js", "React.js", "PostgreSQL", "GraphQL"], experience: "2 Years", saved: true, tags: ["Node.js"], notes: "Decent portfolio." }
  ]);

  const handleToggleSave = (id: string) => {
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, saved: !c.saved } : c
    ));
    const cand = candidates.find(c => c.id === id);
    if (cand) {
      toast.success(cand.saved ? `Removed ${cand.name} from saved candidates.` : `Saved ${cand.name} to talent pool list.`);
    }
  };

  const handleInvite = (name: string) => {
    toast.success(`Invitation to apply successfully dispatched to ${name}!`);
  };

  const handleExport = () => {
    toast.success("Dispatched talent pool ledger to CSV file.");
  };

  const filteredCands = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-primary-navy">Talent Database Pool</h1>
          <p className="text-xs font-semibold text-text-muted mt-1">
            Search verified candidate profiles, tag prospects, record reviewer comments, or invite to apply.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 border-primary-navy/15 text-primary-navy hover:bg-ice-blue"
          onClick={handleExport}
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Export Ledger</span>
        </Button>
      </div>

      {/* Search Input bar */}
      <div className="bg-white border border-border-color p-4.5 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search by name, skills, or titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-full text-xs"
          />
        </div>
      </div>

      {/* Candidates List Grid */}
      {filteredCands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCands.map((cand) => (
            <div
              key={cand.id}
              className="bg-white border border-border-color rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-ice-blue border border-border-color text-primary-navy font-black text-xs flex items-center justify-center flex-shrink-0">
                    {cand.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary-navy truncate">{cand.name}</h3>
                    <p className="text-[10px] text-text-secondary font-semibold mt-0.5 truncate">{cand.title}</p>
                    <p className="text-[9px] text-text-muted font-bold tracking-wider mt-1">{cand.experience} Exp</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleSave(cand.id)}
                  className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-rose-500 transition-colors cursor-pointer"
                >
                  <Heart className={cn("h-4.5 w-4.5", cand.saved ? "fill-rose-500 text-rose-500" : "text-text-muted")} />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {cand.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-50 text-text-secondary text-[8px] font-black border border-slate-200 flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Tag className="h-2.5 w-2.5 text-text-muted" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Candidate Skills list */}
              <div className="flex flex-wrap gap-1 mt-1">
                {cand.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-white text-[8px] font-bold text-text-secondary border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Recruiter Evaluation notes */}
              {cand.notes && (
                <div className="text-[10px] font-semibold text-text-muted italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  Notes: {cand.notes}
                </div>
              )}

              {/* Footer CTA */}
              <div className="border-t border-slate-50 pt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold uppercase tracking-wider text-[9px] flex-grow justify-center border-primary-navy/15 text-primary-navy hover:bg-ice-blue py-2 flex items-center gap-1"
                  onClick={() => handleToggleSave(cand.id)}
                >
                  <span>{cand.saved ? "Unsave" : "Save Profile"}</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="font-bold uppercase tracking-wider text-[9px] flex-grow justify-center py-2 flex items-center gap-1"
                  onClick={() => handleInvite(cand.name)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Invite to Apply</span>
                </Button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border-color rounded-2xl p-16 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl text-text-muted">
            🔍
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-primary-navy">No Candidates Found</h3>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              Try search parameters or add filters to find candidates.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
