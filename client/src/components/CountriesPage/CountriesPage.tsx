import { memo, useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../../api/countries';
import { Country } from '../../types/country';
import CountriesToolbar from '../CountriesToolbar/CountriesToolbar';
import CountriesGrid from '../CountriesGrid/CountriesGrid';
import ErrorState from '../ErrorState/ErrorState';
import { Box, Typography, Container } from '@mui/material';
import { countriesPageStyles } from './CountriesPage.sx';
import { filterAndSortCountries } from './utils';

export type SortKey = 'name' | 'population';
export type SortDirection = 'asc' | 'desc';

const CountriesPage = memo(function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const { data: countries = [], isLoading, error, refetch } = useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortKeyChange = useCallback((key: SortKey) => {
    setSortKey(key);
  }, []);

  const handleSortDirectionChange = useCallback((direction: SortDirection) => {
    setSortDirection(direction);
  }, []);

  const filteredAndSortedCountries = useMemo(
    () => filterAndSortCountries(countries, searchQuery, sortKey, sortDirection),
    [countries, searchQuery, sortKey, sortDirection]
  );

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch countries. Please try again.';
    return <ErrorState onRetry={handleRetry} errorMessage={errorMessage} />;
  }

  return (
    <Box sx={countriesPageStyles.container}>
      <Box sx={countriesPageStyles.header}>
        <Typography variant="h3" sx={countriesPageStyles.title}>
          Countries Explorer
        </Typography>
        <Typography variant="body1" sx={countriesPageStyles.subtitle}>
          Discover countries from around the world
        </Typography>
      </Box>
      <Container maxWidth="xl" sx={countriesPageStyles.content}>
        <CountriesToolbar
          searchQuery={searchQuery}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSearchChange={handleSearchChange}
          onSortKeyChange={handleSortKeyChange}
          onSortDirectionChange={handleSortDirectionChange}
        />
        <CountriesGrid countries={filteredAndSortedCountries} isLoading={isLoading} />
      </Container>
    </Box>
  );
});

export default CountriesPage;

