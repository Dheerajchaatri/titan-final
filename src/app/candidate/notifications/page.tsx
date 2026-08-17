"use client";

import React, { useState } from "react";
import { useChatStore, AppNotification } from "@/store/useChatStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/utils/cn";
import {
  Bell,
  Search,
  Check,
  CheckCheck,
  Trash2,
  Briefcase,
  MessageSquare,
  AlertTriangle,
  Info,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
  } = useChatStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "unread" | "application" | "message" | "alert" | "system">("all");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "application":
        return <Briefcase className="h-4.5 w-4.5 text-blue-500" />;
      case "message":
        return <MessageSquare className="h-4.5 w-4.5 text-gold-dark" />;
      case "alert":
        return <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />;
      case "system":
      default:
        return <Info className="h-4.5 w-4.5 text-indigo-500" />;
    }
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();
    toast.success("All notifications marked as read.");
  };

  const handleDelete = (id: string, title: string) => {
    deleteNotification(id);
    toast.success(`Deleted notification: "${title.substring(0, 20)}..."`);
  };

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (activeCategory === "unread") {
      matchesCategory = !n.read;
    } else if (activeCategory !== "all") {
      matchesCategory = n.category === activeCategory;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-navy/5 text-xs font-bold text-primary-navy border border-primary-navy/10 self-start">
            <Bell className="h-3.5 w-3.5 text-gold" />
            <span>Alert Center</span>
          </span>
          <h1 className="text-2xl font-black text-primary-navy mt-2">Notifications</h1>
          <p className="text-xs font-semibold text-text-muted mt-1">
            Manage your inbox alerts, system logs, and job application pipeline matches.
          </p>
        </div>

        {notifications.some(n => !n.read) && (
          <Button
            variant="outline"
            size="sm"
            className="font-bold uppercase tracking-wider text-[10px] border-primary-navy/15 text-primary-navy hover:bg-ice-blue flex items-center gap-1.5 self-start sm:self-auto py-2.5 px-4 cursor-pointer"
            onClick={handleMarkAllRead}
          >
            <CheckCheck className="h-4 w-4" />
            <span>Mark All as Read</span>
          </Button>
        )}
      </div>

      {/* Filters & Search Control Grid */}
      <div className="bg-white border border-border-color p-4.5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-full"
          />
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end items-center w-full sm:w-auto">
          {(["all", "unread", "application", "message", "alert", "system"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all border uppercase tracking-wider cursor-pointer whitespace-nowrap",
                activeCategory === cat
                  ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-text-secondary hover:bg-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Notifications Inbox log list */}
      {filteredNotifications.length > 0 ? (
        <div className="bg-white border border-border-color rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && markNotificationAsRead(notif.id)}
              className={cn(
                "p-5 flex gap-4 transition-colors group relative select-none",
                notif.read ? "bg-white hover:bg-slate-50/50" : "bg-ice-blue/30 hover:bg-ice-blue/50 cursor-pointer"
              )}
            >
              {/* Category indicator circle icon */}
              <div className="h-10 w-10 rounded-xl bg-white border border-border-color/60 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {getCategoryIcon(notif.category)}
              </div>

              {/* Text Description */}
              <div className="flex-grow min-w-0 pr-16 sm:pr-24">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className={cn(
                    "text-xs font-bold leading-snug",
                    notif.read ? "text-primary-navy" : "text-primary-navy font-black"
                  )}>
                    {notif.title}
                  </h4>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-blue-600 inline-block flex-shrink-0" title="Unread Alert" />
                  )}
                </div>
                
                <p className="text-[11px] text-text-secondary leading-relaxed font-semibold mt-1">
                  {notif.description}
                </p>
                
                <div className="flex items-center gap-3.5 text-[8px] font-bold text-text-muted uppercase tracking-wider mt-2.5">
                  <span>⏱️ {notif.timestamp}</span>
                  <span className="text-text-muted font-bold">Category: {notif.category}</span>
                </div>
              </div>

              {/* Inline action tools */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {notif.link && (
                  <Link
                    href={notif.link}
                    className="p-2 rounded-lg bg-white border border-border-color hover:border-primary-navy text-primary-navy hover:bg-ice-blue shadow-sm transition-colors cursor-pointer"
                    title="View details link"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid triggering read click handler
                    handleDelete(notif.id, notif.title);
                  }}
                  className="p-2 rounded-lg bg-white border border-border-color hover:border-rose-300 text-text-muted hover:text-rose-500 shadow-sm transition-colors cursor-pointer"
                  title="Delete alert log"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-border-color rounded-2xl p-16 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl text-text-muted">
            📭
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-primary-navy">All Clear!</h3>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              You don't have any notifications matching this filter list. Check back later for pipeline updates!
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-bold uppercase tracking-wider text-xs border-primary-navy/15 text-primary-navy mt-1"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

    </div>
  );
}
