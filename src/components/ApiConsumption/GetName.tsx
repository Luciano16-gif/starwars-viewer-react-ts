import useFetch from "../../hooks/useFetch";
import { ApiObject } from "../../types/api";

interface GetNameProp {
    url: string;
    label: string;
    onDetailClick?: (url: string) => void;
}

export const GetName: React.FC<GetNameProp> = ({ url, label, onDetailClick }) => {
    const { data, loading, error } = useFetch(url)
    const name: string = (data as ApiObject)?.result?.properties?.name;

    if (loading) return (
      <div className="h-6 bg-gray-600/20 rounded animate-pulse w-32"></div>
  );
  
  if (error) return (
    <p className="text-lg font-bold">
      <span className="font-normal">Error loading name</span>
    </p>
  );

  return (
    <button 
      onClick={() => onDetailClick?.(url)}
      className="text-lg font-bold text-left w-full p-2 rounded border border-yellow-400/20 hover:border-yellow-400 hover:shadow-[0_0_0_1px_rgba(250,204,21,0.3)] hover:bg-yellow-400/5 transition-all duration-200 cursor-pointer"
      disabled={!onDetailClick}
    >
      <span className="font-normal text-yellow-400/80 hover:text-gray-100 transition-colors">
        {name || "N/A"}
      </span>
    </button>
  );
};