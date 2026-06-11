import emptyImage from "../assets/empty.svg";

interface EmptyContentProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function EmptyContent({
  title,
  description,
  className,
}: EmptyContentProps) {
  return (
    <div
      className={`mt-6 w-full min-h-125 flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg
    ${className || ""}
  `}
    >
      <img src={emptyImage} alt="Empty Content" className="mb-4 h-24 w-24" />
      <h2 className="text-xl text-primary-dark font-semibold mb-2">
        {title || "Nenhum conteúdo disponível"}
      </h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
