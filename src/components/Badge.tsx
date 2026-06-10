interface BadgeProps {
  variant?: "default" | "primary" | "error" | "success" | "warning" | "info";
  children: React.ReactNode;
}

export default function Badge({ variant = "default", children }: BadgeProps) {
  const colors = {
    default: "bg-gray-100 text-gray-800 border-gray-300",
    primary: "bg-gray-100 text-gray-800 border-gray-300",
    error: "bg-red-100 text-red-800 border-red-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-cyan-100 text-cyan-800 border-cyan-300",
  };

  return (
    <span
      className={`text-xs p-1 px-1.5 rounded-2xl border ${colors[variant]}`}
    >
      {children}
    </span>
  );
}
