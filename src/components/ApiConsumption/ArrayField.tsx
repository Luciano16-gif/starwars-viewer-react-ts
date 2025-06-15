import { useFetchArray } from '../../hooks/useFetchArray';

interface ArrayFieldProps {
  urls: string[];
  label: string;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({ urls, label }) => {
  const { names, loading, error } = useFetchArray(urls);
  
  if (loading) return (
    <p className="text-lg font-bold">
      {label}: <span className="font-normal">Loading names...</span>
    </p>
  );
  
  if (error) return (
    <p className="text-lg font-bold">
      {label}: <span className="font-normal">Error loading names</span>
    </p>
  );
  
  if (!names.length) return (
    <p className="text-lg font-bold">
      {label}: <span className="font-normal">N/A</span>
    </p>
  );
  
  return (
    <div className="text-lg font-bold w-full">
      <p>{label}:</p>
      <ul className="font-normal mt-1 ml-4 space-y-1">
        {names.map((name: string, index: number) => (
          <li key={index} className="flex items-start">
            <span className="text-yellow-400 mr-2 mt-0.5">•</span>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};