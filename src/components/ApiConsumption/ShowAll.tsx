import { useMemo, useRef, useEffect } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LimitSelector from "./LimitSelector";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SkeletonCard from "./SkeletonCard";
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

const ItemCard: React.FC<{ item: ListItemType; fields: Field[]; category: string; search: string }> = ({ 
  item, 
  fields, 
  category, 
  search 
}) => (
  <Link
    to={`/${category}/${item.uid}${search}`}
    className="flex flex-col items-center outline outline-2 outline-yellow-400 
    bg-[rgba(57,58,58,0.5)] p-3 h-48 md:h-56 w-full rounded hover:bg-[rgba(95,96,96,0.5)] 
    hover:cursor-pointer transition-all duration-200 overflow-hidden"
  >
    <h2 className="text-2xl font-bold text-yellow-400 truncate w-full text-center">
      {item.name || (item as any).title || (item.properties as any)?.name || (item.properties as any)?.title || "Unknown"}
    </h2>
    
    {fields.map(({ label, key }) => (
      <p className="text-lg font-bold flex items-baseline gap-2 overflow-hidden w-full justify-center py-0.5" key={key}>
        <span className="whitespace-nowrap">{label}:</span>
        <span className="font-normal truncate">{(item.properties as any)?.[key] || "N/A"}</span>
      </p>
    ))}
  </Link>
);

const ShowAll: React.FC<ShowAllProps> = ({ fields, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const q = searchParams.get('q') || '';
  
  const url = swapiService.getListUrl(category, page, limit, q);
  
  const previousQueryRef = useRef(q);
  const isSearchChange = previousQueryRef.current !== q;
  
  // Update the ref after determining if it's a search change
  useEffect(() => {
    previousQueryRef.current = q;
  }, [q]);
  
  // Keep previous data only on initial page for non-search states
  const keepPreviousData = !isSearchChange && page === 1;  
  const { data, loading, error } = useFetch<ListResponse>(url, { keepPreviousData });

  // Recompute results and total pages only when data changes
  const results = useMemo(() => {
    return data?.results || data?.result || [];
  }, [data]);

  const totalPages = data?.total_pages || 1;

  // Determine if we should show skeletons instead of results
  const showSkeletonsInsteadOfResults = loading && keepPreviousData && !!results.length;
  
  const skeletonCount = useMemo(() => {
    if (showSkeletonsInsteadOfResults) {
      return Math.max(0, limit - results.length); // Show only additional skeletons needed
    }
    if (!results.length && loading) {
      return limit; // Show full skeleton grid for initial load
    }
    return 0;
  }, [loading, results.length, limit, showSkeletonsInsteadOfResults]);

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
        {/* Show results if we have them */}
        {results.map((item: ListItemType) => (
          <ItemCard 
            key={item.uid} 
            item={item} 
            fields={fields} 
            category={category} 
            search={location.search} 
          />
        ))}
        
        {/* Show skeletons for loading slots */}
        {Array(skeletonCount).fill(null).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} lines={fields.length} />
        ))}
        
        {/* Show no results message */}
        {!loading && !results.length && q && (
          <div className="col-span-full text-center text-yellow-400 py-8">
            No results found for "{q}".
          </div>
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
