import { useState, useEffect } from 'react';
import { ApiObject } from '../types/api';

export async function fetchArray(urls: string[], batchSize: number = 5, abortSignal?: AbortSignal): Promise<string[]> {
    const fetchPromises =  
        urls.map((url) => () => fetch(url, { signal: abortSignal })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(`Error fetching ${url}: ${response.status} ${response.statusText}`);
              } 
            })
            .catch(err => {
              if (err.name !== 'AbortError') {
                console.error(`Error fetching ${url}:`, err);
              };
              return null;
            })
        )
    
    const names: string[] = [];

    for (let i = 0; i < fetchPromises.length ; i += batchSize) {
        if (abortSignal?.aborted) {
          throw new Error('Fetch Aborted');
        }

        const batchPromises = fetchPromises.slice(i, i + batchSize).map(fn => fn());
        const batchResponses = await Promise.all(batchPromises);

        names.push(...batchResponses.filter(Boolean).map((object: ApiObject) => object?.result?.properties?.name).filter(Boolean));
    };
    return names;
}

export function useFetchArray(urls: string[], autoFetch: boolean = true) {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoFetch || urls.length === 0) {
      setNames([]);
      return;
    };

    const abortController = new AbortController(); // I forgot to do this before

    const fetchNames = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchArray(urls, 5, abortController.signal);
        if (abortController.signal.aborted) return;
        setNames(result);
      } catch (err) {
        if (!abortController.signal.aborted) {
          if (err instanceof Error && err.message !== 'Fetch Aborted') {
            setError(err.message);
          };
        };
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        };
      };
    };

    fetchNames();

    return () => {
      abortController.abort(); // This is to avoid memory leaks (kinda imoportant)
    };
    
  }, [urls, autoFetch]); 

  return { names, loading, error }; 
}