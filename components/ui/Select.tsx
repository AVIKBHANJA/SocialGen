import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label?: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = "Select an option",
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-300" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${value === "" ? "text-gray-500" : ""}
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
