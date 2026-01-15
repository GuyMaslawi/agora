import { memo, useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Skeleton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { Country } from '../../types/country';
import { countryCardStyles } from './CountryCard.sx';
import { formatPopulation } from './utils';

interface CountryCardProps {
  country: Country;
  onImageLoad?: () => void;
  onImageError?: () => void;
}

const CountryCard = memo(function CountryCard({ country, onImageLoad, onImageError }: CountryCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    onImageLoad?.();
  }, [onImageLoad]);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
    onImageError?.();
  }, [onImageError]);

  const flagDisplayStyle = useMemo(() => {
    const baseStyle = {
      ...countryCardStyles.flag,
      ...countryCardStyles.flagVisible,
    };
    return {
      ...baseStyle,
      display: imageLoading && !imageError ? 'none' : 'block',
    };
  }, [imageLoading, imageError]);

  return (
    <Card sx={countryCardStyles.card} data-testid="country-card" elevation={0}>
      <Box sx={countryCardStyles.flagContainer}>
        {imageLoading && !imageError && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={countryCardStyles.skeleton}
          />
        )}
        <CardMedia
          component="img"
          height="180"
          image={country.flagUrl}
          alt={`${country.name} flag`}
          sx={flagDisplayStyle}
          loading="eager"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {imageError && (
          <Box sx={countryCardStyles.flagPlaceholder}>
            <Typography variant="body2" sx={countryCardStyles.flagPlaceholderText}>
              {country.code}
            </Typography>
          </Box>
        )}
        <Box sx={countryCardStyles.flagOverlay} />
      </Box>
      <CardContent sx={countryCardStyles.content}>
        <Typography variant="h6" component="div" sx={countryCardStyles.name}>
          {country.name}
        </Typography>
        <Box sx={countryCardStyles.details}>
          <Box sx={countryCardStyles.detailItem}>
            <LocationOnIcon sx={countryCardStyles.icon} />
            <Box>
              <Typography variant="caption" sx={countryCardStyles.label}>
                Capital
              </Typography>
              <Typography variant="body2" sx={countryCardStyles.value}>
                {country.capital}
              </Typography>
            </Box>
          </Box>
          <Box sx={countryCardStyles.detailItem}>
            <PeopleIcon sx={countryCardStyles.icon} />
            <Box>
              <Typography variant="caption" sx={countryCardStyles.label}>
                Population
              </Typography>
              <Typography variant="body2" sx={countryCardStyles.value}>
                {formatPopulation(country.population)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.country.code === nextProps.country.code &&
    prevProps.country.name === nextProps.country.name &&
    prevProps.country.capital === nextProps.country.capital &&
    prevProps.country.population === nextProps.country.population &&
    prevProps.country.flagUrl === nextProps.country.flagUrl &&
    prevProps.onImageLoad === nextProps.onImageLoad &&
    prevProps.onImageError === nextProps.onImageError
  );
});

export default CountryCard;

