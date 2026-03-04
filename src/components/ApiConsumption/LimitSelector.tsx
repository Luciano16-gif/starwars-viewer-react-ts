interface LimitSelectorProps {
  value?: number;
  onChange: (limit: number) => void;
  options?: number[];
}

const LimitSelector: React.FC<LimitSelectorProps> = ({
  value = 9,
  onChange,
  options = [9, 12, 24, 48, 99],
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="relative inline-block">
      <select
        id="limit-selector"
        value={value}
        onChange={handleChange}
        className="appearance-none pr-7 pl-3 h-10 bg-[rgba(30,30,30,0.8)] text-yellow-300 text-sm
        border-2 border-yellow-400/10 rounded-lg focus:outline-none focus:ring-1
        focus:ring-yellow-400/40 focus:border-yellow-400/30 transition-all duration-200 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-yellow-400 bg-[#1f1f1f]">
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-yellow-400/40">
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
    </div>
  );
};

export default LimitSelector;
