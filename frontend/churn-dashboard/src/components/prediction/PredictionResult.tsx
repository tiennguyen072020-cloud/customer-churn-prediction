import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import type {
  ChurnPredictionResponse,
} from "../../types/prediction";


interface PredictionResultProps {

  result:
    ChurnPredictionResponse | undefined;

}


function PredictionResult({
  result,
}: PredictionResultProps) {

  if (!result) {

    return (

      <Card>

        <CardContent>

          <Typography
            variant="h6"
          >
            Prediction Result
          </Typography>

          <Typography
            sx={{variant:"body2",
            color:"text.secondary",
            mt:1}}
          >
            Submit customer information
            to see churn risk.
          </Typography>

        </CardContent>

      </Card>

    );

  }


  const probability =
    result.churn_probability * 100;

  const isChurn =
    result.churn_prediction === "Yes";


  return (

    <Stack spacing={2}>

      <Alert
        severity={
          isChurn
            ? "warning"
            : "success"
        }
      >

        {isChurn
          ? "This customer has a high churn risk."
          : "This customer is predicted to remain."}

      </Alert>


      <Card>

        <CardContent>

          <Stack spacing={3}>

            <Box
             sx={{ display:"flex",
              justifyContent:"space-between",
              alignItems:"center"}}
            >

              <Typography
                variant="h6"
              >
                Churn Prediction
              </Typography>


              <Chip
                label={
                  isChurn
                    ? "CHURN"
                    : "NO CHURN"
                }
                color={
                  isChurn
                    ? "warning"
                    : "success"
                }
              />

            </Box>


            <Box>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Churn Probability
              </Typography>


              <Typography
               sx={{ variant:"h3",
                mt:1}}
              >
                {probability.toFixed(1)}%
              </Typography>


              <LinearProgress
                variant="determinate"
                value={probability}
                sx={{
                  mt: 2,
                  height: 10,
                  borderRadius: 5,
                }}
              />

            </Box>


            <Box
              sx={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(2, 1fr)",

                gap: 2,
              }}
            >

              <Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Prediction
                </Typography>

                <Typography
                  sx={{fontWeight:600}}
                >
                  {result.prediction}
                </Typography>

              </Box>


              <Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Threshold
                </Typography>

                <Typography
                  sx={{fontWeight:600}}
                >
                  {result.threshold}
                </Typography>

              </Box>

            </Box>

          </Stack>

        </CardContent>

      </Card>

    </Stack>

  );

}


export default PredictionResult;