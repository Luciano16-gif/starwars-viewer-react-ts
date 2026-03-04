import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Builds a compact window of page numbers around the current page.
 * Returns an array of numbers and `null` (for ellipsis gaps).
 */
function buildPageWindow(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [1];

  if (current > 3) pages.push(null); // left ellipsis

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push(null); // right ellipsis

  pages.push(total);
  return pages;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => buildPageWindow(currentPage, totalPages), [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 py-8 bg-[#181818]">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md text-sm font-medium border border-yellow-400/15 text-yellow-400
        hover:border-yellow-400/40 hover:bg-yellow-400/5
        disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-yellow-400/15 disabled:hover:bg-transparent
        transition-all duration-200"
        aria-label="Previous"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((p, idx) =>
        p === null ? (
          <span key={`ellipsis-${idx}`} className="px-1 text-yellow-400/30 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={p === currentPage}
            className={`min-w-[36px] h-9 rounded-md text-sm font-medium transition-all duration-200 ${p === currentPage
                ? "bg-yellow-400 text-black cursor-default shadow-[0_0_12px_rgba(234,179,8,0.3)]"
                : "text-yellow-400 border border-yellow-400/15 hover:border-yellow-400/40 hover:bg-yellow-400/5"
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md text-sm font-medium border border-yellow-400/15 text-yellow-400
        hover:border-yellow-400/40 hover:bg-yellow-400/5
        disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-yellow-400/15 disabled:hover:bg-transparent
        transition-all duration-200"
        aria-label="Next"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;