import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  useBusinessInsights,
} from "../../hooks/useAnalytics";


function BusinessInsights() {

  const {
    data,
    isLoading,
    isError,
  } = useBusinessInsights();


  if (isLoading) {

    return (
      <Card>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }


  if (isError || !data) {

    return (
      <Alert severity="error">
        Unable to load business insights.
      </Alert>
    );
  }


  return (

    <Card>

      <CardContent>

        <Stack spacing={2}>

          <Box>

            <Typography variant="h6">
              Business Insights
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Key findings derived from
              customer churn analytics
            </Typography>

          </Box>


          {
            data.map(
              (
                insight,
                index
              ) => (

                <Alert
                  key={index}
                  severity={
                    insight.severity
                  }
                >

                  <Typography
                   sx={{ fontWeight:700}}
                  >
                    {insight.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{mt:0.5}}
                  >
                    {insight.description}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{mt:1}}
                  >
                    {insight.metric}
                  </Typography>

                </Alert>

              )
            )
          }

        </Stack>

      </CardContent>

    </Card>
  );
}


export default BusinessInsights;