import { SxProps, Theme } from '@mui/material';

export const loadingStateStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: 2.5,
    position: 'relative',
  },
  loaderContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    fontSize: '2.5rem',
    color: 'primary.main',
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%, 100%': {
        opacity: 1,
        transform: 'scale(1)',
      },
      '50%': {
        opacity: 0.7,
        transform: 'scale(1.1)',
      },
    },
  },
  progress: {
    color: 'primary.main',
    filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))',
  },
  text: {
    color: 'text.primary',
    fontWeight: 600,
    fontSize: '1.25rem',
    letterSpacing: '-0.01em',
    mt: 1,
  },
  subtext: {
    color: 'text.secondary',
    fontWeight: 400,
    fontSize: '0.9rem',
  },
};

