"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { Heart, Mail, Tag, UserMinus } from "lucide-react";

interface SavedCandidate {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: string;
  tags: string[];
  notes?: string;
}

export default function SavedCandidatesPage() {
  const [candidates, setCandidates] = useState<SavedCandidate[]>([
    { id: "sc-1", name: "Ahmad Raza", title: "Senior Frontend Developer", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"], experience: "4 Years", tags: ["Frontend", "Top Talent"], notes: "Excellent coding structure." },
    { id: "sc-2", name: "Sania Malik", title: "Full Stack Engineer", skills: ["Node.js", "React.js", "PostgreSQL", "GraphQL"], experience: "2 Years", tags: ["Node.js"], notes: "Decent portfolio." }
  ]);

  const handleUnsave = (id: string, name: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    toast.success(`Removed ${name} from saved candidates.`);
  };

  const handleInvite = (name: string) => {
    toast.success(`Invitation to apply successfully dispatched to ${name}!`);
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-primary-navy">Saved Candidates Bookmarks</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Review candidates bookmarked by your recruiting team, invite them to active posts, or tag profiles.
        </p>
      </div>

      {/* Candidates List Grid */}
      {candidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((cand) => (
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
                  onClick={() => handleUnsave(cand.id, cand.name)}
                  className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-rose-500 transition-colors cursor-pointer"
                  title="Remove from Saved"
                >
                  <Heart className="h-4.5 w-4.5 fill-rose-500 text-rose-500" />
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
                  className="font-bold uppercase tracking-wider text-[9px] flex-grow justify-center border-primary-navy/15 text-rose-600 hover:bg-rose-50 py-2 flex items-center gap-1"
                  onClick={() => handleUnsave(cand.id, cand.name)}
                >
                  <UserMinus className="h-3.5 w-3.5" />
                  <span>Unsave Candidate</span>
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
            ❤️
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-primary-navy">No Saved Candidates</h3>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              Bookmarks will appear here once candidate profiles are saved.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
