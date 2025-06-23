import React from "react";
import { cn } from "@/utils/cn";

interface StatusBadgeProps {
  status:
    | "pending"
    | "completed"
    | "failed"
    | "cancelled"
    | "processing"
    | "success"
    | "warning"
    | "info";
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "solid";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className = "",
  size = "md",
  variant = "default",
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };
  const getStatusClasses = () => {
    switch (status) {
      case "pending":
        return variant === "outline"
          ? "bg-transparent border border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300"
          : variant === "solid"
          ? "bg-yellow-500 text-white"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300";

      case "processing":
        return variant === "outline"
          ? "bg-transparent border border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
          : variant === "solid"
          ? "bg-blue-500 text-white"
          : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";

      case "completed":
      case "success":
        return variant === "outline"
          ? "bg-transparent border border-green-200 text-green-700 dark:border-green-800 dark:text-green-300"
          : variant === "solid"
          ? "bg-green-500 text-white"
          : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300";

      case "failed":
        return variant === "outline"
          ? "bg-transparent border border-red-200 text-red-700 dark:border-red-800 dark:text-red-300"
          : variant === "solid"
          ? "bg-red-500 text-white"
          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";

      case "cancelled":
        return variant === "outline"
          ? "bg-transparent border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300"
          : variant === "solid"
          ? "bg-gray-500 text-white"
          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

      case "warning":
        return variant === "outline"
          ? "bg-transparent border border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300"
          : variant === "solid"
          ? "bg-orange-500 text-white"
          : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300";

      case "info":
        return variant === "outline"
          ? "bg-transparent border border-cyan-200 text-cyan-700 dark:border-cyan-800 dark:text-cyan-300"
          : variant === "solid"
          ? "bg-cyan-500 text-white"
          : "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300";

      default:
        return variant === "outline"
          ? "bg-transparent border border-border text-foreground"
          : variant === "solid"
          ? "bg-muted text-muted-foreground"
          : "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = () => {
    const iconClasses = "w-3 h-3 mr-1";

    switch (status) {
      case "pending":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );

      case "processing":
        return (
          <svg
            className={cn(iconClasses, "animate-spin")}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );

      case "completed":
      case "success":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );

      case "failed":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );

      case "cancelled":
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        sizeClasses[size],
        getStatusClasses(),
        className
      )}
    >
      {getStatusIcon()}
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export { StatusBadge };
