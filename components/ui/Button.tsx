import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
}) => {
  // Base styles
  const baseStyles =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variant styles
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    outline:
      "border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
  };

  // Size styles
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  // Width style
  const widthStyle = fullWidth ? "w-full" : "";

  // Disabled style
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${disabledStyle}
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
