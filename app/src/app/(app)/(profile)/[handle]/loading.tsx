export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 bg-gray-700 rounded-full" />
        <div className="h-6 w-48 bg-gray-700 rounded" />
        <div className="h-4 w-32 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
