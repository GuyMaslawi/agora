import { SxProps, Theme } from '@mui/material';

export const countriesToolbarStyles: Record<string, SxProps<Theme>> = {
  container: {
    mb: 5,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 2.5,
    alignItems: { xs: 'stretch', sm: 'center' },
    p: 3,
    borderRadius: 4,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
  },
  searchInput: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      '& fieldset': {
        borderColor: 'rgba(99, 102, 241, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(99, 102, 241, 0.4)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
        borderWidth: '2px',
      },
    },
  },
  searchIcon: {
    color: 'primary.main',
    fontSize: '1.5rem',
  },
  sortControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    flexWrap: 'wrap',
  },
  sortLabel: {
    whiteSpace: 'nowrap',
    fontWeight: 600,
    color: 'text.secondary',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  toggleGroup: {
    '& .MuiToggleButton-root': {
      '&.Mui-selected': {
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
      },
    },
  },
  sortIcon: {
    mr: 0.5,
    fontSize: '1rem',
  },
  directionIcon: {
    fontSize: '1rem',
  },
};

