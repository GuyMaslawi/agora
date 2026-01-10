import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CountriesPage from './CountriesPage';
import { fetchCountries } from '../../api/countries';
import { Country } from '../../types/country';

vi.mock('../../api/countries');

const theme = createTheme();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const mockCountries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    capital: 'Washington, D.C.',
    population: 331000000,
    flagUrl: 'https://flagcdn.com/w320/us.png',
  },
  {
    code: 'CA',
    name: 'Canada',
    capital: 'Ottawa',
    population: 38000000,
    flagUrl: 'https://flagcdn.com/w320/ca.png',
  },
  {
    code: 'MX',
    name: 'Mexico',
    capital: 'Mexico City',
    population: 128000000,
    flagUrl: 'https://flagcdn.com/w320/mx.png',
  },
];

describe('CountriesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state while request is pending', async () => {
    vi.mocked(fetchCountries).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<CountriesPage />, { wrapper: createWrapper() });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state on failure and retry triggers refetch', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCountries).mockRejectedValueOnce(new Error('Network error'));

    render(<CountriesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch countries/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();

    await user.click(retryButton);

    await waitFor(() => {
      expect(fetchCountries).toHaveBeenCalledTimes(2);
    });
  });

  it('renders countries', async () => {
    vi.mocked(fetchCountries).mockResolvedValueOnce(mockCountries);

    render(<CountriesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.getByText('Mexico')).toBeInTheDocument();
    });
  });

  it('filters results by search query', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCountries).mockResolvedValueOnce(mockCountries);

    render(<CountriesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.clear(searchInput);
    await user.type(searchInput, 'Canada');

    await waitFor(() => {
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.queryByText('United States')).not.toBeInTheDocument();
      expect(screen.queryByText('Mexico')).not.toBeInTheDocument();
    });
  });

  it('sorts by name ascending', async () => {
    vi.mocked(fetchCountries).mockResolvedValueOnce(mockCountries);

    render(<CountriesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const cards = screen.getAllByTestId('country-card');
    expect(cards[0]).toHaveTextContent('Canada');
    expect(cards[1]).toHaveTextContent('Mexico');
    expect(cards[2]).toHaveTextContent('United States');
  });

  it('sorts by name descending', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCountries).mockResolvedValueOnce(mockCountries);

    render(<CountriesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const sortDirectionButton = screen.getByRole('button', { name: /desc/i });
    await user.click(sortDirectionButton);

    await waitFor(() => {
      const cards = screen.getAllByTestId('country-card');
      expect(cards[0]).toHaveTextContent('United States');
      expect(cards[1]).toHaveTextContent('Mexico');
      expect(cards[2]).toHaveTextContent('Canada');
    });
  });

  it('sorts by population ascending', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCountries).mockResolvedValueOnce(mockCountries);

    render(<CountriesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const populationButton = screen.getByRole('button', { name: /population/i });
    await user.click(populationButton);

    await waitFor(() => {
      const cards = screen.getAllByTestId('country-card');
      expect(cards[0]).toHaveTextContent('Canada');
      expect(cards[1]).toHaveTextContent('Mexico');
      expect(cards[2]).toHaveTextContent('United States');
    });
  });

  it('sorts by population descending', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCountries).mockResolvedValueOnce(mockCountries);

    render(<CountriesPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const populationButton = screen.getByRole('button', { name: /population/i });
    await user.click(populationButton);

    const sortDirectionButton = screen.getByRole('button', { name: /desc/i });
    await user.click(sortDirectionButton);

    await waitFor(() => {
      const cards = screen.getAllByTestId('country-card');
      expect(cards[0]).toHaveTextContent('United States');
      expect(cards[1]).toHaveTextContent('Mexico');
      expect(cards[2]).toHaveTextContent('Canada');
    });
  });
});

