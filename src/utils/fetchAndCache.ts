import cacheService from "../services/cache.service";

interface FetchAndCacheOptions {
    skipCache?: boolean;
    cacheTTL?: number;
}

export const fetchAndCache = async <T = any>(url: string, options: FetchAndCacheOptions = {}): Promise<T> => {
    const { skipCache = false, cacheTTL } = options;
    let data: T | null = null;

    const fetchData = async () => {
      if (!skipCache) {
        const cachedData = cacheService.get<any>(url);
        if (cachedData !== null) {
          data = cachedData;
          return;
        }
      }
      const res = await fetch(url);
      if (res.ok) {
        data = await res.json();
      if (!skipCache) {
        cacheService.set(url, data, cacheTTL);
        }
      }
    }

    await fetchData();
    return data as T;
}