import * as React from "react";
import { cn } from "./utils";

// ==========================================
// BUTTON COMPONENT
// ==========================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "loading";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-50 disabled:pointer-events-none active:scale-98",
          // Variants
          variant === "primary" && "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10",
          variant === "secondary" && "bg-slate-100 text-slate-900 hover:bg-slate-200",
          variant === "outline" && "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
          variant === "ghost" && "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/10",
          variant === "loading" && "bg-indigo-600/70 text-white cursor-wait",
          // Sizes
          size === "sm" && "text-xs px-3 py-1.5",
          size === "md" && "text-sm px-4 py-2",
          size === "lg" && "text-base px-6 py-3",
          size === "icon" && "p-2",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Please wait...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

// ==========================================
// INPUT COMPONENT
// ==========================================
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-600 select-none">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full px-3.5 py-2 text-sm border rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-indigo-500",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ==========================================
// CARD COMPONENT
// ==========================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, glass = false, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200",
        glass && "bg-white/80 backdrop-blur-md border-white/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// ==========================================
// BADGE COMPONENT
// ==========================================
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "primary", children, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold select-none",
        variant === "primary" && "bg-indigo-50 text-indigo-700 border border-indigo-100",
        variant === "secondary" && "bg-slate-100 text-slate-700 border border-slate-200",
        variant === "success" && "bg-emerald-50 text-emerald-700 border border-emerald-100",
        variant === "warning" && "bg-amber-50 text-amber-700 border border-amber-100",
        variant === "danger" && "bg-red-50 text-red-700 border border-red-100",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
