"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import { Search, Bell, Sparkles, UserCheck, Mail, Clock, ShieldCheck } from "lucide-react";

interface RecruiterNotification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  category: "application" | "interview" | "message" | "recommendation";
  time: string;
}

export default function EmployerNotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [notifications, setNotifications] = useState<RecruiterNotification[]>([
    { id: "en-1", title: "New Job Application", description: "Ahmad Raza applied for Senior Frontend Developer.", read: false, category: "application", time: "2 hours ago" },
    { id: "en-2", title: "Interview Confirmation", description: "Ahmad Raza accepted the interview scheduled for Friday.", read: true, category: "interview", time: "5 hours ago" },
    { id: "en-3", title: "Prospect Message Received", description: "New candidate message from Fatima Shah.", read: false, category: "message", time: "1 day ago" },
    { id: "en-4", title: "AI Hiring Recommendation", description: "AI matchmaker found 5 high-compatibility prospects for UI/UX role.", read: false, category: "recommendation", time: "2 days ago" }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success("Notification marked as read.");
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  };

  const filteredNotifs = notifications.filter((notif) => {
    const matchesSearch = 
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || notif.category === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-primary-navy">Recruiter Alerts Center</h1>
          <p className="text-xs font-semibold text-text-muted mt-1">
            Track candidate actions, interview milestones, and automated matching updates.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="font-bold uppercase tracking-wider text-xs border-primary-navy/15 text-primary-navy hover:bg-ice-blue"
          onClick={handleMarkAllRead}
        >
          Mark all read
        </Button>
      </div>

      {/* Spacing & Filters controls */}
      <div className="bg-white border border-border-color p-4.5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-full text-xs"
          />
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-1.5 items-center justify-start md:justify-end">
          {["All", "Application", "Interview", "Message", "Recommendation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[9px] font-extrabold transition-all border uppercase tracking-wider cursor-pointer whitespace-nowrap",
                activeTab === tab
                  ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-text-secondary hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      {/* Alerts listings */}
      {filteredNotifs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "bg-white border border-border-color rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-5 relative overflow-hidden",
                !notif.read && "border-l-4 border-l-primary-navy pl-4.5"
              )}
            >
              <div className="flex gap-4 items-start min-w-0 flex-1 pr-6">
                <div className="h-9 w-9 rounded-lg bg-ice-blue border border-border-color text-primary-navy flex items-center justify-center flex-shrink-0">
                  {notif.category === "application" && <UserCheck className="h-5 w-5 text-indigo-600" />}
                  {notif.category === "interview" && <Clock className="h-5 w-5 text-indigo-600" />}
                  {notif.category === "message" && <Mail className="h-5 w-5 text-indigo-600" />}
                  {notif.category === "recommendation" && <Sparkles className="h-5 w-5 text-gold animate-pulse-slow" />}
                </div>

                <div className="min-w-0 flex-grow">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className={cn("text-xs font-bold text-primary-navy truncate", !notif.read && "font-black")}>
                      {notif.title}
                    </h3>
                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider flex-shrink-0 leading-none">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary mt-1 font-semibold leading-relaxed">
                    {notif.description}
                  </p>
                </div>
              </div>

              {!notif.read && (
                <button
                  onClick={() => handleMarkAsRead(notif.id)}
                  className="px-2 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[8px] font-black uppercase tracking-wider text-text-secondary cursor-pointer"
                >
                  Read
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border-color rounded-2xl p-16 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl text-text-muted">
            <Bell className="h-6 w-6 text-text-muted" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-primary-navy">No Alerts Found</h3>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              We couldn't find any notifications matching your query.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
