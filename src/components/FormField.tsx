import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface FormFieldProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  endIcon?: React.ReactNode;
  className?: string;
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
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Bloquear a rolagem do scroll no input number
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      // Remove o foco do input temporariamente para parar o scroll
      e.currentTarget.blur();
    }
  };

  return (
    <div className={`form-field flex flex-col w-full mt-2 ${className}`}>
      {label && (
        <label className="text-gray-500 text-sm font-bold mb-1">{label}</label>
      )}
      <div className="relative w-full flex items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onWheel={handleWheel}
          className={`p-2 border border-primary rounded w-full pr-10 outline-none focus:ring-1 focus:ring-primary * transition-colors duration-300 bg-gray-50 text-gray-700 placeholder:text-gray-400 ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {type === "password" && (
          <div className="absolute right-3 top-3 cursor-pointer">
            {showPassword ? (
              <FiEyeOff
                className="text-gray-500"
                size={20}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEye
                className="text-gray-500"
                size={20}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        )}
        {endIcon && <div className="absolute right-3 top-3">{endIcon}</div>}
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
