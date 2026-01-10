import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Modern pink
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      letterSpacing: '0.01em',
    },
    body2: {
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.04)',
    '0px 4px 8px rgba(0, 0, 0, 0.06)',
    '0px 8px 16px rgba(0, 0, 0, 0.08)',
    '0px 12px 24px rgba(0, 0, 0, 0.10)',
    '0px 16px 32px rgba(0, 0, 0, 0.12)',
    '0px 20px 40px rgba(0, 0, 0, 0.14)',
    '0px 24px 48px rgba(0, 0, 0, 0.16)',
    '0px 28px 56px rgba(0, 0, 0, 0.18)',
    '0px 32px 64px rgba(0, 0, 0, 0.20)',
    '0px 36px 72px rgba(0, 0, 0, 0.22)',
    '0px 40px 80px rgba(0, 0, 0, 0.24)',
    '0px 44px 88px rgba(0, 0, 0, 0.26)',
    '0px 48px 96px rgba(0, 0, 0, 0.28)',
    '0px 52px 104px rgba(0, 0, 0, 0.30)',
    '0px 56px 112px rgba(0, 0, 0, 0.32)',
    '0px 60px 120px rgba(0, 0, 0, 0.34)',
    '0px 64px 128px rgba(0, 0, 0, 0.36)',
    '0px 68px 136px rgba(0, 0, 0, 0.38)',
    '0px 72px 144px rgba(0, 0, 0, 0.40)',
    '0px 76px 152px rgba(0, 0, 0, 0.42)',
    '0px 80px 160px rgba(0, 0, 0, 0.44)',
    '0px 84px 168px rgba(0, 0, 0, 0.46)',
    '0px 88px 176px rgba(0, 0, 0, 0.48)',
    '0px 92px 184px rgba(0, 0, 0, 0.50)',
  ] as any,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&.Mui-focused': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 500,
          border: 'none',
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&.Mui-selected': {
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            },
          },
        },
      },
    },
  },
});
