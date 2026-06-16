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
    default: "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm",
    outline:
      "bg-transparent border border-primary/60 text-primary-dark hover:bg-primary/10 hover:border-primary",
    primary: "bg-primary text-white hover:bg-primary-dark hover:shadow-md",
    secondary:
      "bg-secondary text-white hover:bg-secondary-dark hover:shadow-md",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-1 whitespace-nowrap font-medium ${sizeClasses[size]} rounded-full transition-all duration-200 active:scale-95 ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-default" : "cursor-pointer"} ${className || ""}`}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      <span className="flex-1">{title}</span>
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </button>
  );
}
