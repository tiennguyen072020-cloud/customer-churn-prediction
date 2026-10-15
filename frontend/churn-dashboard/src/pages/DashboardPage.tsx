import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import PeopleAltOutlinedIcon
  from "@mui/icons-material/PeopleAltOutlined";

import TrendingDownOutlinedIcon
  from "@mui/icons-material/TrendingDownOutlined";

import VerifiedUserOutlinedIcon
  from "@mui/icons-material/VerifiedUserOutlined";

import SpeedOutlinedIcon
  from "@mui/icons-material/SpeedOutlined";

import StatCard
  from "../components/dashboard/StatCard";

import ApiStatusCard
  from "../components/dashboard/ApiStatusCard";

import PredictionHistoryTable
  from "../components/dashboard/PredictionHistoryTable";

import ChurnDistributionChart
  from "../components/analytics/ChurnDistributionChart";

import ContractChurnChart
  from "../components/analytics/ContractChurnChart";

import TenureDistributionChart
  from "../components/analytics/TenureDistributionChart";

import RiskDistributionChart
  from "../components/analytics/RiskDistributionChart";


import {
  useDashboardSummary,
} from "../hooks/useAnalytics";

function DashboardPage() {

  const {
  data: summary,
  isLoading,
  isError,
} = useDashboardSummary();

if (isLoading) {

  return (
    <Box
      sx={{display:"flex",
      justifyContent:"center",
      py:10}}
    >
      <CircularProgress />
    </Box>
  );

}


if (isError || !summary) {

  return (

    <Alert severity="error">

      Unable to load dashboard analytics.

    </Alert>

  );

}

  return (

    <Stack spacing={3}>

      {/* Page Header */}

      <Box>

        <Typography
          variant="h4"
        >
          Dashboard
        </Typography>

        <Typography
          sx={{color:"text.secondary",
          mt:0.5}}
        >
          Customer churn analytics
          and machine learning
          prediction overview.
        </Typography>

      </Box>


      {/* API Health */}

      <ApiStatusCard />


      {/* KPI Cards */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            sm:
              "repeat(2, 1fr)",

            lg:
              "repeat(4, 1fr)",
          },

          gap: 3,
        }}
      >

        <StatCard
          title="Total Customers"

    value={
  summary
    .total_customers
    .toLocaleString()
  }

          subtitle="Dataset records"

          icon={
            <PeopleAltOutlinedIcon
              fontSize="large"
              color="primary"
            />
          }
        />


        <StatCard
          title="Churn Rate"

          value={
    `${summary.churn_rate}%`
  }

          subtitle={
    `${summary.churn_customers.toLocaleString()} customers`
  }

          icon={
            <TrendingDownOutlinedIcon
              fontSize="large"
              color="warning"
            />
          }
        />


        <StatCard
          title="Retention Rate"

          value={
    `${summary.retention_rate}%`
  }

          subtitle={
    `${summary.retained_customers.toLocaleString()} customers`
  }

          icon={
            <VerifiedUserOutlinedIcon
              fontSize="large"
              color="success"
            />
          }
        />


        <StatCard
          title="Model Threshold"

           value={
    summary
      .model_threshold
      .toFixed(2)
  }

          subtitle={
            "Classification threshold"
          }

          icon={
            <SpeedOutlinedIcon
              fontSize="large"
              color="primary"
            />
          }
        />

      </Box>


      {/* Main Charts */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs:
              "1fr",

            lg:
              "minmax(0, 1fr) minmax(0, 2fr)",
          },

          gap: 3,
        }}
      >

        <ChurnDistributionChart />

        <ContractChurnChart />

      </Box>


      {/* Secondary Charts */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs:
              "1fr",

            lg:
              "repeat(2, minmax(0, 1fr))",
          },

          gap: 3,
        }}
      >

        <TenureDistributionChart />

        <RiskDistributionChart />

      </Box>


      {/* Prediction History */}

      <PredictionHistoryTable />

    </Stack>

  );

}


export default DashboardPage;