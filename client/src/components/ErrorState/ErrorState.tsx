import { memo, useMemo } from 'react';
import { Box, Alert, AlertTitle, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { errorStateStyles } from './ErrorState.sx';

interface ErrorStateProps {
  onRetry: () => void;
  errorMessage?: string;
}

const ErrorState = memo(function ErrorState({ onRetry, errorMessage }: ErrorStateProps) {
  const displayMessage = useMemo(
    () => errorMessage || 'Failed to fetch countries. Please try again.',
    [errorMessage]
  );

  return (
    <Box sx={errorStateStyles.container}>
      <Alert 
        severity="error" 
        sx={errorStateStyles.alert}
        icon={<ErrorOutlineIcon sx={errorStateStyles.errorIcon} />}
      >
        <AlertTitle sx={errorStateStyles.alertTitle}>Oops! Something went wrong</AlertTitle>
        {displayMessage}
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          startIcon={<RefreshIcon />}
          sx={errorStateStyles.retryButton}
        >
          Try Again
        </Button>
      </Alert>
    </Box>
  );
});

export default ErrorState;

