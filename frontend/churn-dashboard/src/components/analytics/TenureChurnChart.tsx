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
  useTenureChurn,
} from "../../hooks/useAnalytics";


function TenureChurnChart() {

  const {
    data,
    isLoading,
    isError,
  } = useTenureChurn();


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
            Unable to load tenure
            churn analytics.
          </Typography>

        </CardContent>
      </Card>
    );
  }


  return (

    <Card>

      <CardContent>

        <Stack spacing={2}>

          <div>

            <Typography variant="h6">
              Churn by Customer Tenure
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Churn risk across customer
              lifecycle stages
            </Typography>

          </div>


          <BarChart
            height={300}

            xAxis={[
              {
                scaleType: "band",

                data: data.map(
                  (item) =>
                    item.range
                ),

                label:
                  "Tenure (months)",
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


export default TenureChurnChart;