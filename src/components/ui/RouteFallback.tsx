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
    <div className="px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="order-2 sm:order-1 h-10 w-28 rounded bg-yellow-400/20 animate-pulse"></div>
        <div className="order-1 sm:order-2 flex-1 h-10 rounded bg-gray-600/20 animate-pulse"></div>
        <div className="order-3 hidden sm:block h-4 w-28 rounded bg-gray-600/20 animate-pulse"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center p-4 text-white">
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} lines={5} />
      ))}
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
