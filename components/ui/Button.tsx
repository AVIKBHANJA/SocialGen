import React from "react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "default":
      return "bg-primary-600 text-primary-foreground shadow hover:bg-primary-700";
    case "destructive":
      return "bg-error-600 text-white shadow-sm hover:bg-error-700";
    case "outline":
      return "border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
    case "secondary":
      return "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80";
    case "ghost":
      return "hover:bg-accent hover:text-accent-foreground";
    case "link":
      return "text-primary-600 underline-offset-4 hover:underline";
    default:
      return "bg-primary-600 text-primary-foreground shadow hover:bg-primary-700";
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "default":
      return "h-10 px-4 py-2 text-sm";
    case "sm":
      return "h-8 px-3 text-xs";
    case "lg":
      return "h-12 px-8 text-base";
    case "icon":
      return "h-10 w-10";
    default:
      return "h-10 px-4 py-2 text-sm";
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  fullWidth = false,
  isLoading = false,
  className = "",
  children,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
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
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
