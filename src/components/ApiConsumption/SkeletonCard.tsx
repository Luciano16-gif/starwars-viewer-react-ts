interface SkeletonCardProps {
  lines?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ lines = 4 }) => (
  <div className="flex flex-col items-center outline outline-2 outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded animate-pulse">
    <div className="h-8 bg-yellow-400/20 rounded w-3/4 mb-2"></div>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={`skeleton-line-${index}`} className="h-5 bg-gray-600/20 rounded w-full mb-1 mt-1"></div>
    ))}
  </div>
);

export default SkeletonCard;
