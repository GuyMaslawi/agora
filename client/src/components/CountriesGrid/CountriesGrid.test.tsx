import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CountriesGrid from './CountriesGrid';
import { Country } from '../../types/country';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockCountry: Country = {
  code: 'US',
  name: 'United States',
  capital: 'Washington, D.C.',
  population: 331000000,
  flagUrl: 'https://flagcdn.com/w320/us.png',
};

describe('CountriesGrid', () => {
  it('renders countries as cards', () => {
    const countries: Country[] = [mockCountry];
    renderWithTheme(<CountriesGrid countries={countries} />);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
  });

  it('renders empty state when no countries', () => {
    renderWithTheme(<CountriesGrid countries={[]} />);

    expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
  });
});

