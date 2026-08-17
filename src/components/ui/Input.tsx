import React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, icon, iconPosition = "left", helperText, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3.5 text-text-muted select-none pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white/45 backdrop-blur-md border-white/40 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-navy-light/30 focus:border-primary-navy-light transition-all shadow-inner",
              icon && iconPosition === "left" && "pl-11",
              icon && iconPosition === "right" && "pr-11",
              error && "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500",
              className
            )}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="absolute right-3.5 text-text-muted select-none pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        {error && <span className="text-xs font-medium text-rose-500">{error}</span>}
        {helperText && !error && <span className="text-xs text-text-muted">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
