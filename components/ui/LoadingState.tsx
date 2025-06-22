import React from "react";
import { cn } from "@/utils/cn";

interface LoadingStateProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  text = "Loading...",
  size = "md",
  variant = "spinner",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const renderSpinner = () => (
    <div
      className={cn(
        "animate-spin rounded-full border-t-2 border-b-2 border-primary",
        sizeClasses[size]
      )}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" />
    </div>
  );

  const renderPulse = () => (
    <div
      className={cn(
        "bg-primary/20 rounded-full animate-pulse",
        sizeClasses[size]
      )}
    />
  );

  const renderLoadingIcon = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-3", className)}>
      {renderLoadingIcon()}
      <p className={cn("text-muted-foreground", textSizeClasses[size])}>
        {text}
      </p>
    </div>
  );
};

export default LoadingState;
