"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn"; // we will create this simple helper in a moment

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-navy-light focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary: "bg-primary-navy text-white hover:bg-primary-navy-dark active:scale-95 border border-primary-navy shadow-sm",
      secondary: "bg-white text-primary-navy hover:bg-slate-50 active:scale-95 border border-primary-navy font-bold shadow-2xs",
      outline: "border border-slate-300 bg-white text-primary-navy hover:bg-slate-50 active:scale-95 shadow-2xs font-semibold",
      ghost: "text-primary-navy hover:bg-slate-100 active:scale-95 rounded-lg",
      gold: "bg-primary-navy text-white font-extrabold uppercase tracking-wider hover:bg-primary-navy-dark shadow-sm active:scale-95 border border-primary-navy",
      danger: "bg-primary-navy-dark text-white hover:bg-primary-navy border border-primary-navy active:scale-95",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...(props as any)}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
