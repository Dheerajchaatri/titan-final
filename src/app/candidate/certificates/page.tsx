"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  Award,
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  Calendar,
  ShieldCheck,
  User,
  ExternalLink
} from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  status: "Active" | "Expired";
  imageUrl: string;
}

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Expired">("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: "cert-1",
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Coursera / Meta",
      issueDate: "Jan 2026",
      credentialId: "META-FED-8849",
      status: "Active",
      imageUrl: "/mock/meta-cert.png"
    },
    {
      id: "cert-2",
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      issueDate: "Aug 2025",
      credentialId: "FCC-JS-9921",
      status: "Active",
      imageUrl: "/mock/fcc-cert.png"
    },
    {
      id: "cert-3",
      name: "React State Management Architect",
      issuer: "Zustand Academy",
      issueDate: "Nov 2024",
      credentialId: "ZUSTAND-ARCH-113",
      status: "Active",
      imageUrl: "/mock/zustand-cert.png"
    }
  ];

  const handleDownload = (cert: Certificate) => {
    toast.success(`Downloading ${cert.name.substring(0, 30)}... credential certificate PDF.`);
  };

  const filteredCerts = certificates.filter((cert) => {
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || cert.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
          <Award className="h-3.5 w-3.5 text-gold" />
          <span>Professional Ledger</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2">Earned Certificates</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Review your earned credentials, download PDFs, or showcase your verified badges.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-border-color p-4.5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-full"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end items-center w-full sm:w-auto">
          {(["All", "Active", "Expired"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all border uppercase tracking-wider cursor-pointer whitespace-nowrap",
                statusFilter === filter
                  ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-text-secondary hover:bg-slate-100"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* Certificates Grid */}
      {filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-border-color rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-light" />
              
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex justify-between items-start">
                  <Award className="h-6 w-6 text-primary-navy stroke-[1.75]" />
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border",
                    cert.status === "Active"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  )}>
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-primary-navy leading-snug mt-1.5 line-clamp-2 min-h-[32px]">
                  {cert.name}
                </h3>
                
                <p className="text-[10px] font-semibold text-text-secondary">{cert.issuer}</p>

                <div className="flex items-center gap-3.5 text-[8px] font-bold text-text-muted uppercase tracking-wider mt-2.5">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Issued {cert.issueDate}</span>
                  <span>ID: {cert.credentialId}</span>
                </div>
              </div>

              <div className="border-t border-slate-50 pt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5 flex-1 justify-center py-2 text-primary-navy border-primary-navy/15 hover:bg-ice-blue"
                  onClick={() => setSelectedCert(cert)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5 flex-1 justify-center py-2"
                  onClick={() => handleDownload(cert)}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </Button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-border-color rounded-2xl p-16 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl text-text-muted">
            🔍
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-primary-navy">No Credentials Found</h3>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              We couldn't find any certificates matching your current search parameters. Try clearing your queries.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-bold uppercase tracking-wider text-xs border-primary-navy/15 text-primary-navy mt-1"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* View Certificate Modal Preview */}
      <Dialog
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title="Certificate Verification"
        size="md"
      >
        {selectedCert && (
          <div className="flex flex-col gap-6 py-2">
            
            {/* Visual Certificate Board Mock */}
            <div className="border-[6px] border-double border-slate-300 bg-slate-50 p-6 rounded-xl flex flex-col items-center text-center gap-6 relative shadow-inner">
              <Award className="h-9 w-9 text-primary-navy stroke-[1.75]" />
              
              <div className="flex flex-col gap-2">
                <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest leading-none">Credential of Professional Achievement</span>
                <h2 className="text-sm font-black text-primary-navy mt-1 leading-snug">{selectedCert.name}</h2>
                <span className="text-[10px] text-text-secondary leading-none mt-1">This is proudly awarded to</span>
                <span className="text-base font-black text-primary-navy mt-1.5 underline decoration-gold decoration-2 underline-offset-4">Ahmad Raza</span>
              </div>

              <div className="w-full flex justify-between items-center text-[8px] font-bold text-text-muted uppercase tracking-wider border-t border-slate-200/80 pt-4 mt-2 px-2">
                <div className="flex flex-col items-start">
                  <span>Authorized Issuer</span>
                  <span className="text-primary-navy font-black mt-1">{selectedCert.issuer}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span>Credential Identifier</span>
                  <span className="text-primary-navy font-black mt-1">{selectedCert.credentialId}</span>
                </div>
              </div>
            </div>

            {/* Actions footer */}
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="font-bold uppercase tracking-wider text-xs"
                onClick={() => setSelectedCert(null)}
              >
                Close Preview
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5"
                onClick={() => {
                  handleDownload(selectedCert);
                  setSelectedCert(null);
                }}
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </Button>
            </div>

          </div>
        )}
      </Dialog>

    </div>
  );
}
