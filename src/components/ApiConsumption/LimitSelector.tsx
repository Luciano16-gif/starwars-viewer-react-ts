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
    <div className="pb-2 pt-4 flex items-center justify-center bg-[#181818]">
      <label htmlFor="limit-selector" className="text-yellow-400 mr-2 text-lg font-bold">
        Show:
      </label>
      <div className="relative inline-block">
        <select
          id="limit-selector"
          value={value}
          onChange={handleChange}
          className="appearance-none pr-8 pl-3 py-2 bg-gray-800 text-yellow-400 border border-yellow-400 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-yellow-400">
              {option}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-400">
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LimitSelector;
