"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAiChatStore } from "@/store/useAiChatStore";
import { useUserStore } from "@/store/useUserStore";
import { useJobStore } from "@/store/useJobStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  Sparkles,
  Send,
  Cpu,
  MapPin,
  TrendingUp,
  Award,
  ChevronRight,
  UserCheck,
  Zap,
  Target,
  ArrowRight,
  BookOpen,
  Lock
} from "lucide-react";

export default function CareerAssistantPage() {
  const { messages, sendMessage, isAiTyping, initSession } = useAiChatStore();
  const { user, isAuthenticated } = useUserStore();
  const { jobs } = useJobStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session whenever user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      initSession(user.id, user.role, user.name);
    } else {
      initSession("", "", "");
    }
  }, [user, isAuthenticated]);

  const aiMessages = messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (isAuthenticated && user) {
      sendMessage(inputText.trim(), user.id, user.role, user.name);
    }
    setInputText("");
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isAuthenticated && user) {
      sendMessage(prompt, user.id, user.role, user.name);
    }
  };

  const suggestedPrompts = [
    "Find Jobs",
    "Improve Resume",
    "Resume ATS Score",
    "Interview Tips",
    "Career Roadmap",
    "Salary Advice",
    "Certifications",
    "Skill Assessment"
  ];

  const getInitials = (nameString: string) => {
    if (!nameString) return "US";
    return nameString.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  if (!isAuthenticated || !user || user.role !== "candidate") {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white border border-border-color rounded-2xl shadow-sm max-w-xl mx-auto my-12 text-left">
        <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-primary-navy mb-4">
          <Lock className="h-8 w-8 text-primary-navy" />
        </div>
        <div className="flex flex-col gap-1.5 text-center">
          <h2 className="text-sm font-black text-primary-navy uppercase tracking-wider">Candidate Access Only</h2>
          <p className="text-xs text-text-muted leading-relaxed font-semibold">
            The AI Career Assistant is strictly restricted to Candidate Profiles only. Administrators and Employers do not have access to candidate tools.
          </p>
        </div>
      </div>
    );
  }

  // Mock skills gap data compared with standard Senior Frontend criteria
  const skillsGap = [
    { name: "React.js / Next.js", current: 85, required: 95 },
    { name: "TypeScript", current: 80, required: 90 },
    { name: "System Design", current: 50, required: 80 },
    { name: "Docker / CI/CD", current: 30, required: 70 },
  ];

  // Career Roadmap
  const roadmapSteps = [
    { title: "Frontend Basics (HTML/CSS/JS)", desc: "Completed & Verified", status: "completed" },
    { title: "React & State Management (Zustand)", desc: "Completed & Active badge", status: "completed" },
    { title: "Next.js & Server Components", desc: "In Progress (Add to profile)", status: "current" },
    { title: "Micro-frontends & System Design", desc: "Future Target Milestone", status: "upcoming" },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <span>Interactive Advisor</span>
        </span>
        <h1 className="text-2xl font-black text-primary-navy mt-2">AI Career Assistant</h1>
        <p className="text-xs font-semibold text-text-muted mt-1">
          Plan your milestones, analyze tech skills gap indicators, and chat with our AI advisor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chat Workspace */}
        <div className="lg:col-span-7 bg-white border border-border-color rounded-2xl shadow-sm flex flex-col h-[520px] overflow-hidden">
          
          <div className="p-4 border-b border-border-color bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy flex items-center gap-2">
              <Cpu className="h-4.5 w-4.5 text-primary-navy animate-pulse-slow" />
              <span>AI Career Assistant Chat</span>
            </h3>
            <span className="text-[9px] font-bold text-primary-navy bg-primary-navy/10 border border-primary-navy/20 px-2 py-0.5 rounded uppercase tracking-wider">
              Connected
            </span>
          </div>

          {/* Conversation history area */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-slate-50/20">
            {aiMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3 select-none">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-primary-navy">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1 max-w-xs">
                  <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider">AI Career Assistant</h4>
                  <p className="text-[11px] text-text-muted font-medium leading-relaxed">
                    Ask questions about your resume, career roadmap, salary insights, or interview preparation to start a conversation.
                  </p>
                </div>
              </div>
            ) : (
              aiMessages.map((msg) => {
                const isUser = !msg.isAi;
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3 max-w-[80%]",
                      isUser ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 select-none",
                        isUser
                          ? "bg-primary-navy text-white"
                          : "bg-ice-blue border border-border-color text-primary-navy font-bold"
                      )}
                    >
                      {isUser ? getInitials(user.name) : "AI"}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div
                        className={cn(
                          "p-3 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm",
                          isUser
                            ? "bg-primary-navy text-white rounded-tr-none"
                            : "bg-white border border-border-color text-text-primary rounded-tl-none"
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {isAiTyping && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="h-8 w-8 rounded-lg bg-ice-blue border border-border-color text-primary-navy font-bold text-xs flex items-center justify-center flex-shrink-0 select-none">
                  AI
                </div>
                <div className="bg-white border border-border-color p-3.5 rounded-2xl rounded-tl-none text-xs text-text-muted flex items-center gap-1 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested quick Prompts */}
          {aiMessages.length < 3 && (
            <div className="p-3 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-[9px] font-extrabold text-text-secondary hover:text-primary-navy bg-ice-blue hover:bg-ice-blue-dark px-2.5 py-1.5 rounded-lg border border-ice-blue-dark/50 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Form sender */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-border-color flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for resume optimization tips, salary checks..."
              className="flex-grow px-4 py-3 bg-slate-50 border border-border-color rounded-xl text-xs focus:outline-none focus:border-primary-navy focus:bg-white transition-all placeholder:text-text-muted text-text-primary"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAiTyping}
              className="h-10 w-10 rounded-xl bg-primary-navy hover:bg-primary-navy-light disabled:opacity-50 text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>

        </div>

        {/* Right Column: Roadmap, Skills Gap */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Career Roadmap Timeline */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2 flex items-center gap-1.5">
              <Target className="h-4.5 w-4.5 text-gold" />
              <span>Career Roadmap</span>
            </h3>

            <div className="flex flex-col gap-4.5 relative pl-1">
              {roadmapSteps.map((step, i) => (
                <div key={i} className="flex gap-4 items-start relative">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className={cn(
                      "h-4 w-4 rounded-full border-2 flex items-center justify-center text-[8px] font-black z-10",
                      step.status === "completed" && "bg-emerald-50 border-emerald-500 text-emerald-500",
                      step.status === "current" && "bg-primary-navy border-primary-navy text-white animate-pulse",
                      step.status === "upcoming" && "bg-white border-slate-300 text-slate-300"
                    )}>
                      {step.status === "completed" ? "✓" : i + 1}
                    </span>
                    {i < roadmapSteps.length - 1 && (
                      <span className="w-0.5 h-10 bg-slate-100 absolute top-4 left-2" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-primary-navy leading-none">{step.title}</h5>
                    <p className="text-[9px] text-text-muted mt-1 leading-none font-semibold">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Gap Analysis */}
          <div className="bg-white border border-border-color rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy border-b border-slate-50 pb-2 flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-primary-navy" />
              <span>Skills Gap Analysis</span>
            </h3>

            <div className="flex flex-col gap-3.5">
              {skillsGap.map((item) => (
                <div key={item.name} className="flex flex-col gap-1.5 text-xs font-semibold text-text-secondary">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-extrabold text-primary-navy">{item.name}</span>
                    <span className="font-black text-primary-navy">
                      {item.current}% <span className="text-text-muted">/ {item.required}% Req</span>
                    </span>
                  </div>
                  
                  {/* Progress bars representing current vs target overlay */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary-navy rounded-full z-10"
                      style={{ width: `${item.current}%` }}
                    />
                    <div
                      className="absolute top-0 left-0 h-full bg-slate-200 rounded-full"
                      style={{ width: `${item.required}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
