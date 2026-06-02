interface SelectInputProps {
  label: string;
  placeholder?: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: any) => void;
  className?: string;
}

export default function SelectInput({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
}: SelectInputProps) {
  return (
    <div className={`mb-4 w-ful mt-2 ${className || ""}`}>
      <label className="block mb-1 font-bold text-sm text-gray-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`p-2 border border-primary rounded bg-white w-full focus:outline-none focus:ring-2 focus:ring-primary ${value ? "text-gray-700" : "text-gray-400"}`}
      >
        <option value="" className="text-gray-400">
          {placeholder || "Selecione..."}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
