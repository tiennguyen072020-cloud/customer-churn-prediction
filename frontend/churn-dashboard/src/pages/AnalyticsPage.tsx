import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import InternetServiceChurnChart
  from "../components/analytics/InternetServiceChurnChart";

import PaymentMethodChurnChart
  from "../components/analytics/PaymentMethodChurnChart";

import MonthlyChargesChurnChart
  from "../components/analytics/MonthlyChargesChurnChart";

import TenureChurnChart
  from "../components/analytics/TenureChurnChart";

import BusinessInsights
  from "../components/analytics/BusinessInsights";


function AnalyticsPage() {

  return (

    <Stack spacing={3}>

      <Box>

        <Typography variant="h4">
          Business Analytics
        </Typography>

        <Typography
          color="text.secondary"
          sx={{mt:0.5}}
        >
          Explore the key customer
          segments and business factors
          associated with churn.
        </Typography>

      </Box>


      <BusinessInsights />


      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            lg:
              "repeat(2, minmax(0, 1fr))",
          },

          gap: 3,
        }}
      >

        <InternetServiceChurnChart />

        <MonthlyChargesChurnChart />

      </Box>


      <PaymentMethodChurnChart />


      <TenureChurnChart />

    </Stack>
  );
}


export default AnalyticsPage;