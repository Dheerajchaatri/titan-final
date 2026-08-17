"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore, UserRole } from "@/store/useUserStore";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Mail, User, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useUserStore();
  const [activeTab, setActiveTab] = useState<string>("candidate");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const success = await register(name, email, activeTab as UserRole);
      if (success) {
        toast.success(`Account created successfully! Welcome to TITAN.`);
        router.push(activeTab === "candidate" ? "/candidate/dashboard" : "/employer/dashboard");
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-1 min-h-screen bg-gradient-to-br from-ice-blue to-white items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-lg bg-white border border-border-color rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center">
          <Link href="/" className="mb-2">
            <img src="/logo.png" alt="TITAN Logo" className="h-14 w-auto object-contain" />
          </Link>
          <h2 className="text-2xl font-black tracking-tight text-primary-navy">Create Your Account</h2>
          <p className="text-xs font-semibold text-text-secondary">Join TITAN and start exploring career growth</p>
        </div>

        {/* Role Tabs */}
        <Tabs
          options={[
            { id: "candidate", label: "Candidate" },
            { id: "employer", label: "Employer" },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id)}
          variant="capsule"
          className="w-full text-center justify-center"
        />

        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ahmad Raza"
            icon={<User className="h-4 w-4" />}
            required
          />

          <Input
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            icon={<Mail className="h-4 w-4" />}
            required
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a strong password"
            icon={<Lock className="h-4 w-4" />}
            required
          />

          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Verify your password"
            icon={<Lock className="h-4 w-4" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 mt-2 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs"
            isLoading={isLoading}
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="text-center text-xs font-semibold text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary-navy hover:text-primary-navy-light font-extrabold"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
