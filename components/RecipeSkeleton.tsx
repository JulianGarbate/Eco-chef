export default function RecipeSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-b-4 border-green-500 flex flex-col animate-pulse">
      <div className="relative h-48 w-full bg-gray-300" />
      <div className="p-5 flex-grow flex flex-col">
        <div className="h-6 bg-gray-300 rounded mb-4 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3" />
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 h-10 bg-gray-300 rounded-lg" />
          <div className="w-12 h-10 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
