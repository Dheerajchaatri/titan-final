"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore, UserRole } from "@/store/useUserStore";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Briefcase, Users, TrendingUp, KeyRound, Mail, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useUserStore();
  const [activeTab, setActiveTab] = useState<string>("candidate");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      const success = await login(email, password, activeTab as UserRole);
      if (success) {
        toast.success(`Welcome back to TITAN!`);
        if (activeTab === "candidate") {
          router.push("/candidate/dashboard");
        } else if (activeTab === "employer") {
          router.push("/employer/dashboard");
        } else if (activeTab === "admin") {
          router.push("/admin/dashboard");
        }
      }
    } catch (err) {
      toast.error("Invalid credentials.");
    }
  };

  const autofillDemo = (role: string) => {
    if (role === "candidate") {
      setEmail("candidate@gmail.com");
      setPassword("candidate123");
      setActiveTab("candidate");
    } else if (role === "employer") {
      setEmail("employer@gmail.com");
      setPassword("employer123");
      setActiveTab("employer");
    } else {
      setEmail("admin@gmail.com");
      setPassword("admin123");
      setActiveTab("admin");
    }
  };

  return (
    <div className="flex flex-1 min-h-screen bg-gradient-to-br from-ice-blue to-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center justify-center p-6 sm:p-12 gap-12">
        
        {/* Left Side: Benefits Column with Large Background Watermark Logo */}
        <div className="flex-1 flex flex-col max-w-xl text-left gap-8 relative py-4">
          
          {/* Large Low-Opacity TITAN Watermark Logo sitting behind the entire text block */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <img
              src="/logo.png"
              alt="TITAN Logo Watermark"
              className="w-full max-w-[460px] h-auto object-contain opacity-[0.10]"
            />
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary-navy leading-tight">
              Welcome to TITAN<br />Job Portal
            </h1>
            <p className="text-sm font-semibold text-text-secondary mt-3 max-w-md leading-relaxed">
              Find the best opportunities, build your career, and grow with top-tier companies across Pakistan.
            </p>
          </div>

          {/* Core Perks */}
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-ice-blue/90 border border-ice-blue-dark/50 text-primary-navy flex-shrink-0 backdrop-blur-xs">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-navy">Thousands of Jobs</h4>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  Explore jobs from leading companies hiring right now.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-ice-blue/90 border border-ice-blue-dark/50 text-primary-navy flex-shrink-0 backdrop-blur-xs">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-navy">AI Powered Matching</h4>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  Get personalized recommendations matched directly to your skill rating.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-ice-blue/90 border border-ice-blue-dark/50 text-primary-navy flex-shrink-0 backdrop-blur-xs">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-navy">Career Growth</h4>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  Utilize AI-driven CV building and interview prep tools to land your dream role.
                </p>
              </div>
            </div>
          </div>

          {/* Quick-Fill Demo Credentials */}
          <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-2.5 shadow-xs relative z-10">
            <span className="text-xs font-bold text-primary-navy">Quick-Fill Demo Credentials:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => autofillDemo("candidate")}
                className="px-3 py-1.5 rounded-lg bg-primary-navy text-white font-extrabold text-[10px] uppercase tracking-wider hover:bg-primary-navy-light cursor-pointer transition-colors shadow-2xs"
              >
                Candidate Autofill
              </button>
              <button
                type="button"
                onClick={() => autofillDemo("employer")}
                className="px-3 py-1.5 rounded-lg bg-primary-navy-light text-white font-extrabold text-[10px] uppercase tracking-wider hover:bg-primary-navy cursor-pointer transition-colors shadow-2xs"
              >
                Employer Autofill
              </button>
              <button
                type="button"
                onClick={() => autofillDemo("admin")}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider hover:bg-slate-700 cursor-pointer transition-colors shadow-2xs"
              >
                Admin Autofill
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="w-full max-w-lg bg-white border border-border-color rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-primary-navy">Welcome Back!</h2>
              <p className="text-xs font-semibold text-text-secondary mt-1">Sign in to your account and continue</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-navy text-[10px] font-bold text-white border border-primary-navy">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
              <span>Secure Login</span>
            </div>
          </div>

          {/* Role selector Tabs */}
          <Tabs
            options={[
              { id: "candidate", label: "Candidate Login" },
              { id: "employer", label: "Employer Login" },
              { id: "admin", label: "Administrator Login" },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
            variant="capsule"
          />

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              icon={<Mail className="h-4 w-4" />}
              autoComplete="username email"
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon={<KeyRound className="h-4 w-4" />}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[38px] text-text-muted hover:text-text-primary focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-primary-navy focus:ring-primary-navy h-4 w-4"
                />
                Remember me
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-semibold text-primary-navy hover:text-primary-navy-light transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 mt-2 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs"
              isLoading={isLoading}
            >
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Registration Redirect Footer */}
          <div className="flex justify-center border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-text-secondary">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary-navy hover:text-primary-navy-light font-extrabold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
