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
  useContractChurn,
} from "../../hooks/useAnalytics";


function ContractChurnChart() {

  const {
    data,
    isLoading,
    isError,
  } = useContractChurn();


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
            Unable to load contract analytics.
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
              Churn by Contract
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Churn rate by contract type
            </Typography>

          </div>


          <BarChart
            height={280}

            xAxis={[
              {
                scaleType: "band",

                data: data.map(
                  (item) =>
                    item.contract
                ),
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


export default ContractChurnChart;