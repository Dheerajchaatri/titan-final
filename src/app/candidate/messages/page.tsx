"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRecruiterChatStore } from "@/store/useRecruiterChatStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { Send, Search, Check, CheckCheck, MessageSquare } from "lucide-react";
import { cn } from "@/utils/cn";

export default function CandidateMessagesPage() {
  const { messages, sendMessage } = useRecruiterChatStore();
  const { user } = useUserStore();
  
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Active thread selection
  const [activeRecruiterId, setActiveRecruiterId] = useState("emp-1");

  const recruiters = [
    { id: "emp-1", name: "Sarah Khan", company: "Systems Limited", logo: "SL", online: true },
    { id: "ns-recruiter", name: "Imran Ahmed", company: "NetSol Technologies", logo: "NS", online: false },
    { id: "trg-recruiter", name: "Fatima Shah", company: "TRG Pakistan", logo: "TRG", online: true },
  ];

  const currentRecruiter = recruiters.find(r => r.id === activeRecruiterId) || recruiters[0];

  // Filter contacts based on search query
  const filteredRecruiters = recruiters.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter messages for active thread (exclude AI assistant logs)
  const chatMessages = messages.filter(
    (m) => !m.isAi && (
      m.senderId === activeRecruiterId || 
      (m.senderId === "cand-1" && ((m as any).recipientId === activeRecruiterId || (!(m as any).recipientId && activeRecruiterId === "emp-1")))
    )
  );

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeRecruiterId]);

  // Mark active contact's messages as read on click
  useEffect(() => {
    if (activeRecruiterId) {
      useRecruiterChatStore.setState((state) => ({
        messages: state.messages.map((m) =>
          m.senderId === activeRecruiterId ? { ...m, isRead: true } : m
        ),
      }));
    }
  }, [activeRecruiterId, messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText.trim(), activeRecruiterId, currentRecruiter.name, currentRecruiter.company);
    setInputText("");
  };

  // Thread helpers
  const getUnreadCount = (recId: string) => {
    return messages.filter(m => m.senderId === recId && !m.isRead && !m.isAi).length;
  };

  const getLastMessage = (recId: string) => {
    const threadMsgs = messages.filter(m => !m.isAi && (m.senderId === recId || (m.senderId === "cand-1" && ((m as any).recipientId === recId || (!(m as any).recipientId && recId === "emp-1")))));
    return threadMsgs[threadMsgs.length - 1];
  };

  return (
    <div className="bg-white border border-border-color rounded-2xl shadow-sm overflow-hidden flex h-[calc(100vh-160px)]">
      
      {/* Left Sidebar: Conversational List */}
      <div className="w-1/3 border-r border-border-color flex flex-col bg-slate-50/20">
        
        {/* Search header bar */}
        <div className="p-4.5 border-b border-border-color flex flex-col gap-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Conversations</h3>
          <div className="relative">
            <Input
              placeholder="Search chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="w-full text-xs"
            />
          </div>
        </div>

        {/* Recruiter threads items list */}
        <div className="flex-grow overflow-y-auto divide-y divide-slate-100/60">
          {filteredRecruiters.length > 0 ? (
            filteredRecruiters.map((rec) => {
              const isSelected = rec.id === activeRecruiterId;
              const lastMsg = getLastMessage(rec.id);
              const unreadCount = getUnreadCount(rec.id);
              
              return (
                <button
                  key={rec.id}
                  onClick={() => setActiveRecruiterId(rec.id)}
                  className={cn(
                    "w-full p-4.5 flex gap-3.5 items-start text-left hover:bg-slate-50 transition-all duration-150 focus:outline-none cursor-pointer relative",
                    isSelected && "bg-ice-blue/60 border-l-4 border-l-primary-navy pl-3.5"
                  )}
                >
                  {/* Recruiter Logo Avatar */}
                  <div className="h-10 w-10 rounded-xl bg-white border border-border-color text-primary-navy font-black text-xs flex items-center justify-center flex-shrink-0 relative shadow-sm">
                    {rec.logo}
                    {rec.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  {/* Thread summary labels */}
                  <div className="flex-1 min-w-0 pr-5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-primary-navy truncate leading-none">{rec.name}</h4>
                      {lastMsg && (
                        <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider leading-none ml-2">
                          {lastMsg.timestamp}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-text-muted mt-1 leading-none font-semibold truncate">{rec.company}</p>
                    {lastMsg && (
                      <p className={cn(
                        "text-[10px] text-text-secondary mt-2.5 leading-tight font-medium truncate",
                        unreadCount > 0 && "font-black text-primary-navy"
                      )}>
                        {lastMsg.senderId === "cand-1" ? "You: " : ""}{lastMsg.text}
                      </p>
                    )}
                  </div>

                  {/* Unread Pill indicator */}
                  {unreadCount > 0 && (
                    <span className="absolute right-4.5 top-1/2 -translate-y-1/2 h-5 min-w-5 px-1.5 rounded-full bg-rose-500 text-[9px] font-black text-white flex items-center justify-center shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-text-muted text-xs font-semibold">No contacts found</div>
          )}
        </div>
      </div>

      {/* Right Pane: Conversational Chat Logs */}
      <div className="flex-1 flex flex-col bg-slate-50/10">
        
        {/* Active Contact Header */}
        <div className="p-4 border-b border-border-color bg-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-ice-blue border border-border-color text-primary-navy font-black text-xs flex items-center justify-center flex-shrink-0">
              {currentRecruiter.logo}
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary-navy leading-none">{currentRecruiter.name}</h4>
              <div className="flex items-center gap-1 mt-1 leading-none">
                <span className={cn("h-1.5 w-1.5 rounded-full", currentRecruiter.online ? "bg-emerald-500" : "bg-slate-400")} />
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">
                  {currentRecruiter.online ? "Online" : "Away"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Logs scroll container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xl text-text-muted">
                💬
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs font-black text-primary-navy">Conversation Started</h4>
                <p className="text-[10px] text-text-muted max-w-xs leading-relaxed font-semibold">
                  Send a message to introduce yourself to {currentRecruiter.name} at {currentRecruiter.company}.
                </p>
              </div>
            </div>
          ) : (
            chatMessages.map((msg) => {
              const isUser = msg.senderId === "cand-1";
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3 max-w-[75%]",
                    isUser ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {/* Sender Letter Indicator */}
                  <div className="h-7 w-7 rounded-lg bg-white border border-slate-200 text-primary-navy text-[9px] font-black flex items-center justify-center flex-shrink-0 shadow-sm select-none">
                    {isUser ? "AR" : currentRecruiter.logo}
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
                    
                    <div className={cn("flex items-center gap-1 mt-1 text-[8px] font-bold text-text-muted uppercase tracking-wider", isUser ? "justify-end" : "justify-start")}>
                      <span>{msg.timestamp}</span>
                      {isUser && (
                        msg.isRead ? <CheckCheck className="h-3 w-3 text-emerald-500" /> : <Check className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box form */}
        <form onSubmit={handleSend} className="p-4 border-t border-border-color bg-white flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${currentRecruiter.name}...`}
            className="flex-grow px-4 py-3 bg-slate-50 border border-border-color rounded-xl text-xs focus:outline-none focus:border-primary-navy focus:bg-white transition-all placeholder:text-text-muted text-text-primary font-semibold"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="h-10 w-10 rounded-xl bg-primary-navy hover:bg-primary-navy-light text-white flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer flex-shrink-0"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
