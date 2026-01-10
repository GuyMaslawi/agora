import { SxProps, Theme } from '@mui/material';

export const countriesGridStyles: Record<string, SxProps<Theme>> = {
  container: {
    width: '100%',
  },
  gridItem: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  },
  skeletonCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skeletonFlag: {
    bgcolor: 'rgba(99, 102, 241, 0.1)',
  },
  skeletonContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    p: 2.5,
    pb: 2.5,
  },
  skeletonDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    mt: 'auto',
  },
  skeletonDetailItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
    p: 1,
    borderRadius: 2,
    background: 'rgba(99, 102, 241, 0.05)',
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

