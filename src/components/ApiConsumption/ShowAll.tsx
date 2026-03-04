import { useMemo, useRef, useEffect, useCallback, memo } from "react";
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

function parsePositiveIntParam(value: string | null, fallback: number): number {
  if (!value || !/^\d+$/.test(value)) return fallback;
  const parsed = Number.parseInt(value, 10);
  return parsed > 0 ? parsed : fallback;
}

const ItemCard = memo<{ item: ListItemType; fields: Field[]; category: string; search: string }>(({
  item,
  fields,
  category,
  search,
}) => (
  <Link
    to={`/${category}/${item.uid}${search}`}
    className="group bg-[rgba(57,58,58,0.3)] rounded-lg p-6 border-2 border-yellow-400/10
    hover:border-yellow-400/30 hover:bg-[rgba(57,58,58,0.45)]
    transition-all duration-200 block"
  >
    {/* Name */}
    <h2 className="text-2xl font-bold text-yellow-400 mb-1 truncate group-hover:text-yellow-300 transition-colors duration-200">
      {item.name || (item as any).title || (item.properties as any)?.name || (item.properties as any)?.title || "Unknown"}
    </h2>
    <div className="h-0.5 w-12 bg-yellow-400/40 rounded mb-4 group-hover:w-16 group-hover:bg-yellow-400/60 transition-all duration-300" />

    {/* Fields */}
    <div className="space-y-2">
      {fields.map(({ label, key }) => (
        <div className="flex items-baseline gap-3" key={key}>
          <span className="text-yellow-400/70 font-semibold text-sm whitespace-nowrap">{label}</span>
          <span className="text-gray-100 truncate">{(item.properties as any)?.[key] || "N/A"}</span>
        </div>
      ))}
    </div>
  </Link>
));

const ShowAll: React.FC<ShowAllProps> = ({ fields, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const rawLimit = searchParams.get('limit');
  const rawPage = searchParams.get('page');
  const limit = parsePositiveIntParam(rawLimit, 9);
  const page = parsePositiveIntParam(rawPage, 1);
  const q = searchParams.get('q') || '';

  const shouldNormalizeLimit = rawLimit !== null && rawLimit !== String(limit);
  const shouldNormalizePage = rawPage !== null && rawPage !== String(page);

  useEffect(() => {
    if (!shouldNormalizeLimit && !shouldNormalizePage) return;
    const params = new URLSearchParams(searchParams);
    params.set('limit', String(limit));
    params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [
    shouldNormalizeLimit,
    shouldNormalizePage,
    limit,
    page,
    searchParams,
    setSearchParams,
  ]);

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

  const lastTotalPagesRef = useRef(1);
  const rawTotalPages = data?.total_pages;
  if (rawTotalPages != null) {
    lastTotalPagesRef.current = rawTotalPages;
  }
  const totalPages = rawTotalPages ?? lastTotalPagesRef.current;

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

  const handleLimitChange = useCallback((newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit.toString());
    params.set('page', '1');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearchParams]);

  const handleSearch = useCallback((query: string) => {
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
  }, [searchParams, setSearchParams]);

  return (
    <div className="relative bg-[#181818] min-h-screen">
      {/* Toolbar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-6">
        <div className="bg-[rgba(57,58,58,0.3)] rounded-lg p-4 border-2 border-yellow-400/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1">
              <SearchBar value={q} onSearch={handleSearch} category={category} />
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <LimitSelector value={limit} onChange={handleLimitChange} />
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="p-1.5 rounded text-yellow-400/50 hover:text-yellow-400 hover:bg-yellow-400/5
                  disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous page"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-yellow-400/50 text-sm whitespace-nowrap tabular-nums min-w-[3ch] text-center">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="p-1.5 rounded text-yellow-400/50 hover:text-yellow-400 hover:bg-yellow-400/5
                  disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next page"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
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
