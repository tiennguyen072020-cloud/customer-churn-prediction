import type {
  ReactNode,
} from "react";

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import type {
  ConfusionMatrixResponse,
} from "../../types/modelPerformance";


interface Props {
  data: ConfusionMatrixResponse;
}


export default function ConfusionMatrixCard({
  data,
}: Props) {

  return (
    <Card
      sx={{
        height: "100%",
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
          Confusion Matrix
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          Actual versus predicted churn
        </Typography>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs:
                "90px repeat(2, 1fr)",

              sm:
                "130px repeat(2, 1fr)",
            },

            gap: 1,
          }}
        >

          <Box />

          <HeaderCell>
            Predicted No
          </HeaderCell>

          <HeaderCell>
            Predicted Churn
          </HeaderCell>

          <HeaderCell>
            Actual No
          </HeaderCell>

          <MatrixCell
            title="True Negative"
            value={data.true_negative}
          />

          <MatrixCell
            title="False Positive"
            value={data.false_positive}
          />

          <HeaderCell>
            Actual Churn
          </HeaderCell>

          <MatrixCell
            title="False Negative"
            value={data.false_negative}
          />

          <MatrixCell
            title="True Positive"
            value={data.true_positive}
          />

        </Box>

      </CardContent>
    </Card>
  );
}


function HeaderCell({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <Box
      sx={{
        p: {
          xs: 1,
          sm: 1.5,
        },

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
        }}
      >
        {children}
      </Typography>

    </Box>
  );
}


interface MatrixCellProps {
  title: string;
  value: number;
}


function MatrixCell({
  title,
  value,
}: MatrixCellProps) {

  return (
    <Box
      sx={{
        p: {
          xs: 1.5,
          sm: 2,
        },

        minHeight: {
          xs: 85,
          sm: 110,
        },

        borderRadius: 2,

        bgcolor:
          "action.hover",
      }}
    >

      <Stack
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          {value.toLocaleString()}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textAlign: "center",
          }}
        >
          {title}
        </Typography>

      </Stack>

    </Box>
  );
}