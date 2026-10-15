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
  usePaymentMethodChurn,
} from "../../hooks/useAnalytics";


function PaymentMethodChurnChart() {

  const {
    data,
    isLoading,
    isError,
  } = usePaymentMethodChurn();


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
            Unable to load payment
            analytics.
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
              Churn by Payment Method
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Customer churn rate grouped
              by payment method
            </Typography>

          </div>


          <BarChart
            height={330}

            layout="horizontal"

            yAxis={[
              {
                scaleType: "band",

                data: data.map(
                  (item) =>
                    item.payment_method
                ),
              },
            ]}

            xAxis={[
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


export default PaymentMethodChurnChart;