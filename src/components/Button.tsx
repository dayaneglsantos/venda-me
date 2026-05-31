interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "outline" | "primary" | "secondary";
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  onClick,
  type = "button",
  variant = "default",
  disabled,
  children: title,
  className,
  endIcon,
  startIcon,
  size = "md",
  ...props
}: ButtonProps) {
  const variantClasses = {
    default: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    outline:
      "bg-transparent border border-primary text-primary-dark hover:bg-primary hover:text-primary-lighter",
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-1 whitespace-nowrap font-semibold ${sizeClasses[size]} rounded-2xl transition-colors duration-300 ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-default" : "cursor-pointer"} ${className || ""}`}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <span className="flex-1">{title}</span>
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
}
