interface SkeletonCardProps {
  lines?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ lines = 4 }) => (
  <div className="bg-[rgba(57,58,58,0.3)] rounded-lg p-6 border-2 border-yellow-400/10 animate-pulse">
    <div className="h-7 bg-yellow-400/15 rounded w-3/5 mb-2"></div>
    <div className="h-0.5 w-12 bg-yellow-400/20 rounded mb-4"></div>
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={`skeleton-line-${index}`} className="flex gap-3 items-baseline">
          <div className="h-4 bg-yellow-400/10 rounded w-20 shrink-0"></div>
          <div className="h-4 bg-gray-600/15 rounded flex-1"></div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonCard;
