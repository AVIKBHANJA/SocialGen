import React from "react";
import { cn } from "@/utils/cn";
import { Card } from "./Card";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  variant?: "default" | "card";
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = "",
  variant = "default",
}) => {
  const defaultIcon = (
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
      <svg
        className="w-8 h-8 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V9a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2z"
        />
      </svg>
    </div>
  );

  const content = (
    <div className={cn("text-center py-8", className)}>
      <div className="space-y-4">
        {icon || defaultIcon}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          {description && (
            <p className="text-muted-foreground max-w-sm mx-auto">
              {description}
            </p>
          )}
        </div>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );

  if (variant === "card") {
    return <Card>{content}</Card>;
  }

  return content;
};

export { EmptyState };
