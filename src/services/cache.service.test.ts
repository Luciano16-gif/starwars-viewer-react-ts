import { beforeEach, describe, expect, it, vi } from 'vitest';
import cacheService from './cache.service';

describe('cacheService', () => {
  beforeEach(() => {
    vi.useRealTimers();
    cacheService.clear();
    localStorage.clear();
  });

  it('stores and retrieves values', () => {
    const url = 'https://api.test/people/1';
    const payload = { name: 'Luke Skywalker' };

    cacheService.set(url, payload);

    expect(cacheService.get<typeof payload>(url)).toEqual(payload);
  });

  it('expires values based on ttl', () => {
    vi.useFakeTimers();
    const url = 'https://api.test/people/2';
    const payload = { name: 'Leia Organa' };
    const now = new Date('2026-03-03T00:00:00.000Z');

    vi.setSystemTime(now);
    cacheService.set(url, payload, 1000);

    vi.setSystemTime(new Date(now.getTime() + 1001));

    expect(cacheService.get(url)).toBeNull();
  });

  it('removes values', () => {
    const url = 'https://api.test/planets/1';
    cacheService.set(url, { name: 'Tatooine' });

    cacheService.remove(url);

    expect(cacheService.get(url)).toBeNull();
  });

  it('keeps distinct entries for similar URLs', () => {
    const dashed = 'https://api.test/people?name=luke-skywalker';
    const underscored = 'https://api.test/people?name=luke_skywalker';
    const dashedPayload = { name: 'Luke dashed' };
    const underscoredPayload = { name: 'Luke underscored' };

    cacheService.set(dashed, dashedPayload);
    cacheService.set(underscored, underscoredPayload);

    expect(cacheService.get(dashed)).toEqual(dashedPayload);
    expect(cacheService.get(underscored)).toEqual(underscoredPayload);
  });

  it('does not cache entries larger than max cache size in memory or localStorage', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const url = 'https://api.test/huge';
    const hugePayload = { value: 'x'.repeat(1_100_000) };

    cacheService.set(url, hugePayload);

    expect(cacheService.get(url)).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith('Cache entry exceeds max cache size, skipping:', url);
    warnSpy.mockRestore();
  });

  it('skips caching when at limit and no entry is available to evict', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const service = cacheService as any;

    service.currentCacheSize = service.MAX_CACHE_SIZE;
    service.memoryCache.clear();
    localStorage.clear();

    cacheService.set('https://api.test/no-space', { name: 'No Space' });

    expect(cacheService.get('https://api.test/no-space')).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      'Cache is full and no entries are available for eviction, skipping:',
      'https://api.test/no-space'
    );
    warnSpy.mockRestore();
  });
});
