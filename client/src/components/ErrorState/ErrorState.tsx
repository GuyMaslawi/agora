import { Box, Alert, AlertTitle, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { errorStateStyles } from './ErrorState.sx';

interface ErrorStateProps {
  onRetry: () => void;
  errorMessage?: string;
}

const ErrorState = ({ onRetry, errorMessage }: ErrorStateProps) => {
  const displayMessage = errorMessage || 'Failed to fetch countries. Please try again.';

  return (
    <Box sx={errorStateStyles.container}>
      <Alert 
        severity="error" 
        sx={errorStateStyles.alert}
        icon={<ErrorOutlineIcon sx={{ fontSize: '2rem' }} />}
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
};

export default ErrorState;

