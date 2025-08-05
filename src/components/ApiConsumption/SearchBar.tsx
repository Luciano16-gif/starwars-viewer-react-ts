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
    <div>
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="relative group">
          <input
            type="text"
            placeholder={`Search ${category}...`}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="w-full pl-11 pr-12 py-3 bg-[#1f1f1f] text-yellow-300 placeholder-yellow-300/60 rounded-xl 
            border-2 border-yellow-400/20 shadow-[0_0_0_1px_rgba(234,179,8,0.06)] focus:outline-none focus:ring-2
             focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-all duration-200"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400/70 group-focus-within:text-yellow-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {localValue && (
            <button 
              onClick={() => setLocalValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400/60 hover:text-yellow-400 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );};

export default SearchBar;