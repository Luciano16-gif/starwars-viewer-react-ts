interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheService {
    private memoryCache: Map<string, CacheEntry<any>> = new Map();
    private readonly CACHE_PREFIX = 'swapi_cache_';
    private readonly DEFAULT_TTL = parseInt(process.env.REACT_APP_CACHE_TTL || '300000'); // Default 5 minutes in milliseconds
    private readonly MAX_CACHE_SIZE = parseInt(process.env.REACT_APP_MAX_CACHE_SIZE || '2097152'); // Default 2 MB
    private bytes(str: string): number { return str.length * 2; }
    private currentCacheSize: number = 0; 

  constructor() {
    // Initialize memory cache from localStorage on startup
    this.initializeMemoryCache();
    
    // Clean up expired entries on initialization
    this.cleanupExpiredEntries();
  }

  private initializeMemoryCache(): void {
    try {
        for (let i: number = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(this.CACHE_PREFIX)) {
                const cacheKey = key.replace(this.CACHE_PREFIX, '');
                const item = localStorage.getItem(key);
                try {
                    if (item) {
                        const entry = JSON.parse(item);
                        this.memoryCache.set(cacheKey, entry);
                        this.currentCacheSize += this.bytes(item);
                    }
                } catch (e) {
                    //invalid entry, remove it
                    localStorage.removeItem(key);
                }
            }
        }
    } catch (error) {
      console.error('Error initializing memory cache:', error);
    }
  }

  private getCacheKey(url: string): string {
    // Create a normalized cache key from URL
    return url.replace(/[^a-zA-Z0-9]/g, '_');
  }

  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() > entry.timestamp + entry.ttl;
  }

  private cleanupExpiredEntries(): void {
    const keysToRemove: string[] = [];
    
    // Check memory cache
    this.memoryCache.forEach((entry, key) => {
      if (this.isExpired(entry)) {
        keysToRemove.push(key);
      }
    });

    // Remove expired entries
    keysToRemove.forEach(key => {
      const localStorageKey = this.CACHE_PREFIX + key;
      const item = localStorage.getItem(localStorageKey);
      
      this.memoryCache.delete(key);
      localStorage.removeItem(localStorageKey);
      
      if (item) {
        this.currentCacheSize -= this.bytes(item);
      }
    });
  }

  remove(url: string): void {
    const cacheKey = this.getCacheKey(url);
    const localStorageKey = this.CACHE_PREFIX + cacheKey;
    const item = localStorage.getItem(localStorageKey);
    
    this.memoryCache.delete(cacheKey);
    localStorage.removeItem(localStorageKey);
    
    if (item) {
      this.currentCacheSize -= this.bytes(item);
    }
  }

  private evictRandomEntry(): void {
    const keys = Array.from(this.memoryCache.keys());
    const victimKey = keys[Math.floor(Math.random() * keys.length)];
    const localStorageKey = this.CACHE_PREFIX + victimKey;
    const item = localStorage.getItem(localStorageKey);
    
    this.memoryCache.delete(victimKey);
    localStorage.removeItem(localStorageKey);
    
    if (item) {
      this.currentCacheSize -= this.bytes(item);
    }
  }

  set<T>(url: string, data: T, ttl?: number): void {
    const cacheKey = this.getCacheKey(url);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.DEFAULT_TTL
    };

    // Update memory cache
    this.memoryCache.set(cacheKey, entry);

    // Update localStorage
    try {
      const localStorageKey = this.CACHE_PREFIX + cacheKey;
      const serialized = JSON.stringify(entry);
      const bytes = this.bytes(serialized);
      
      // Check if we're approaching storage limit
      while (this.currentCacheSize + bytes > this.MAX_CACHE_SIZE) {
        this.evictRandomEntry();
      }

      localStorage.setItem(localStorageKey, serialized);
      this.currentCacheSize += bytes;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, clearing old entries');
        this.evictRandomEntry();
        
        // Try again
        try {
          const retryKey = this.CACHE_PREFIX + cacheKey;
          const retrySerialized = JSON.stringify(entry);
          localStorage.setItem(retryKey, retrySerialized);
          this.currentCacheSize += this.bytes(retrySerialized);
        } catch (retryError) {
          console.error('Failed to cache after cleanup:', retryError);
        }
      } else {
        console.error('Error setting cache:', error);
      }
    }
  }

  get<T>(url: string): T | null {
    const cacheKey = this.getCacheKey(url);
    
    // Check memory cache first
    const memoryEntry = this.memoryCache.get(cacheKey);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      return memoryEntry.data;
    }

    // Check localStorage
    try {
      const localStorageKey = this.CACHE_PREFIX + cacheKey;
      const item = localStorage.getItem(localStorageKey);
      
      if (item) {
        const entry: CacheEntry<T> = JSON.parse(item);
        
        if (!this.isExpired(entry)) {
          // Update memory cache
          this.memoryCache.set(cacheKey, entry);
          return entry.data;
        } else {
          // Remove expired entry
          this.memoryCache.delete(cacheKey);
          localStorage.removeItem(localStorageKey);
          this.currentCacheSize -= this.bytes(item);
        }
      }
    } catch (error) {
      console.error('Error reading from cache:', error);
    }

    return null;
  }
  clear(): void {
    // Clear memory cache
    this.memoryCache.clear();

    // Clear localStorage entries
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    this.currentCacheSize = 0;
  }

    // Get cache statistics
  getStats(): {
    memoryEntries: number;
    localStorageEntries: number;
    totalSize: number;
    sizeInMB: string;
    percentUsed: number;
  } {
    this.cleanupExpiredEntries();
    let localStorageEntries = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.CACHE_PREFIX)) {
        localStorageEntries++;
      }
    }

    const totalSize = this.currentCacheSize;
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
    const percentUsed = Math.round((totalSize / this.MAX_CACHE_SIZE) * 100);

    return {
      memoryEntries: this.memoryCache.size,
      localStorageEntries,
      totalSize,
      sizeInMB,
      percentUsed
    };
  }

}

const cacheService = new CacheService(); 

export default cacheService;