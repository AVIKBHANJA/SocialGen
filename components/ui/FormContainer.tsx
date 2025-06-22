import React from "react";
import { cn } from "@/utils/cn";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface FormContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: "default" | "centered" | "split";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  description,
  children,
  footer,
  className = "",
  variant = "default",
  maxWidth = "md",
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  if (variant === "centered") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className={cn("w-full space-y-8", maxWidthClasses[maxWidth])}>
          {title && (
            <div className="text-center">
              <div className="mx-auto h-16 w-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center px-4">
                <span className="text-white font-bold text-xl">SocialGen</span>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              {description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
          <Card className={cn("p-8", className)}>
            {children}
            {footer && (
              <div className="mt-6 pt-6 border-t border-border">{footer}</div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className={cn("mx-auto", maxWidthClasses[maxWidth])}>
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
            <Card className={cn("p-6", className)}>
              {children}
              {footer && (
                <div className="mt-6 pt-6 border-t border-border">{footer}</div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("space-y-6", className)}>
      {title && (
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <Card className="p-6">
        {children}
        {footer && (
          <div className="mt-6 pt-6 border-t border-border">{footer}</div>
        )}
      </Card>
    </div>
  );
};

export { FormContainer };
