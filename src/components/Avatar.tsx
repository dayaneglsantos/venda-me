import { useState } from "react";
import { FiUser } from "react-icons/fi";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
};

const iconSizes = {
  sm: 16,
  md: 22,
  lg: 30,
};

export default function Avatar({ src, alt, size = "md" }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const baseClass = `${sizeClasses[size]} rounded-full flex-shrink-0`;

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={alt ?? "Avatar"}
        className={`${baseClass} object-cover border-2 border-primary-lighter`}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className={`${baseClass} bg-primary-lighter flex items-center justify-center`}
    >
      <FiUser className="text-primary" size={iconSizes[size]} />
    </div>
  );
}
