"use client";

import React, { createRef } from "react";
import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/utils/cn";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type, duration = 3000) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

export const toast = {
  success: (msg: string, duration?: number) => useToastStore.getState().addToast(msg, "success", duration),
  error: (msg: string, duration?: number) => useToastStore.getState().addToast(msg, "error", duration),
  info: (msg: string, duration?: number) => useToastStore.getState().addToast(msg, "info", duration),
  warning: (msg: string, duration?: number) => useToastStore.getState().addToast(msg, "warning", duration),
};

export const ToastProvider: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-rose-500" />,
    info: <Info className="h-5 w-5 text-sky-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  };

  const borders = {
    success: "border-emerald-100 bg-emerald-50/50",
    error: "border-rose-100 bg-rose-50/50",
    info: "border-sky-100 bg-sky-50/50",
    warning: "border-amber-100 bg-amber-50/50",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg pointer-events-auto",
              borders[t.type]
            )}
          >
            <div className="flex-shrink-0 mt-0.5">{icons[t.type]}</div>
            <div className="flex-1 text-sm font-semibold text-text-primary leading-snug">
              {t.message}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="flex-shrink-0 text-text-muted hover:text-text-primary p-0.5 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
