import { memo, useState, useEffect, useCallback } from 'react';
import { Grid, Box, Typography, Card, CardContent, Skeleton } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Country } from '../../types/country';
import CountryCard from '../CountryCard/CountryCard';
import { countriesGridStyles } from './CountriesGrid.sx';

interface CountriesGridProps {
  countries: Country[];
  isLoading?: boolean;
}

const SKELETON_COUNT = 12;

const CountriesGrid = memo(function CountriesGrid({ countries, isLoading = false }: CountriesGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoadedImages(new Set());
    setFailedImages(new Set());

    const preloadImages = () => {
      countries.forEach((country) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(country.code));
        };
        img.onerror = () => {
          setFailedImages((prev) => new Set(prev).add(country.code));
          setLoadedImages((prev) => new Set(prev).add(country.code));
        };
        img.src = country.flagUrl;
      });
    };

    if (countries.length > 0) {
      preloadImages();
    }
  }, [countries]);

  const allImagesLoaded = countries.length > 0 && 
    loadedImages.size + failedImages.size === countries.length;

  const handleImageLoad = useCallback((countryCode: string) => {
    setLoadedImages((prev) => new Set(prev).add(countryCode));
  }, []);

  const handleImageError = useCallback((countryCode: string) => {
    setFailedImages((prev) => new Set(prev).add(countryCode));
    setLoadedImages((prev) => new Set(prev).add(countryCode));
  }, []);

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={countriesGridStyles.container}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={`skeleton-${index}`}
            sx={countriesGridStyles.gridItem}
          >
            <Card sx={countriesGridStyles.skeletonCard} elevation={0}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={180}
                sx={countriesGridStyles.skeletonFlag}
              />
              <CardContent sx={countriesGridStyles.skeletonContent}>
                <Skeleton variant="text" width="70%" height={32} sx={{ mb: 2 }} />
                <Box sx={countriesGridStyles.skeletonDetails}>
                  <Box sx={countriesGridStyles.skeletonDetailItem}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Box sx={{ flex: 1, ml: 1 }}>
                      <Skeleton variant="text" width="40%" height={14} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="80%" height={20} />
                    </Box>
                  </Box>
                  <Box sx={countriesGridStyles.skeletonDetailItem}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Box sx={{ flex: 1, ml: 1 }}>
                      <Skeleton variant="text" width="40%" height={14} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

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

  if (!allImagesLoaded) {
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
            <Card sx={countriesGridStyles.skeletonCard} elevation={0}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={180}
                sx={countriesGridStyles.skeletonFlag}
              />
              <CardContent sx={countriesGridStyles.skeletonContent}>
                <Skeleton variant="text" width="70%" height={32} sx={{ mb: 2 }} />
                <Box sx={countriesGridStyles.skeletonDetails}>
                  <Box sx={countriesGridStyles.skeletonDetailItem}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Box sx={{ flex: 1, ml: 1 }}>
                      <Skeleton variant="text" width="40%" height={14} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="80%" height={20} />
                    </Box>
                  </Box>
                  <Box sx={countriesGridStyles.skeletonDetailItem}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Box sx={{ flex: 1, ml: 1 }}>
                      <Skeleton variant="text" width="40%" height={14} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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
          <CountryCard 
            country={country} 
            onImageLoad={() => handleImageLoad(country.code)}
            onImageError={() => handleImageError(country.code)}
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default CountriesGrid;

