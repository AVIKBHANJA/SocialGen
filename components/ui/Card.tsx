import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}
    >
      {title && (
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
    </div>
  );
};
