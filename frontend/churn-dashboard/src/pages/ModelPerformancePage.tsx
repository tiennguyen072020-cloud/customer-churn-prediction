import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";


import ModelMetricCard
  from "../components/model-performance/ModelMetricCard";

import ModelInformationCard
  from "../components/model-performance/ModelInformationCard";

import ConfusionMatrixCard
  from "../components/model-performance/ConfusionMatrixCard";

import RocCurveCard
  from "../components/model-performance/RocCurveCard";

import ModelPerformanceLoading
  from "../components/model-performance/ModelPerformanceLoading";

import ModelPerformanceError
  from "../components/model-performance/ModelPerformanceError";

import FeatureImportanceCard
  from "../components/model-performance/FeatureImportanceCard";

import {
  useConfusionMatrix,
  useFeatureImportance,
  useModelInfo,
  useModelMetrics,
  useRocCurve,
} from "../hooks/useModelPerformance";


 function ModelPerformancePage() {

  const metricsQuery =
    useModelMetrics();

  const infoQuery =
    useModelInfo();

  const confusionQuery =
    useConfusionMatrix();

  const rocQuery =
    useRocCurve();

  const featureImportanceQuery =
    useFeatureImportance();

  // Loading

  const isLoading =
    metricsQuery.isLoading ||
    infoQuery.isLoading ||
    confusionQuery.isLoading ||
    rocQuery.isLoading || 
    featureImportanceQuery.isLoading;


  if (isLoading) {

    return (
      <ModelPerformanceLoading />
    );
  }


  
  // Error

  const isError =
    metricsQuery.isError ||
    infoQuery.isError ||
    confusionQuery.isError ||
    rocQuery.isError || 
    featureImportanceQuery.isError;


  if (isError) {

    const handleRetry = () => {

      void metricsQuery.refetch();
      void infoQuery.refetch();
      void confusionQuery.refetch();
      void rocQuery.refetch();
      void featureImportanceQuery.refetch();
    };


    return (
      <ModelPerformanceError
        onRetry={handleRetry}
      />
    );
  }


 
  // Data
 
  const metrics =
    metricsQuery.data?.metrics;

  const modelInfo =
    infoQuery.data;

  const confusionMatrix =
    confusionQuery.data;

  const rocCurve =
    rocQuery.data;

  const featureImportance =
  featureImportanceQuery.data;

  if (
    !metrics ||
    !modelInfo ||
    !confusionMatrix ||
    !rocCurve ||
    !featureImportance 
  ) {

    return (
      <ModelPerformanceError
        onRetry={() => {
          void metricsQuery.refetch();
          void infoQuery.refetch();
          void confusionQuery.refetch();
          void rocQuery.refetch();
          void featureImportanceQuery.refetch();
        }}
      />
    );
  }


 
  // Page

  return (
    <Stack spacing={3}>

      {/* Header */}

      <Box>

        <Typography
          variant="h4"
          sx={{fontWeight:700}}
        >
          Model Performance
        </Typography>

        <Typography
          color="text.secondary"
         sx={{ mt:0.5}}
        >
          Final machine learning model
          evaluation and classification
          performance.
        </Typography>

      </Box>


      {/* 
          Metric Cards
          */}

      <Grid
        container
        spacing={2}
      >

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2.4,
          }}
        >
          <ModelMetricCard
            title="Accuracy"
            value={metrics.accuracy}
            description={
              "Overall prediction accuracy"
            }
          />
        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2.4,
          }}
        >
          <ModelMetricCard
            title="Precision"
            value={metrics.precision}
            description={
              "Accuracy of churn predictions"
            }
          />
        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2.4,
          }}
        >
          <ModelMetricCard
            title="Recall"
            value={metrics.recall}
            description={
              "Detected actual churn customers"
            }
          />
        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2.4,
          }}
        >
          <ModelMetricCard
            title="F1 Score"
            value={metrics.f1_score}
            description={
              "Precision-recall balance"
            }
          />
        </Grid>


        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2.4,
          }}
        >
          <ModelMetricCard
            title="ROC-AUC"
            value={metrics.roc_auc}
            description={
              "Model discrimination ability"
            }
          />
        </Grid>

      </Grid>


      {/* 
          Model Info + Confusion Matrix
        */}

      <Grid
        container
        spacing={3}
      >

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >

          <ModelInformationCard
            data={modelInfo}
          />

        </Grid>


        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >

          <ConfusionMatrixCard
            data={confusionMatrix}
          />

        </Grid>

      </Grid>
{/* Feature Importance */}
    <FeatureImportanceCard
      data={featureImportance}
      limit={10}
    />
      
        {/* ROC Curve */}
     

      <RocCurveCard
        data={rocCurve}
      />

    </Stack>
  );
}

export default ModelPerformancePage