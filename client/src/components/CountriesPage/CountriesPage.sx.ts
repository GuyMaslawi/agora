import { SxProps, Theme } from '@mui/material';

export const countriesPageStyles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
      pointerEvents: 'none',
    },
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },
  header: {
    textAlign: 'center',
    py: 6,
    px: 2,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontWeight: 800,
    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    mb: 1.5,
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
    letterSpacing: '-0.03em',
    textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: { xs: '0.95rem', sm: '1.1rem' },
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    py: 4,
  },
};

