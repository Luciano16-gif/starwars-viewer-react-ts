interface LimitSelectorProps {
  value?: number; // Made optional so we can default it
  onChange: (limit: number) => void;
  options?: number[];
}

const LimitSelector: React.FC<LimitSelectorProps> = ({
  value = 10, // Default to 10 if no value is provided (just in case)
  onChange,
  options = [10, 20, 50, 100],
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="relative inline-block w-28 sm:w-32">
        <select
          id="limit-selector"
          value={value}
          onChange={handleChange}
          className="w-full appearance-none pr-9 pl-3 h-12 sm:h-[52px] bg-[#1f1f1f] text-yellow-300 border border-yellow-400/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/60 transition-all duration-200"
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-yellow-400 bg-[#1f1f1f]">
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-yellow-400/70">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LimitSelector;
