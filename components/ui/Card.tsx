import React from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "ghost" | "destructive";
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
  variant = "default",
}) => {
  const baseClasses = "rounded-xl overflow-hidden transition-all duration-200";
  const variantClasses = {
    default: "bg-card border border-border shadow-sm hover:shadow-md",
    elevated: "bg-card border border-border shadow-lg hover:shadow-xl",
    outlined: "bg-card border-2 border-border hover:border-primary/50",
    ghost: "bg-background/50 backdrop-blur-sm border border-border/50",
    destructive:
      "bg-destructive border border-destructive shadow-sm hover:shadow-md",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {title && (
        <div className="border-b border-border px-6 py-4 bg-background/50">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
