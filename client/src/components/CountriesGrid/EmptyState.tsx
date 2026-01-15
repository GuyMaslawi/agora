import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { countriesGridStyles } from './CountriesGrid.sx';

const EmptyState = memo(function EmptyState() {
  return (
    <Box sx={countriesGridStyles.emptyState}>
      <SearchOffIcon sx={countriesGridStyles.emptyIcon} />
      <Typography variant="h6" sx={countriesGridStyles.emptyTitle}>
        No countries found
      </Typography>
      <Typography variant="body2" sx={countriesGridStyles.emptyText}>
        Try adjusting your search or filters to find what you're looking for.
      </Typography>
    </Box>
  );
});

export default EmptyState;

