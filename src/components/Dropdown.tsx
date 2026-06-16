import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  type ReactNode,
} from "react";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  align: "left" | "right";
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "Os subcomponentes do Dropdown devem ser usados dentro de um <Dropdown />",
    );
  }
  return context;
}

// ==========================================
interface DropdownProps {
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}

export default function Dropdown({
  children,
  align = "right",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se o usuário clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, align }}>
      <div
        className={`relative inline-block text-left ${className}`}
        ref={dropdownRef}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// ==========================================
interface DropdownButtonProps {
  children: ReactNode;
  className?: string;
}

export function DropdownButton({ children, className }: DropdownButtonProps) {
  const { isOpen, setIsOpen } = useDropdownContext();

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`cursor-pointer rounded-full transition-colors duration-200 hover:bg-gray-100 active:scale-95 ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
interface DropdownContentProps {
  children: ReactNode;
}

export function DropdownContent({ children }: DropdownContentProps) {
  const { isOpen, align } = useDropdownContext();

  if (!isOpen) return null;

  const alignmentClass = align === "left" ? "left-0" : "right-0";

  return (
    <div
      className={`absolute ${alignmentClass} top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-in fade-in slide-in-from-top-1 duration-200 w-fit overflow-hidden`}
    >
      {children}
    </div>
  );
}

// ==========================================
interface DropdownHeaderProps {
  children: ReactNode;
}

export function DropdownHeader({ children }: DropdownHeaderProps) {
  return (
    <div className="px-4 py-2 border-b border-gray-100 text-sm text-gray-400">
      {children}
    </div>
  );
}

// ==========================================
interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

export function DropdownItem({
  children,
  onClick,
  variant = "default",
}: DropdownItemProps) {
  const { setIsOpen } = useDropdownContext();

  const baseClasses =
    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors duration-150 text-left cursor-pointer";

  const variantClasses = {
    default: "text-gray-600 hover:bg-gray-100",
    danger: "text-red-600 hover:bg-red-50 font-medium",
  };

  return (
    <div className="p-1">
      <button
        onClick={() => {
          onClick();
          setIsOpen(false);
        }}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        {children}
      </button>
    </div>
  );
}
