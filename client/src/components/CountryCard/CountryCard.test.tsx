import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CountryCard from './CountryCard';
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

describe('CountryCard', () => {
  it('renders country information', () => {
    renderWithTheme(<CountryCard country={mockCountry} />);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText(/washington, d\.c\./i)).toBeInTheDocument();
    expect(screen.getByText(/331,000,000/i)).toBeInTheDocument();
    expect(screen.getByAltText(/united states flag/i)).toBeInTheDocument();
  });

  it('formats population with commas', () => {
    const countryWithLargePopulation: Country = {
      ...mockCountry,
      population: 1234567890,
    };

    renderWithTheme(<CountryCard country={countryWithLargePopulation} />);

    expect(screen.getByText(/1,234,567,890/i)).toBeInTheDocument();
  });
});

