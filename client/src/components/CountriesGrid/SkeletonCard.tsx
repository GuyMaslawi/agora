import { memo } from 'react';
import { Card, CardContent, Skeleton, Box, Grid } from '@mui/material';
import { countriesGridStyles } from './CountriesGrid.sx';

interface SkeletonCardProps {
  index: number;
}

const SkeletonCard = memo(function SkeletonCard({ index }: SkeletonCardProps) {
  return (
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
          <Skeleton variant="text" sx={countriesGridStyles.skeletonTitle} />
          <Box sx={countriesGridStyles.skeletonDetails}>
            <Box sx={countriesGridStyles.skeletonDetailItem}>
              <Skeleton variant="circular" sx={countriesGridStyles.skeletonIcon} />
              <Box sx={countriesGridStyles.skeletonDetailText}>
                <Skeleton variant="text" sx={countriesGridStyles.skeletonLabel} />
                <Skeleton variant="text" sx={countriesGridStyles.skeletonValue} />
              </Box>
            </Box>
            <Box sx={countriesGridStyles.skeletonDetailItem}>
              <Skeleton variant="circular" sx={countriesGridStyles.skeletonIcon} />
              <Box sx={countriesGridStyles.skeletonDetailText}>
                <Skeleton variant="text" sx={countriesGridStyles.skeletonLabel} />
                <Skeleton variant="text" sx={countriesGridStyles.skeletonValueSmall} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
});

export default SkeletonCard;

