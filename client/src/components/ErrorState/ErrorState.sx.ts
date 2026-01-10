import { SxProps, Theme } from '@mui/material';

export const errorStateStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    px: 2,
    py: 4,
  },
  alert: {
    maxWidth: 500,
    width: '100%',
    borderRadius: 4,
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
    border: '1px solid rgba(211, 47, 47, 0.3)',
    boxShadow: '0 8px 32px rgba(211, 47, 47, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
    '& .MuiAlert-message': {
      width: '100%',
    },
  },
  alertTitle: {
    fontWeight: 700,
    fontSize: '1.25rem',
    mb: 1,
  },
  retryButton: {
    mt: 2.5,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
    '&:hover': {
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      boxShadow: '0 6px 16px rgba(99, 102, 241, 0.5)',
      transform: 'translateY(-1px)',
    },
    transition: 'all 0.2s ease-in-out',
  },
};

