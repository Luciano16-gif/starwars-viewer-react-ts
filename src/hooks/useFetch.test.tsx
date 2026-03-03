import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import cacheService from '../services/cache.service';
import useFetch from './useFetch';

function mockResponse<T>(
  data: T,
  ok = true,
  status = 200,
  statusText = 'OK'
): Response {
  return {
    ok,
    status,
    statusText,
    json: async () => data,
  } as Response;
}

describe('useFetch', () => {
  beforeEach(() => {
    cacheService.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cacheService.clear();
  });

  it('fetches data successfully', async () => {
    const url = 'https://api.test/people/1';
    const payload = { result: { properties: { name: 'Luke' } } };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(payload));

    const { result } = renderHook(() => useFetch<typeof payload>(url));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(payload);
    expect(result.current.error).toBeNull();
  });

  it('reads cached data without calling fetch', async () => {
    const url = 'https://api.test/people/2';
    const payload = { result: { properties: { name: 'Leia' } } };
    cacheService.set(url, payload);
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('fetch should not be called'));

    const { result } = renderHook(() => useFetch<typeof payload>(url));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(payload);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('sets error when response is not ok', async () => {
    const url = 'https://api.test/people/3';
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({}, false, 500, 'Internal Server Error')
    );

    const { result } = renderHook(() => useFetch(url));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toContain('500');
  });

  it('bypasses cache when skipCache is true', async () => {
    const url = 'https://api.test/people/4';
    const cachedPayload = { result: { properties: { name: 'Old Leia' } } };
    const freshPayload = { result: { properties: { name: 'Leia Organa' } } };
    cacheService.set(url, cachedPayload);
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(mockResponse(freshPayload));

    const { result } = renderHook(() => useFetch<typeof freshPayload>(url, { skipCache: true }));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(freshPayload);
  });

  it('clears previous data while loading when keepPreviousData is false', async () => {
    const firstUrl = 'https://api.test/people/5';
    const secondUrl = 'https://api.test/people/6';
    const firstPayload = { result: { properties: { name: 'Han' } } };
    const secondPayload = { result: { properties: { name: 'Chewbacca' } } };

    let resolveSecond: ((value: Response) => void) | null = null;
    const secondResponse = new Promise<Response>((resolve) => {
      resolveSecond = resolve;
    });

    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(mockResponse(firstPayload))
      .mockImplementationOnce(() => secondResponse);

    const { result, rerender } = renderHook(
      ({ url }) => useFetch<typeof firstPayload>(url, { keepPreviousData: false }),
      { initialProps: { url: firstUrl } }
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(firstPayload);

    rerender({ url: secondUrl });

    await waitFor(() => expect(result.current.loading).toBe(true));
    expect(result.current.data).toBeNull();

    resolveSecond?.(mockResponse(secondPayload));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(secondPayload);
  });

  it('aborts in-flight request on unmount', async () => {
    const url = 'https://api.test/people/7';
    let capturedSignal: AbortSignal | undefined;

    vi.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => {
      capturedSignal = init?.signal as AbortSignal;
      return new Promise<Response>(() => {
        // Intentionally unresolved to verify cleanup abort.
      });
    });

    const { unmount } = renderHook(() => useFetch(url));

    await waitFor(() => expect(capturedSignal).toBeDefined());
    expect(capturedSignal?.aborted).toBe(false);

    unmount();
    expect(capturedSignal?.aborted).toBe(true);
  });
});
