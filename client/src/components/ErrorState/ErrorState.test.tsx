import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorState from './ErrorState';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ErrorState', () => {
  it('renders default error message and retry button', () => {
    const onRetry = vi.fn();
    renderWithTheme(<ErrorState onRetry={onRetry} />);

    expect(screen.getByText(/failed to fetch countries/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('renders custom error message when provided', () => {
    const onRetry = vi.fn();
    const customMessage = 'Custom error message';
    renderWithTheme(<ErrorState onRetry={onRetry} errorMessage={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    renderWithTheme(<ErrorState onRetry={onRetry} />);

    const retryButton = screen.getByRole('button', { name: /retry/i });
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

