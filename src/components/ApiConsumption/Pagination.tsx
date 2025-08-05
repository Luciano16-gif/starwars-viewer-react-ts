interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center space-x-2 py-6 bg-[#181818]">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded border border-yellow-400/20 text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Previous
      </button>

      {/* Page info */}
      <div className="px-4 py-2 text-yellow-400">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded border border-yellow-400/20 text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;