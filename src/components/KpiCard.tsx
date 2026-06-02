interface KpiCardProps {
  title: string;
  value: string;
}

export default function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div className="shadow-md rounded-lg p-4 bg-white text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-bold">${value}</p>
    </div>
  );
}
