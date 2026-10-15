import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  useHealth,
} from "../../hooks/useHealth";


function ApiStatusCard() {

  const {
    data,
    isLoading,
    isError,
  } = useHealth();


  if (isLoading) {

    return (

      <Card>

        <CardContent>

          <Stack
           sx={{ 
            direction:"row",
            spacing:2,
            alignItems:"center"
        }}
          >

            <CircularProgress
              size={20}
            />

            <Typography>
              Checking API...
            </Typography>

          </Stack>

        </CardContent>

      </Card>

    );

  }


  if (isError) {

    return (

      <Alert severity="error">

        Prediction API is unavailable.

      </Alert>

    );

  }


  return (

    <Alert severity="success">

      API status:{" "}

      <strong>
        {data?.status}
      </strong>

      {" — "}

      {data?.service}

    </Alert>

  );

}


export default ApiStatusCard;