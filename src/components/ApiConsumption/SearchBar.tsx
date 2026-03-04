import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  category: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch, category }) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the search and avoid redundant updates
  useEffect(() => {
    if (localValue === value) return;
    const timer = setTimeout(() => {
      onSearch(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, value, onSearch]);

  // Sync with URL changes (back/forward buttons)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative group">
      <input
        type="text"
        placeholder={`Search ${category}...`}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 bg-[rgba(30,30,30,0.8)] text-yellow-300 placeholder-yellow-300/40 rounded-lg
        border-2 border-yellow-400/10 focus:outline-none focus:ring-1
        focus:ring-yellow-400/40 focus:border-yellow-400/30 transition-all duration-200 text-sm"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400/40 group-focus-within:text-yellow-400/70 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400/40 hover:text-yellow-400 transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;