import { SxProps, Theme } from '@mui/material';

export const countriesGridStyles: Record<string, SxProps<Theme>> = {
  container: {
    width: '100%',
  },
  gridItem: {
    // Items are fully visible immediately - no initial opacity: 0
    opacity: 1,
    transform: 'translateY(0)',
    // Optional subtle enhancement animation that doesn't block visibility
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  },
  emptyState: {
    textAlign: 'center',
    py: 10,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  emptyIcon: {
    fontSize: '5rem',
    color: 'text.secondary',
    opacity: 0.5,
    mb: 1,
    animation: 'float 3s ease-in-out infinite',
    '@keyframes float': {
      '0%, 100%': {
        transform: 'translateY(0px)',
      },
      '50%': {
        transform: 'translateY(-10px)',
      },
    },
  },
  emptyTitle: {
    fontWeight: 600,
    color: 'text.primary',
    fontSize: '1.5rem',
    letterSpacing: '-0.01em',
  },
  emptyText: {
    color: 'text.secondary',
    maxWidth: 400,
    lineHeight: 1.6,
  },
};

