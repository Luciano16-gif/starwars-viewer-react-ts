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
});
