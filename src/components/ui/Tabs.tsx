"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface TabOption {
  id: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "underline" | "capsule";
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  activeId,
  onChange,
  className,
  variant = "capsule",
}) => {
  return (
    <div
      className={cn(
        "flex p-1 gap-1 items-center select-none",
        variant === "capsule" && "bg-ice-blue rounded-xl",
        variant === "underline" && "border-b border-border-color",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex-1 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors focus:outline-none cursor-pointer text-center flex items-center justify-center",
              variant === "capsule" &&
                (isActive ? "text-white font-black" : "text-text-secondary hover:text-primary-navy"),
              variant === "underline" &&
                "pb-3 rounded-none border-b-2 border-transparent",
              variant === "underline" &&
                (isActive ? "text-primary-navy font-black" : "text-text-secondary hover:text-primary-navy")
            )}
          >
            {isActive && variant === "capsule" && (
              <motion.div
                layoutId="active-tab-capsule"
                className="absolute inset-0 bg-primary-navy rounded-lg shadow-sm border border-primary-navy z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {isActive && variant === "underline" && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-navy z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-center w-full block">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
