interface KpiCardProps {
  title: string;
  value: string;
}

export default function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div className="shadow-md rounded-lg p-4 bg-white text-center border border-gray-200">
      <h3 className="text-lg font-bold text-primary-dark">{title}</h3>
      <p className="text-2xl font-bold text-gray-600">{value}</p>
    </div>
  );
}
