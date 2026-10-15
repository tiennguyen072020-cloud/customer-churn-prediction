import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  PieChart,
} from "@mui/x-charts/PieChart";

import {
  useChurnDistribution,
} from "../../hooks/useAnalytics";


function ChurnDistributionChart() {

  const {
    data,
    isLoading,
    isError,
  } = useChurnDistribution();


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
            Unable to load churn distribution.
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
              Churn Distribution
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Customer retention versus churn
            </Typography>

          </div>


          <PieChart
            height={280}
            series={[
              {
                innerRadius: 65,
                outerRadius: 110,
                paddingAngle: 3,
                cornerRadius: 5,

                data: data.map(
                  (
                    item,
                    index
                  ) => ({
                    id: index,
                    value: item.value,
                    label: item.label,
                  })
                ),
              },
            ]}
          />

        </Stack>

      </CardContent>

    </Card>

  );

}


export default ChurnDistributionChart;