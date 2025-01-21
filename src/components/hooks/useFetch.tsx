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

        setLoading(true);
        fetch(url)
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
                setLoading(false);
                setError(err.message || 'Unknown Error');
            });
    }, [url]);
    return { data, loading, error };
};

export default useFetch;
