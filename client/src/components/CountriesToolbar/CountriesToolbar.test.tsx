import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CountriesToolbar from './CountriesToolbar';
import { SortKey, SortDirection } from '../CountriesPage/CountriesPage';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CountriesToolbar', () => {
  const defaultProps = {
    searchQuery: '',
    sortKey: 'name' as SortKey,
    sortDirection: 'asc' as SortDirection,
    onSearchChange: vi.fn(),
    onSortKeyChange: vi.fn(),
    onSortDirectionChange: vi.fn(),
  };

  it('renders search input and sort controls', () => {
    renderWithTheme(<CountriesToolbar {...defaultProps} />);

    expect(screen.getByPlaceholderText(/search by country name/i)).toBeInTheDocument();
    expect(screen.getByText(/sort by:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /population/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /asc/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /desc/i })).toBeInTheDocument();
  });

  it('calls onSearchChange when search input changes', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    renderWithTheme(<CountriesToolbar {...defaultProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByPlaceholderText(/search by country name/i);
    await user.type(searchInput, 'test');

    expect(onSearchChange).toHaveBeenCalled();
  });
});

