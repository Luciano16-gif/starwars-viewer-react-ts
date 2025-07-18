import { useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import LimitSelector from "./LimitSelector";
import ListItem from "./ListItem";
import { ListResponse, ListItem as ListItemType } from "../../types/api";

interface Field {
  label: string;
  key: string;
}

interface ShowAllProps {
  url: string; 
  fields: Field[];
  category: string;
}

const ShowAll: React.FC<ShowAllProps> = ({ url, fields, category }) => {
  // Manage the limit 
  const [limit, setLimit] = useState(10);

  // Fetch the main list using the effective URL
  const { data, loading, error } = useFetch<ListResponse>(url);

  // Recompute results only when data changes
  const results = useMemo(() => {
    return data?.results || data?.result || [];
  }, [data]);


  if (loading) {
    return (
      <div className="relative">

        <h1 className="text-4xl min-h-screen bg-[#181818] min-w-screen text-yellow-400 font-bold flex items-center justify-center">
          Loading...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">

        <h1 className="text-4xl bg-[#181818] min-h-screen min-w-screen text-yellow-400 font-bold flex items-center justify-center">
          Error: {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="relative bg-[#181818] min-h-screen">
      {/* Limit selector */}
      <div className="bg-[#181818]">
        <LimitSelector value={limit} onChange={setLimit} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center p-4 text-white">
        {results.map((object: ListItemType) => {
          return (
            <ListItem
              key={object.uid}
              uid={object.uid}
              name={object.name || (object.properties as any)?.title}
              url={object.url}
              fields={fields}
              category={category}
              preloadedData={object}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShowAll;
