import { useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import LimitSelector from "./LimitSelector";
import ListItem from "./ListItem";
import { ListResponse, ListItem as ListItemType } from "../../types/api";
import swapiService from "../../services/swapi.service";

interface Field {
  label: string;
  key: string;
}

interface ShowAllProps {
  fields: Field[];
  category: string;
}

const ShowAll: React.FC<ShowAllProps> = ({ fields, category }) => {
  // Manage the limit 
  const [limit, setLimit] = useState(10);

  const url = swapiService.getListUrl(category, 1, limit);

  // Fetch the main list using the effective URL
  const { data, loading, error } = useFetch<ListResponse>(url);

  // Recompute results only when data changes
  const results = useMemo(() => {
    return data?.results || data?.result || [];
  }, [data]);

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
        {!data ? (
          // Render skeleton items immediately when no data
          Array(limit).fill(null).map((_, index) => (
            <ListItem
              key={`skeleton-${index}`}
              uid=""
              name=""
              url=""
              fields={fields}
              category={category}
            />
          ))
        ) : (
          <>
            {/* Render actual results */}
            {results.map((object: ListItemType) => (
              <ListItem
                key={object.uid}
                uid={object.uid}
                name={object.name || (object.properties as any)?.title}
                url={object.url}
                fields={fields}
                category={category}
                preloadedData={object}
              />
            ))}
            
            {/* Render skeletons for remaining slots only if loading more data */}
            {loading && results.length < limit && 
              Array(limit - results.length).fill(null).map((_, index) => (
                <ListItem
                  key={`skeleton-${results.length + index}`}
                  uid=""
                  name=""
                  url=""
                  fields={fields}
                  category={category}
                />
              ))
            }
          </>
        )}
      </div>
    </div>
  );
};

export default ShowAll;
