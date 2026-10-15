import {
  Alert,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import axios from "axios";

import PredictionForm
  from "../components/prediction/PredictionForm";

import PredictionResult
  from "../components/prediction/PredictionResult";

import {
  usePrediction,
} from "../hooks/usePrediction";

import type {
  ChurnPredictionRequest,
} from "../types/prediction";


function PredictionPage() {

  const prediction =
    usePrediction();


  
  // Submit Prediction

  const handlePredict = (
    customer:
      ChurnPredictionRequest
  ) => {

    prediction.mutate(
      customer
    );
  };



  // Error Message

  const getErrorMessage = () => {

    if (
      axios.isAxiosError(
        prediction.error
      )
    ) {

      const detail =
        prediction.error
          .response
          ?.data
          ?.detail;


      if (
        typeof detail ===
        "string"
      ) {

        return detail;
      }


      if (
        Array.isArray(
          detail
        )
      ) {

        return detail
          .map(
            item =>
              item.msg
              ?? "Validation error"
          )
          .join(", ");
      }


      return (
        prediction.error
          .message
      );
    }


    if (
      prediction.error
      instanceof Error
    ) {

      return (
        prediction.error
          .message
      );
    }


    return (
      "Prediction failed."
    );
  };


 
  // Page
  
  return (

    <Stack spacing={3}>

      <Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Customer Prediction
        </Typography>


        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,
          }}
        >
          Predict whether a customer
          is likely to churn using
          the production machine
          learning model.
        </Typography>

      </Box>


      {prediction.isError && (

        <Alert
          severity="error"
        >
          {getErrorMessage()}
        </Alert>

      )}


      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },

          gap: 3,

          alignItems:
            "start",
        }}
      >

        <PredictionForm

          isLoading={
            prediction.isPending
          }

          onSubmit={
            handlePredict
          }

        />


        <PredictionResult
          result={
            prediction.data
          }
        />

      </Box>

    </Stack>
  );
}


export default PredictionPage;