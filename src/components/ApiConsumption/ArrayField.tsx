import { useFetchArray } from '../../hooks/useFetchArray';

interface ArrayFieldProps {
  urls: string[];
  label: string;
  onDetailClick?: (url: string) => void;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({ urls, label, onDetailClick }) => {
  const { names, loading, error } = useFetchArray(urls);
  
  if (loading) return (
    <div className="text-lg font-bold w-full">
      <ul className={`font-normal space-y-2 ${label ? 'mt-1 ml-4' : ''}`}>
        {Array(urls.length).fill(null).map((_, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-400 mr-2 mt-0.5">•</span>
            <div className="h-5 bg-gray-600/20 rounded animate-pulse w-32"></div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  if (error) return (
    <p className="text-lg font-bold">
      <span className="font-normal">Error loading names</span>
    </p>
  );
  
  if (!names.length) return (
    <p className="text-lg text-gray-100 font-bold">
      <span className="font-normal">N/A</span>
    </p>
  );
  
  return (
    <div className="text-lg font-bold w-full">
      <ul className={`font-normal space-y-1 ${label ? 'mt-1 ml-4' : ''}`}>
        {names.map((name: string, index: number) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-400 mr-2 mt-0.5">•</span>
            {onDetailClick ? (
              <button 
                onClick={() => onDetailClick(urls[index])}
                className="text-left px-2 py-1 rounded border border-yellow-400/20 hover:border-yellow-400 hover:shadow-[0_0_0_1px_rgba(250,204,21,0.3)] hover:bg-yellow-400/5 transition-all duration-200 cursor-pointer text-yellow-400/80 hover:text-gray-100"
              >
                {name}
              </button>
            ) : (
              <span className="text-gray-100">{name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};