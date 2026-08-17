"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRecruiterChatStore, ChatMessage } from "@/store/useRecruiterChatStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { Send, Search, Check, CheckCheck } from "lucide-react";
import { cn } from "@/utils/cn";

export default function EmployerMessagesPage() {
  const { messages } = useRecruiterChatStore();
  const { user } = useUserStore();
  
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Active candidate thread selection
  const [activeCandidateId, setActiveCandidateId] = useState("cand-1");

  const candidates = [
    { id: "cand-1", name: "Ahmad Raza", title: "Senior Frontend Developer", logo: "AR", online: true },
    { id: "cand-2", name: "Fatima Shah", title: "UI/UX Product Designer", logo: "FS", online: true },
    { id: "cand-3", name: "Imran Ahmed", title: "AI/ML Solutions Architect", logo: "IA", online: false },
  ];

  const currentCandidate = candidates.find(c => c.id === activeCandidateId) || candidates[0];

  // Filter contacts
  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter messages for active candidate thread
  const chatMessages = messages.filter(
    (m) => !m.isAi && (
      m.senderId === activeCandidateId || 
      (m.senderId === "cand-1" && ((m as any).recipientId === "emp-1" || !(m as any).recipientId)) ||
      (m.senderId === "emp-1" && (m as any).recipientId === activeCandidateId)
    )
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeCandidateId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const messageText = inputText.trim();

    // Create recruiter message with candidate binding metadata
    const newMessage = {
      id: `rec-msg-${Date.now()}`,
      senderId: "emp-1", // Sarah Khan
      senderName: user?.name || "Sarah Khan",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      isAi: false,
    };
    (newMessage as any).recipientId = activeCandidateId;

    useRecruiterChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));

    setInputText("");

    // Simulate Candidate mock reply after 1.5 seconds
    setTimeout(() => {
      const replyMessage = {
        id: `rec-msg-${Date.now() + 1}`,
        senderId: activeCandidateId,
        senderName: currentCandidate.name,
        text: `Thanks for the message! I am highly interested in discussing the opportunity. Let's schedule a call!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        isAi: false,
      };
      (replyMessage as any).recipientId = "emp-1";

      useRecruiterChatStore.setState((state) => ({
        messages: [...state.messages, replyMessage],
      }));

      toast.info(`New message from candidate ${currentCandidate.name}`);
    }, 1500);
  };

  const getUnreadCount = (candId: string) => {
    return messages.filter(m => m.senderId === candId && !m.isRead).length;
  };

  const getLastMessage = (candId: string) => {
    const threadMsgs = messages.filter(m => !m.isAi && (m.senderId === candId || (m.senderId === "emp-1" && (m as any).recipientId === candId)));
    return threadMsgs[threadMsgs.length - 1];
  };

  return (
    <div className="bg-white border border-border-color rounded-2xl shadow-sm overflow-hidden flex h-[calc(100vh-160px)]">
      
      {/* Left Sidebar: Conversational Candidates */}
      <div className="w-1/3 border-r border-border-color flex flex-col bg-slate-50/20">
        
        {/* Search header bar */}
        <div className="p-4.5 border-b border-border-color flex flex-col gap-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary-navy">Candidate Chats</h3>
          <div className="relative">
            <Input
              placeholder="Search candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="w-full text-xs"
            />
          </div>
        </div>

        {/* Candidate threads items list */}
        <div className="flex-grow overflow-y-auto divide-y divide-slate-100/60">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((cand) => {
              const isSelected = cand.id === activeCandidateId;
              const lastMsg = getLastMessage(cand.id);
              const unreadCount = getUnreadCount(cand.id);
              
              return (
                <button
                  key={cand.id}
                  onClick={() => setActiveCandidateId(cand.id)}
                  className={cn(
                    "w-full p-4.5 flex gap-3.5 items-start text-left hover:bg-slate-50 transition-all duration-150 focus:outline-none cursor-pointer relative",
                    isSelected && "bg-ice-blue/60 border-l-4 border-l-primary-navy pl-3.5"
                  )}
                >
                  <div className="h-10 w-10 rounded-xl bg-white border border-border-color text-primary-navy font-black text-xs flex items-center justify-center flex-shrink-0 relative shadow-sm">
                    {cand.logo}
                    {cand.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pr-5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-primary-navy truncate leading-none">{cand.name}</h4>
                      {lastMsg && (
                        <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider leading-none ml-2">
                          {lastMsg.timestamp}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-text-muted mt-1 leading-none font-semibold truncate">{cand.title}</p>
                    {lastMsg && (
                      <p className={cn(
                        "text-[10px] text-text-secondary mt-2.5 leading-tight font-medium truncate",
                        unreadCount > 0 && "font-black text-primary-navy"
                      )}>
                        {lastMsg.senderId === "emp-1" ? "You: " : ""}{lastMsg.text}
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-text-muted text-xs font-semibold">No candidates found</div>
          )}
        </div>
      </div>

      {/* Right Pane: Chat Logs */}
      <div className="flex-1 flex flex-col bg-slate-50/10">
        
        {/* Active Candidate Header */}
        <div className="p-4 border-b border-border-color bg-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-ice-blue border border-border-color text-primary-navy font-black text-xs flex items-center justify-center flex-shrink-0">
              {currentCandidate.logo}
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary-navy leading-none">{currentCandidate.name}</h4>
              <div className="flex items-center gap-1 mt-1 leading-none">
                <span className={cn("h-1.5 w-1.5 rounded-full", currentCandidate.online ? "bg-emerald-500" : "bg-slate-400")} />
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">
                  {currentCandidate.online ? "Online" : "Away"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat scroll container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((msg) => {
            const isUser = msg.senderId === "emp-1";
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 max-w-[75%]",
                  isUser ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className="h-7 w-7 rounded-lg bg-white border border-slate-200 text-primary-navy text-[9px] font-black flex items-center justify-center flex-shrink-0 shadow-sm select-none">
                  {isUser ? "SL" : currentCandidate.logo}
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
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box form */}
        <form onSubmit={handleSend} className="p-4 border-t border-border-color bg-white flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${currentCandidate.name}...`}
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
