"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAiChatStore } from "@/store/useAiChatStore";
import { useUserStore } from "@/store/useUserStore";
import { MessageSquare, Sparkles, X, Send, Cpu, Lock } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const ChatWidget: React.FC = () => {
  const { user, isAuthenticated } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, isAiTyping, initSession } = useAiChatStore();

  const isRecruiter = user?.role === "employer";

  // Initialize session whenever user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      initSession(user.id, user.role, user.name);
    } else {
      initSession("", "", "");
    }
  }, [user, isAuthenticated]);

  const aiMessages = messages.slice(-30); // Keep last 30 for performance

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, aiMessages, isAiTyping]);

  // If user is administrator, completely hide the chat widget from the viewport (placed after all hooks)
  if (user?.role === "admin") return null;

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText.trim(), user?.id || "", user?.role || "", user?.name || "");
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const quickPrompts = isRecruiter 
    ? [
        "Create Job Post",
        "Find Candidates",
        "AI Candidate Match",
        "Screen Resumes",
        "Interview Questions",
        "Hiring Analytics",
        "Recruitment Pipeline",
        "Employer Branding"
      ]
    : [
        "Find Jobs",
        "Improve Resume",
        "Resume ATS Score",
        "Interview Tips",
        "Career Roadmap",
        "Salary Advice",
        "Certifications",
        "Skill Assessment"
      ];

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt, user?.id || "", user?.role || "", user?.name || "");
  };

  const getInitials = (nameString: string) => {
    if (!nameString) return "US";
    return nameString.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-80 sm:w-96 h-[480px] bg-white rounded-2xl border border-border-color shadow-2xl overflow-hidden flex flex-col mb-4 glass-panel"
          >
            {/* Header */}
            <div className="bg-primary-navy p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center p-1.5 flex-shrink-0">
                  <img src="/logo.png" alt="TITAN Logo" className="h-full w-auto object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">
                    {isAuthenticated && user ? (isRecruiter ? "TITAN AI Hiring Assistant" : "TITAN AI Assistant") : "TITAN AI Assistant"}
                  </h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online & Ready
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Switch: Authenticated vs Lock State */}
            {!isAuthenticated || !user ? (
              /* Lock Screen Empty State */
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 border border-slate-200/50 flex items-center justify-center text-text-muted mb-4 shadow-sm">
                  <Lock className="h-6 w-6 text-primary-navy" />
                </div>
                <h4 className="text-sm font-black text-primary-navy uppercase tracking-wider">Login Required</h4>
                <p className="text-[11px] text-text-muted mt-2 max-w-[220px] font-semibold leading-relaxed">
                  Please sign in to access your personalized TITAN AI Assistant.
                </p>
                <Link href="/auth/login" className="w-full mt-5">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full uppercase font-bold tracking-wider py-2.5"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              /* Active Chat Area */
              <>
                {/* Message Area */}
                <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                  {aiMessages.map((msg) => {
                    const isUser = !msg.isAi;
                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-2.5 max-w-[85%]",
                          isUser ? "ml-auto flex-row-reverse" : ""
                        )}
                      >
                        <div
                          className={cn(
                            "h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 select-none",
                            isUser
                              ? "bg-gold text-primary-navy-dark"
                              : "bg-ice-blue border border-border-color text-primary-navy"
                          )}
                        >
                          {isUser ? getInitials(user.name) : "AI"}
                        </div>
                        <div
                          className={cn(
                            "p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-sm",
                            isUser
                              ? "bg-primary-navy text-white rounded-tr-none"
                              : "bg-white border border-border-color text-text-primary rounded-tl-none"
                          )}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {isAiTyping && (
                    <div className="flex gap-2.5 max-w-[85%]">
                      <div className="h-7 w-7 rounded-lg bg-ice-blue border border-border-color flex items-center justify-center text-primary-navy font-bold text-xs flex-shrink-0 select-none">
                        AI
                      </div>
                      <div className="bg-white border border-border-color p-3 rounded-2xl rounded-tl-none text-xs text-text-muted flex items-center gap-1 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Suggestions */}
                {aiMessages.length < 2 && (
                  <div className="p-3 bg-white border-t border-border-color flex flex-wrap gap-1.5">
                    {quickPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleQuickPrompt(p)}
                        className="text-[10px] font-bold text-text-secondary hover:text-primary-navy bg-ice-blue hover:bg-ice-blue-dark px-2.5 py-1.5 rounded-lg border border-ice-blue-dark/50 transition-colors text-left"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Footer */}
                <div className="p-3 border-t border-border-color bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask AI anything..."
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-border-color rounded-xl text-xs focus:outline-none focus:border-primary-navy focus:bg-white transition-all placeholder:text-text-muted text-text-primary"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim() || isAiTyping}
                    className="h-9 w-9 rounded-xl bg-primary-navy hover:bg-primary-navy-light disabled:opacity-50 text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4.5 py-3 rounded-full bg-gradient-to-r from-primary-navy to-primary-navy-light text-white font-extrabold text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl transition-shadow duration-300 focus:outline-none select-none cursor-pointer border border-primary-navy-light/10"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
        </span>
        <Sparkles className="h-4 w-4 text-gold" />
        <span>{isAuthenticated && user && isRecruiter ? "AI Hiring Assistant" : "AI Career Assistant"}</span>
      </motion.button>

    </div>
  );
};
