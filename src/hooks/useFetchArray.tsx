import { useState, useEffect } from 'react';
import { ItemResponse, EntityProperties } from '../types/api';
import cacheService from '../services/cache.service';

interface UseFetchArrayOptions {
  skipCache?: boolean;
  cacheTTL?: number;
}

export interface ResolvedName {
  url: string;
  name: string | null;
}

type BatchUpdate = (batchItems: ResolvedName[], startIndex: number) => void;

function getEntityName(response: ItemResponse<EntityProperties> | null): string | null {
  if (!response) return null;
  const properties = response?.result?.properties;
  if (properties && 'name' in properties) return properties.name;
  if (properties && 'title' in properties) return (properties as any).title;
  return null;
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
  options: UseFetchArrayOptions = {},
  onBatch?: BatchUpdate
): Promise<ResolvedName[]> {
  const items: ResolvedName[] = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    if (abortSignal?.aborted) {
      throw new Error('Fetch Aborted');
    }

    const batchUrls = urls.slice(i, i + batchSize);
    const batchPromises = batchUrls.map(url => 
      fetchWithCache(url, abortSignal, options)
    );
    
    const batchResponses = await Promise.all(batchPromises);

    const batchItems = batchResponses.map((response, index) => ({
      url: batchUrls[index],
      name: getEntityName(response)
    }));

    items.push(...batchItems);
    onBatch?.(batchItems, i);
  }
  
  return items;
}

export function useFetchArray(
  urls: string[], 
  autoFetch: boolean = true,
  options: UseFetchArrayOptions = {}
) {
  const [items, setItems] = useState<ResolvedName[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Destructure options to avoid object reference issues
  const { skipCache = false, cacheTTL } = options;

  useEffect(() => {
    if (!autoFetch || urls.length === 0) {
      setItems([]);
      setLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();

    const fetchNames = async () => {
      const initialItems: ResolvedName[] = urls.map((url) => ({ url, name: null }));
      let currentItems = initialItems;

      setLoading(true);
      setError(null);
      setItems(initialItems);
      
      try {
        const handleBatchUpdate: BatchUpdate = (batchItems, startIndex) => {
          if (abortController.signal.aborted) return;
          batchItems.forEach((item, index) => {
            currentItems[startIndex + index] = item;
          });
          setItems([...currentItems]);
        };

        // Use destructured values instead of options object
        const result = await fetchArray(
          urls, 
          5, 
          abortController.signal, 
          { skipCache, cacheTTL },
          handleBatchUpdate
        );
        if (!abortController.signal.aborted) {
          setItems(result);
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

  return { items, loading, error };
}
