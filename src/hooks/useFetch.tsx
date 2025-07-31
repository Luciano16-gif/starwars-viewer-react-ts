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
}

const useFetch = <T,>(
  url: string | null, 
  options: UseFetchOptions = {}
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { skipCache = false, cacheTTL } = options;

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setData(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      // Check cache first (unless skipped)
      if (!skipCache) {
        const cachedData = cacheService.get<T>(url);
        if (cachedData !== null) {
          setData(cachedData);
          setLoading(false);
          setError(null);
          return;
        }
      }

      setLoading(true);

      try {
        const res = await fetch(url, { signal });
        
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        
        const responseData: T = await res.json();
        
        // Cache the successful response
        if (!skipCache) {
          cacheService.set(url, responseData, cacheTTL);
        }
        
        if (!signal.aborted) {
          setData(responseData);
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

    // Cleanup: abort the fetch if the component unmounts or URL changes
    return () => {
      controller.abort();
    };
  }, [url, skipCache, cacheTTL]);

  return { data, loading, error };
};

export default useFetch;