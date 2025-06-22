import React from "react";
import { cn } from "@/utils/cn";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label?: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = "Select an option",
  className = "",
  variant = "default",
  size = "md",
}) => {
  const baseClasses =
    "block w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  const variantClasses = {
    default: "bg-background border border-border text-foreground",
    filled: "bg-muted border border-transparent text-foreground",
    outlined: "bg-background border-2 border-border text-foreground",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-4 py-3 text-base",
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          errorClasses,
          disabledClasses,
          value === "" ? "text-muted-foreground" : ""
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
