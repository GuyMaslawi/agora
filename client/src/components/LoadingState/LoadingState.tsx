import { memo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { loadingStateStyles } from './LoadingState.sx';

const LoadingState = memo(function LoadingState() {
  return (
    <Box sx={loadingStateStyles.container}>
      <Box sx={loadingStateStyles.loaderContainer}>
        <PublicIcon sx={loadingStateStyles.icon} />
        <CircularProgress 
          size={80} 
          thickness={4}
          sx={loadingStateStyles.progress}
          role="progressbar"
        />
      </Box>
      <Typography variant="h6" sx={loadingStateStyles.text}>
        Loading countries...
      </Typography>
      <Typography variant="body2" sx={loadingStateStyles.subtext}>
        Exploring the world for you
      </Typography>
    </Box>
  );
});

export default LoadingState;

