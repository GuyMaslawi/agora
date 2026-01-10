import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoadingState from './LoadingState';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('LoadingState', () => {
  it('renders loading indicator and text', () => {
    renderWithTheme(<LoadingState />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });
});

