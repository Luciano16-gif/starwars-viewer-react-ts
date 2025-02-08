import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T,>(url: string | null): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setData(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    fetch(url, { signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: T) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          // Fetch was aborted – do nothing
          console.log('Fetch aborted');
        } else {
          setLoading(false);
          setError(err.message || 'Unknown Error');
        }
      });

    // Cleanup: abort the fetch if the component unmounts or URL changes.
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
