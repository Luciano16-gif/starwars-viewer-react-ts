import { useState, useEffect } from 'react';
import { ApiObject } from '../types/api';

export async function fetchArray(urls: string[], batchSize: number = 5): Promise<string[]> {
    const fetchPromises =  
        urls.map((url) => () => fetch(url)
            .then(response => response.ok ? response.json() : null)
            .catch(err => {
                console.error(`Error fetching ${url}: ${err}`);
            return null;
            })
        )
    
    const names: string[] = [];

    for (let i = 0; i < fetchPromises.length ; i += batchSize) {
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
    }

    const fetchNames = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchArray(urls);
        setNames(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [urls, autoFetch]); 

  return { names, loading, error }; 
}