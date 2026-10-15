import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  BarChart,
} from "@mui/x-charts/BarChart";

import {
  useInternetServiceChurn,
} from "../../hooks/useAnalytics";


function InternetServiceChurnChart() {

  const {
    data,
    isLoading,
    isError,
  } = useInternetServiceChurn();


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
      <Card>
        <CardContent>

          <Typography color="error">
            Unable to load internet
            service analytics.
          </Typography>

        </CardContent>
      </Card>
    );
  }


  return (

    <Card sx={{ height: "100%" }}>

      <CardContent>

        <Stack spacing={2}>

          <div>

            <Typography variant="h6">
              Churn by Internet Service
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Churn rate across internet
              service categories
            </Typography>

          </div>


          <BarChart
            height={300}

            xAxis={[
              {
                scaleType: "band",

                data: data.map(
                  (item) =>
                    item.internet_service
                ),
              },
            ]}

            yAxis={[
              {
                label:
                  "Churn Rate (%)",
              },
            ]}

            series={[
              {
                data: data.map(
                  (item) =>
                    item.churn_rate
                ),

                label:
                  "Churn Rate (%)",
              },
            ]}
          />

        </Stack>

      </CardContent>

    </Card>
  );
}


export default InternetServiceChurnChart;