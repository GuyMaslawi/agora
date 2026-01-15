import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SkeletonCard from './SkeletonCard';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SkeletonCard', () => {
  it('renders skeleton card structure', () => {
    const { container } = renderWithTheme(<SkeletonCard index={0} />);

    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument();
  });

  it('renders multiple skeleton elements', () => {
    const { container } = renderWithTheme(<SkeletonCard index={0} />);

    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

