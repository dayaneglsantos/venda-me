import { FiChevronDown } from "react-icons/fi";

interface SelectInputProps {
  label: string;
  placeholder?: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: any) => void;
  className?: string;
  error?: string;
}

export default function SelectInput({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
  error,
}: SelectInputProps) {
  return (
    <div className={`w-ful min-w-20 mt-2 ${className || ""}`}>
      <label className="block mb-1 font-bold text-sm text-gray-500">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`text-sm p-2 border border-primary rounded bg-white w-full focus:outline-none appearance-none ${value ? "" : "text-gray-400"}`}
        >
          <option value="" className="text-gray-400">
            {placeholder || "Selecione..."}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-700"
            >
              {option.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
