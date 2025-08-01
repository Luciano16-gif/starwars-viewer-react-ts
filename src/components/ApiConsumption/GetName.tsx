import useFetch from "../../hooks/useFetch";
import { ApiObject } from "../../types/api";

interface GetNameProp {
    url: string;
    label: string;
}

export const GetName: React.FC<GetNameProp> = ({ url, label }) => {
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
    <p className="text-lg font-bold">
      <span className="font-normal">{name || "N/A"}</span>
    </p>
  );
};