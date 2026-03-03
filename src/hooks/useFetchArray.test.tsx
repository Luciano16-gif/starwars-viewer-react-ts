import { beforeEach, describe, expect, it, vi } from 'vitest';
import cacheService from '../services/cache.service';
import { fetchArray } from './useFetchArray';

function mockResponse<T>(data: T): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => data,
  } as Response;
}

describe('useFetchArray and fetchArray', () => {
  beforeEach(() => {
    cacheService.clear();
    vi.restoreAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('resolves names and titles preserving order', async () => {
    const urls = ['https://api.test/people/1', 'https://api.test/films/1'];
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(
      async (input: any) => {
        const url = String(input);
        if (url.includes('/people/1')) {
          return mockResponse({ result: { properties: { name: 'Luke' } } });
        }
        return mockResponse({ result: { properties: { title: 'A New Hope' } } });
      }
    );

    const items = await fetchArray(urls, 2);

    expect(items).toEqual([
      { url: urls[0], name: 'Luke' },
      { url: urls[1], name: 'A New Hope' },
    ]);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('uses cache between calls', async () => {
    const url = 'https://api.test/species/1';
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(mockResponse({ result: { properties: { name: 'Human' } } }));

    await fetchArray([url], 1);
    await fetchArray([url], 1);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('calls onBatch with correct start indexes', async () => {
    const urls = [
      'https://api.test/people/1',
      'https://api.test/people/2',
      'https://api.test/people/3',
    ];

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input: any) => {
      const id = String(input).split('/').pop();
      return mockResponse({ result: { properties: { name: `Person ${id}` } } });
    });

    const onBatch = vi.fn();
    const items = await fetchArray(urls, 2, undefined, {}, onBatch);

    expect(items).toEqual([
      { url: urls[0], name: 'Person 1' },
      { url: urls[1], name: 'Person 2' },
      { url: urls[2], name: 'Person 3' },
    ]);
    expect(onBatch).toHaveBeenCalledTimes(2);
    expect(onBatch.mock.calls[0][1]).toBe(0);
    expect(onBatch.mock.calls[1][1]).toBe(2);
  });

  it('throws when called with an already aborted signal', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      fetchArray(['https://api.test/people/1'], 1, controller.signal)
    ).rejects.toThrow('Fetch Aborted');
  });

  it('returns null names for failed fetches instead of throwing', async () => {
    const url = 'https://api.test/broken/1';
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({}),
    } as Response);

    const items = await fetchArray([url], 1);

    expect(items).toEqual([{ url, name: null }]);
  });
});
