import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Grid } from '@mui/material';
import { Country } from '../../types/country';
import CountryCard from '../CountryCard/CountryCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import { countriesGridStyles } from './CountriesGrid.sx';
import { preloadImages, SKELETON_COUNT } from './utils';

interface CountriesGridProps {
  countries: Country[];
  isLoading?: boolean;
}

const CountriesGrid = memo(function CountriesGrid({ countries, isLoading = false }: CountriesGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = useCallback((code: string) => {
    setLoadedImages((prev) => new Set(prev).add(code));
  }, []);

  const handleImageError = useCallback((code: string) => {
    setFailedImages((prev) => new Set(prev).add(code));
    setLoadedImages((prev) => new Set(prev).add(code));
  }, []);

  useEffect(() => {
    setLoadedImages(new Set());
    setFailedImages(new Set());

    if (countries.length > 0) {
      preloadImages(countries, handleImageLoad, handleImageError);
    }
  }, [countries, handleImageLoad, handleImageError]);

  const allImagesLoaded = useMemo(
    () => countries.length > 0 && loadedImages.size + failedImages.size === countries.length,
    [countries.length, loadedImages.size, failedImages.size]
  );

  const skeletonCards = useMemo(
    () => Array.from({ length: SKELETON_COUNT }, (_, index) => (
      <SkeletonCard key={`skeleton-${index}`} index={index} />
    )),
    []
  );

  const countryCards = useMemo(
    () => countries.map((country) => (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        lg={3} 
        key={country.code}
        sx={countriesGridStyles.gridItem}
      >
        <CountryCard 
          country={country} 
          onImageLoad={() => handleImageLoad(country.code)}
          onImageError={() => handleImageError(country.code)}
        />
      </Grid>
    )),
    [countries, handleImageLoad, handleImageError]
  );

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={countriesGridStyles.container}>
        {skeletonCards}
      </Grid>
    );
  }

  if (countries.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  const loadingSkeletons = useMemo(
    () => countries.map((country, index) => (
      <SkeletonCard key={`loading-${country.code}`} index={index} />
    )),
    [countries]
  );

  if (!allImagesLoaded && countries.length > 0) {
    return (
      <Grid container spacing={3} sx={countriesGridStyles.container}>
        {loadingSkeletons}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={countriesGridStyles.container}>
      {countryCards}
    </Grid>
  );
});

export default CountriesGrid;

