export default function Loader() {
  return (
    <div className="flex justify-center w-full py-6">
      <div className="w-50 h-1.5 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/3 animate-loader bg-primary" />
      </div>
    </div>
  );
}
