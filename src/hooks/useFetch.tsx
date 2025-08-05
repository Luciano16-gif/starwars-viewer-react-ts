import { useState, useEffect } from 'react';
import cacheService from '../services/cache.service';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchOptions {
  skipCache?: boolean;
  cacheTTL?: number; // Custom TTL in milliseconds
  keepPreviousData?: boolean; // Keep previous data while loading
}

const useFetch = <T,>(
  url: string | null, 
  options: UseFetchOptions = {}
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [previousData, setPreviousData] = useState<T | null>(null);

  const { skipCache = false, cacheTTL, keepPreviousData = true } = options;

  const nextPrev = keepPreviousData ? data : null;

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);
    setPreviousData(nextPrev);
    if (!keepPreviousData) setData(null);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      if (!skipCache) {
        const cachedData = cacheService.get<T>(url);
        if (cachedData !== null) {
          setData(cachedData);
          setPreviousData(cachedData);
          setLoading(false);
          setError(null);
          return;
        }
      }

      try {
        const res = await fetch(url, { signal });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const responseData: T = await res.json();
        if (!skipCache) {
          cacheService.set(url, responseData, cacheTTL);
        }
        if (!signal.aborted) {
          setData(responseData);
          setPreviousData(responseData);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            if (!signal.aborted) {
              setLoading(false);
              setError(err.message || 'Unknown Error');
            }
          }
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, skipCache, cacheTTL, keepPreviousData, nextPrev]);
  return { data: data ?? previousData, loading, error };
};

export default useFetch;