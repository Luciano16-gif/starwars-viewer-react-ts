import { useLocation } from "react-router-dom";
import SkeletonCard from "../ApiConsumption/SkeletonCard";

const listRoutes = [
  "/people",
  "/planets",
  "/films",
  "/starships",
  "/vehicles",
  "/species",
];

const normalizePath = (path: string) => (
  path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path
);

const ListFallback = () => (
  <div className="relative bg-[#181818] min-h-screen">
    {/* Toolbar skeleton */}
    <div className="max-w-6xl mx-auto px-6 pt-8 pb-6">
      <div className="bg-[rgba(57,58,58,0.3)] rounded-lg p-4 border-2 border-yellow-400/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex-1 h-10 rounded-lg bg-[rgba(30,30,30,0.5)] animate-pulse"></div>
          <div className="h-10 w-20 rounded-lg bg-[rgba(30,30,30,0.5)] animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Grid skeleton */}
    <div className="max-w-6xl mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} lines={5} />
        ))}
      </div>
    </div>
  </div>
);

const RouteFallback = () => {
  const { pathname } = useLocation();
  const normalizedPath = normalizePath(pathname);
  const isListRoute = listRoutes.includes(normalizedPath);

  if (isListRoute) return <ListFallback />;
  return <div className="bg-[#181818] min-h-screen"></div>;
};

export default RouteFallback;
