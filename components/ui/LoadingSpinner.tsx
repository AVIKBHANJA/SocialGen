import React from "react";
import { cn } from "@/utils/cn";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "border" | "dots" | "pulse";
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  variant = "border",
  text,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  if (variant === "border") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-2",
          className
        )}
      >
        <div
          className={cn(
            "animate-spin rounded-full border-t-2 border-b-2 border-primary",
            sizeClasses[size]
          )}
        />
        {text && (
          <p className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-2",
          className
        )}
      >
        <div className="flex space-x-1">
          <div
            className={cn(
              "bg-primary rounded-full animate-pulse",
              size === "sm"
                ? "h-1 w-1"
                : size === "md"
                ? "h-2 w-2"
                : size === "lg"
                ? "h-3 w-3"
                : "h-4 w-4"
            )}
            style={{ animationDelay: "0ms" }}
          />
          <div
            className={cn(
              "bg-primary rounded-full animate-pulse",
              size === "sm"
                ? "h-1 w-1"
                : size === "md"
                ? "h-2 w-2"
                : size === "lg"
                ? "h-3 w-3"
                : "h-4 w-4"
            )}
            style={{ animationDelay: "150ms" }}
          />
          <div
            className={cn(
              "bg-primary rounded-full animate-pulse",
              size === "sm"
                ? "h-1 w-1"
                : size === "md"
                ? "h-2 w-2"
                : size === "lg"
                ? "h-3 w-3"
                : "h-4 w-4"
            )}
            style={{ animationDelay: "300ms" }}
          />
        </div>
        {text && (
          <p className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  // Pulse variant
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        className
      )}
    >
      <div className="animate-pulse space-y-3">
        <div className={cn("bg-muted rounded", sizeClasses[size])}></div>
        {size !== "sm" && (
          <>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </>
        )}
      </div>
      {text && (
        <p className={cn("text-muted-foreground", textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  );
};

export { LoadingSpinner };
