import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EmptyState from './EmptyState';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('EmptyState', () => {
  it('renders empty state message', () => {
    renderWithTheme(<EmptyState />);

    expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
    expect(screen.getByText(/try adjusting your search/i)).toBeInTheDocument();
  });

  it('renders search icon', () => {
    renderWithTheme(<EmptyState />);
    
    const icon = screen.getByTestId('SearchOffIcon') || screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });
});

