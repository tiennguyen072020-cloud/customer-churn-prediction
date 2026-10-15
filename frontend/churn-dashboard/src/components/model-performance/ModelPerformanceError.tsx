import {
  Alert,
  Button,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";


interface Props {
  onRetry: () => void;
}


export default function ModelPerformanceError({
  onRetry,
}: Props) {

  return (
    <Alert
      severity="error"
      action={
        <Button
          color="inherit"
          size="small"
          startIcon={
            <RefreshIcon />
          }
          onClick={onRetry}
        >
          Retry
        </Button>
      }
    >
      Failed to load model performance data.
    </Alert>
  );
}