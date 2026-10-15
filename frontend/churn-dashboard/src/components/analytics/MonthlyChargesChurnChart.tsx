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
  useMonthlyChargesChurn,
} from "../../hooks/useAnalytics";


function MonthlyChargesChurnChart() {

  const {
    data,
    isLoading,
    isError,
  } = useMonthlyChargesChurn();


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
            Unable to load monthly
            charges analytics.
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
              Monthly Charges vs Churn
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Churn rate by monthly
              customer spending
            </Typography>

          </div>


          <BarChart
            height={300}

            xAxis={[
              {
                scaleType: "band",

                data: data.map(
                  (item) =>
                    `$${item.range}`
                ),

                label:
                  "Monthly Charges",
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


export default MonthlyChargesChurnChart;