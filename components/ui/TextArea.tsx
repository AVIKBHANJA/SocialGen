import React from "react";
import { cn } from "@/utils/cn";

interface TextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  variant = "default",
  size = "md",
  resize = "vertical",
}) => {
  const baseClasses =
    "block w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  const variantClasses = {
    default: "bg-background border border-border text-foreground",
    filled: "bg-muted border border-transparent text-foreground",
    outlined: "bg-background border-2 border-border text-foreground",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-4 py-3 text-base",
  };

  const resizeClasses = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  };

  const errorClasses = error
    ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-200"
    : "";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed bg-muted"
    : "hover:border-primary/30";

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          resizeClasses[resize],
          errorClasses,
          disabledClasses
        )}
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
