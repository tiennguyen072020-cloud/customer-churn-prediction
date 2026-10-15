import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import {
  BarChart,
} from "@mui/x-charts/BarChart";

import {
  riskDistribution,
} from "../../data/dashboardMockData";


function RiskDistributionChart() {

  return (

    <Card>

      <CardContent>

        <Stack spacing={2}>

          <div>

            <Typography
              variant="h6"
            >
              Customer Risk Distribution
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Customers grouped by
              estimated churn risk
            </Typography>

          </div>


          <BarChart
            height={300}

            xAxis={[
              {
                scaleType: "band",

                data:
                  riskDistribution.map(
                    (item) =>
                      item.risk
                  ),
              },
            ]}

            series={[
              {
                data:
                  riskDistribution.map(
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


export default RiskDistributionChart;