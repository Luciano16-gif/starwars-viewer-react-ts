import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import ShowAll from './ShowAll';

const { mockedUseFetch } = vi.hoisted(() => ({
  mockedUseFetch: vi.fn(),
}));

vi.mock('../../hooks/useFetch', () => ({
  default: mockedUseFetch,
}));

function LocationSearchProbe() {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
}

function renderShowAll(initialEntry: string) {
  const fields = [{ label: 'Birth Year', key: 'birth_year' }];

  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LocationSearchProbe />
      <Routes>
        <Route path="/people" element={<ShowAll category="people" fields={fields} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ShowAll integration', () => {
  beforeEach(() => {
    vi.useRealTimers();
    mockedUseFetch.mockReset();
    mockedUseFetch.mockReturnValue({
      data: {
        total_pages: 3,
        results: [
          {
            uid: '1',
            name: 'Luke Skywalker',
            url: 'https://api.test/people/1',
            properties: { birth_year: '19BBY' },
          },
        ],
      },
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('updates query params when paginating', async () => {
    renderShowAll('/people?page=2&limit=10');

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    await waitFor(() => {
      expect(screen.getByTestId('location-search').textContent).toContain('page=1');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(screen.getByTestId('location-search').textContent).toContain('page=2');
    });
  });

  it('applies debounced search and resets page to 1', async () => {
    renderShowAll('/people?page=3&limit=10');

    fireEvent.change(screen.getByPlaceholderText('Search people...'), {
      target: { value: 'Luke' },
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
    });

    await waitFor(() => {
      const search = screen.getByTestId('location-search').textContent || '';
      expect(search).toContain('q=Luke');
      expect(search).toContain('page=1');
    }, { timeout: 2000 });
  });

  it('normalizes invalid page and limit query params', async () => {
    renderShowAll('/people?page=abc&limit=0');

    await waitFor(() => {
      const search = screen.getByTestId('location-search').textContent || '';
      expect(search).toContain('page=1');
      expect(search).toContain('limit=9');
    });

    expect(screen.getByRole('combobox')).toHaveValue('9');
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });
});
