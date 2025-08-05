import { useMemo, useRef } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LimitSelector from "./LimitSelector";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Extract parameters from URL
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const q = searchParams.get('q') || '';
  
  const url = swapiService.getListUrl(category, page, limit, q);
  const pageRef = useRef(page);
  const isPageTransitionRef = useRef(false);
  if (pageRef.current !== page) {
    isPageTransitionRef.current = true;
    pageRef.current = page;
  }
  const keepPreviousData = !isPageTransitionRef.current;
  const { data, loading, error } = useFetch<ListResponse>(url, { keepPreviousData });

  if (!loading && isPageTransitionRef.current) {
    isPageTransitionRef.current = false;
  }
  // Recompute results and total pages only when data changes
  const results = useMemo(() => {
    return data?.results || data?.result || [];
  }, [data]);

  const totalPages = data?.total_pages || 1;

  if (error) {
    return (
      <div className="relative">
        <h1 className="text-4xl bg-[#181818] min-h-screen min-w-screen text-yellow-400 font-bold flex items-center justify-center">
          Error: {error}
        </h1>
      </div>
    );
  }

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // Reset to page 1 when changing limit
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleSearch = (query: string) => {
    const prev = searchParams.get('q') || '';
    if (query === prev) return;
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <div className="relative bg-[#181818] min-h-screen">
      <div className="px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="order-2 sm:order-1">
            <LimitSelector value={limit} onChange={handleLimitChange} />
          </div>
          <div className="order-1 sm:order-2 flex-1">
            <SearchBar value={q} onSearch={handleSearch} category={category} />
          </div>
          <div className="order-3 hidden sm:block text-yellow-400/70 text-sm">
            <span>Page {page} of {totalPages}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center p-4 text-white">
        {loading && isPageTransitionRef.current ? (
          Array(limit).fill(null).map((_, index) => (
            <div key={`skeleton-${index}`} className="flex flex-col items-center outline outline-2 outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded animate-pulse">
              <div className="h-8 bg-yellow-400/20 rounded w-3/4 mb-2"></div>
              {fields.map((_, fieldIndex) => (
                <div key={fieldIndex} className="h-5 bg-gray-600/20 rounded w-full mb-1 mt-1"></div>
              ))}
            </div>
          ))
        ) : results.length > 0 ? (
          <>
            {/* Show loaded items */}
            {results.map((object: ListItemType) => (
              <Link
                key={object.uid}
                to={`/${category}/${object.uid}${location.search}`}
                className="flex flex-col items-center outline outline-2 outline-yellow-400 
                bg-[rgba(57,58,58,0.5)] p-3 h-48 md:h-56 w-full rounded hover:bg-[rgba(95,96,96,0.5)] 
                hover:cursor-pointer transition-all duration-200 overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-yellow-400 truncate w-full text-center">
                  {object.name || (object as any).title || (object.properties as any)?.name || (object.properties as any)?.title || "Unknown"}
                </h2>
                
                {fields.map(({ label, key }) => (
                  <p className="text-lg font-bold flex items-baseline gap-2 overflow-hidden w-full justify-center py-0.5" key={key}>
                    <span className="whitespace-nowrap">{label}:</span>
                    <span className="font-normal truncate">{(object.properties as any)?.[key] || "N/A"}</span>
                  </p>
                ))}
              </Link>
            ))}
            
            {/* Show skeletons only for missing slots while loading */}
            {loading && results.length < limit && 
              Array(limit - results.length).fill(null).map((_, index) => (
                <div key={`skeleton-${results.length + index}`} className="flex flex-col items-center outline outline-2 outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded animate-pulse">
                  <div className="h-8 bg-yellow-400/20 rounded w-3/4 mb-2"></div>
                  {fields.map((_, fieldIndex) => (
                    <div key={fieldIndex} className="h-5 bg-gray-600/20 rounded w-full mb-1 mt-1"></div>
                  ))}
                </div>
              ))
            }
          </>
        ) : (
          q && !loading ? (
            <div className="col-span-full text-center text-yellow-400 py-8">No results found for "{q}".</div>
          ) : (
            Array(limit).fill(null).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex flex-col items-center outline outline-2 outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded animate-pulse">
                <div className="h-8 bg-yellow-400/20 rounded w-3/4 mb-2"></div>
                {fields.map((_, fieldIndex) => (
                  <div key={fieldIndex} className="h-5 bg-gray-600/20 rounded w-full mb-1 mt-1"></div>
                ))}
              </div>
            ))
          )
        )}
      </div>
      
      {/* Pagination */}
      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShowAll;