import React from "react";
import { cn } from "@/utils/cn";
import { LoadingSpinner } from "./LoadingSpinner";

interface PageLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  centered?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  loading = false,
  loadingText,
  className = "",
  containerSize = "lg",
  centered = false,
}) => {
  const containerClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" text={loadingText} />
      </div>
    );
  }

  if (!children) {
    return null;
  }

  if (centered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div
          className={cn("w-full", containerClasses[containerSize], className)}
        >
          {title && (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div
          className={cn("mx-auto", containerClasses[containerSize], className)}
        >
          {title && (
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export { PageLayout };
