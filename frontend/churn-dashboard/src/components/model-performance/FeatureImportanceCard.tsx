import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import type {
  FeatureImportanceResponse,
} from "../../types/modelPerformance";


interface Props {
  data: FeatureImportanceResponse;
  limit?: number;
}


export default function FeatureImportanceCard({
  data,
  limit = 10,
}: Props) {

  const features =
    data.features.slice(
      0,
      limit
    );


  const maxPercentage =
    features.length > 0
      ? features[0].percentage
      : 1;


  return (
    <Card
      sx={{
        borderRadius: 3,
      }}
    >

      <CardContent>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          Top Churn Drivers
        </Typography>


        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          Features with the highest
          influence on churn predictions.
        </Typography>


        <Stack
          spacing={2.25}
        >

          {features.map(
            (item) => {

              const relativeValue =
                maxPercentage > 0
                  ? (
                      item.percentage
                      / maxPercentage
                    ) * 100
                  : 0;


              return (
                <Box
                  key={
                    item.feature
                  }
                >

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent:"space-between",
                    alignItems:"center",
                      mb: 0.75,
                    }}
                  >

                    <Stack
                      direction="row"
                      spacing={1}
                      
                      sx={{
                        minWidth: 0,
                        alignItems:"center"
                      }}
                    >

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          minWidth: 24,
                        }}
                      >
                        #{item.rank}
                      </Typography>


                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,

                          overflow:
                            "hidden",

                          textOverflow:
                            "ellipsis",

                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {item.feature}
                      </Typography>

                    </Stack>


                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {item.percentage
                        .toFixed(1)}
                      %
                    </Typography>

                  </Stack>


                  <LinearProgress
                    variant="determinate"
                    value={
                      Math.min(
                        relativeValue,
                        100
                      )
                    }
                    sx={{
                      height: 9,
                      borderRadius: 10,

                      "& .MuiLinearProgress-bar":
                        {
                          borderRadius: 10,
                        },
                    }}
                  />

                </Box>
              );
            }
          )}

        </Stack>


        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            mt: 3,
          }}
        >
          {data.method}
        </Typography>

      </CardContent>

    </Card>
  );
}