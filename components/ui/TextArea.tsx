import React from "react";

interface TextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`
          block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y
          ${error ? "border-red-300" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
