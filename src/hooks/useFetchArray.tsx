// src/hooks/useFetchArray.tsx
import { useState, useEffect } from 'react';
import { ItemResponse, EntityProperties } from '../types/api';
import cacheService from '../services/cache.service';

interface UseFetchArrayOptions {
  skipCache?: boolean;
  cacheTTL?: number;
}

// Cache individual URL responses to avoid re-fetching
async function fetchWithCache(
  url: string, 
  abortSignal?: AbortSignal,
  options: UseFetchArrayOptions = {}
): Promise<ItemResponse<EntityProperties> | null> {
  const { skipCache = false, cacheTTL } = options;

  // Check cache first
  if (!skipCache) {
    const cachedData = cacheService.get<ItemResponse<EntityProperties>>(url);
    if (cachedData !== null) {
      return cachedData;
    }
  }

  try {
    const response = await fetch(url, { signal: abortSignal });
    
    if (response.ok) {
      const data: ItemResponse<EntityProperties> = await response.json();
      
      // Cache the response
      if (!skipCache) {
        cacheService.set(url, data, cacheTTL);
      }
      
      return data;
    } else {
      throw new Error(`Error fetching ${url}: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    if (err instanceof Error && err.name !== 'AbortError') {
      console.error(`Error fetching ${url}:`, err);
    }
    return null;
  }
}

export async function fetchArray(
  urls: string[], 
  batchSize: number = 5, 
  abortSignal?: AbortSignal,
  options: UseFetchArrayOptions = {}
): Promise<string[]> {
  const names: string[] = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    if (abortSignal?.aborted) {
      throw new Error('Fetch Aborted');
    }

    const batchUrls = urls.slice(i, i + batchSize);
    const batchPromises = batchUrls.map(url => 
      fetchWithCache(url, abortSignal, options)
    );
    
    const batchResponses = await Promise.all(batchPromises);

    names.push(
      ...batchResponses
        .filter((response): response is ItemResponse<EntityProperties> => response !== null)
        .map((response) => {
          const properties = response?.result?.properties;
          return properties && 'name' in properties ? properties.name : 
                 properties && 'title' in properties ? (properties as any).title : 
                 null;
        })
        .filter((name): name is string => name !== null)
    );
  }
  
  return names;
}

export function useFetchArray(
  urls: string[], 
  autoFetch: boolean = true,
  options: UseFetchArrayOptions = {}
) {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Destructure options to avoid object reference issues
  const { skipCache = false, cacheTTL } = options;

  useEffect(() => {
    if (!autoFetch || urls.length === 0) {
      setNames([]);
      return;
    }

    const abortController = new AbortController();

    const fetchNames = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use destructured values instead of options object
        const result = await fetchArray(urls, 5, abortController.signal, { skipCache, cacheTTL });
        if (!abortController.signal.aborted) {
          setNames(result);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          if (err instanceof Error && err.message !== 'Fetch Aborted') {
            setError(err.message);
          }
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchNames();

    return () => {
      abortController.abort();
    };
  }, [urls, autoFetch, skipCache, cacheTTL]);

  return { names, loading, error };
}