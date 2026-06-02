import { useState } from "react";
import { IMaskInput } from "react-imask";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface FormFieldProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  endIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  mask?: string;
  maskOptions?: Record<string, any>;
}

export function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  endIcon,
  className,
  disabled = false,
  mask,
  maskOptions,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      e.currentTarget.blur();
    }
  };

  const inputClassName = `
    p-2
    border
    rounded
    w-full
    pr-10
    outline-none
    focus:ring-1
    focus:ring-primary
    transition-colors
    duration-300
    bg-gray-50
    text-gray-700
    placeholder:text-gray-400
    ${error ? "border-red-500" : "border-primary"}
  `;

  const shouldUseMask = !!mask || !!maskOptions;

  return (
    <div className={`form-field flex flex-col w-full mt-2 ${className}`}>
      {label && (
        <label className="text-gray-500 text-sm font-bold mb-1">{label}</label>
      )}

      <div className="relative w-full flex items-center">
        {shouldUseMask ? (
          <IMaskInput
            {...(maskOptions ?? { mask })}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onAccept={(value) => onChange(String(value))}
            className={inputClassName}
          />
        ) : (
          <input
            type={type === "password" && showPassword ? "text" : type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onWheel={handleWheel}
            disabled={disabled}
            className={inputClassName}
          />
        )}

        {type === "password" && (
          <div className="absolute right-3 top-3 cursor-pointer">
            {showPassword ? (
              <FiEyeOff
                size={20}
                className="text-gray-500"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEye
                size={20}
                className="text-gray-500"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        )}

        {endIcon && <div className="absolute right-3 top-3">{endIcon}</div>}
      </div>

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
