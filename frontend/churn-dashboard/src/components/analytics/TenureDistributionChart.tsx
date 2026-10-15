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
  useTenureDistribution,
} from "../../hooks/useAnalytics";


function TenureDistributionChart() {

  const {
    data,
    isLoading,
    isError,
  } = useTenureDistribution();


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
            Unable to load tenure analytics.
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
              Customer Tenure
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Customer distribution by tenure
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
                    item.customers
                ),

                label:
                  "Customers",
              },
            ]}
          />

        </Stack>

      </CardContent>

    </Card>

  );

}


export default TenureDistributionChart;