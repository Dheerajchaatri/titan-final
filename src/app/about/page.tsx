import React from "react";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Sparkles, Trophy, Users, ShieldAlert, Rocket, Target, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow flex flex-col gap-16 py-16">
        
        {/* Hero Area */}
        <section className="max-w-5xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
              <Trophy className="h-3.5 w-3.5 text-gold" />
              <span>ESTD. 2025</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary-navy leading-tight">
              About Taj Institute of Technology & Applied Networks
            </h1>
            <p className="text-sm font-semibold text-text-secondary leading-relaxed max-w-xl">
              Taj Institute (TITAN) was established to bridge the gap between technical education and industrial needs in Pakistan. We leverage advanced automated parsing and matching technologies to accelerate tech hiring pipelines.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="h-44 w-44 rounded-full bg-gradient-to-tr from-gold/10 to-primary-navy/15 blur-2xl absolute" />
            <div className="relative h-44 w-44 rounded-2xl bg-white border border-border-color shadow-2xl flex items-center justify-center">
              <img src="/logo.png" alt="TITAN Logo" className="h-32 w-auto object-contain" />
            </div>
          </div>
        </section>

        {/* Pillars / Values Section */}
        <section className="bg-white border-y border-border-color py-16">
          <div className="max-w-5xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <div className="h-10 w-10 rounded-xl bg-ice-blue border border-ice-blue-dark flex items-center justify-center text-primary-navy">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Our Mission</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                To empower every software engineer, designer, and digital marketer in Pakistan by matching their ratings to the ultimate job opening.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-10 w-10 rounded-xl bg-ice-blue border border-ice-blue-dark flex items-center justify-center text-primary-navy">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider">National Reach</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                Bridging tech talent hubs in Lahore, Karachi, Islamabad, and remote workspaces to global recruiting networks.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-10 w-10 rounded-xl bg-ice-blue border border-ice-blue-dark flex items-center justify-center text-primary-navy">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider">AI Innovation</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                Continuous iteration of our semantic search parsers and real-time suitability analytics dashboard metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Platform stats summary */}
        <section className="max-w-5xl w-full mx-auto px-6 flex flex-col gap-8 text-center items-center">
          <h2 className="text-2xl font-black text-primary-navy">TITAN in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mt-4">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col gap-1">
              <span className="text-2xl font-black text-primary-navy">120K+</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">CVs Scanned</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col gap-1">
              <span className="text-2xl font-black text-primary-navy">500+</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Hiring Partners</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col gap-1">
              <span className="text-2xl font-black text-primary-navy">95%</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Recruiter Retention</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col gap-1">
              <span className="text-2xl font-black text-primary-navy">PKR 4.2B</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Salary Transacted</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
