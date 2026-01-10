import { memo } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Country } from '../../types/country';
import CountryCard from '../CountryCard/CountryCard';
import { countriesGridStyles } from './CountriesGrid.sx';

interface CountriesGridProps {
  countries: Country[];
}

const CountriesGrid = memo(function CountriesGrid({ countries }: CountriesGridProps) {
  if (countries.length === 0) {
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
  }

  return (
    <Grid container spacing={3} sx={countriesGridStyles.container}>
      {countries.map((country) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          lg={3} 
          key={country.code}
          sx={countriesGridStyles.gridItem}
        >
          <CountryCard country={country} />
        </Grid>
      ))}
    </Grid>
  );
});

export default CountriesGrid;

