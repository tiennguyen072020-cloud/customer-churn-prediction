import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type {
  PredictionHistoryItem,
} from "../../types/predictionHistory";


interface Props {
  items?: PredictionHistoryItem[];
}


export default function PredictionHistoryTable({
  items = [],
}: Props) {

  if (items.length === 0) {

    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          No prediction history
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          Run a customer prediction
          to create the first record.
        </Typography>
      </Paper>
    );
  }


  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        overflowX: "auto",
      }}
    >
      <Table
        sx={{
          minWidth: 850,
        }}
      >
        <TableHead>
          <TableRow>

            <TableCell>
              Timestamp
            </TableCell>

            <TableCell>
              Customer
            </TableCell>

            <TableCell>
              Prediction
            </TableCell>

            <TableCell
              align="right"
            >
              Probability
            </TableCell>

            <TableCell
              align="right"
            >
              Threshold
            </TableCell>

            <TableCell>
              Risk
            </TableCell>

          </TableRow>
        </TableHead>


        <TableBody>

          {items.map(
            item => (

              <TableRow
                key={item.id}
                hover
              >

                <TableCell>
                  {
                    new Date(
                      item.timestamp
                    )
                    .toLocaleString()
                  }
                </TableCell>


                <TableCell>
                  {
                    item.customer_id
                    ?? "-"
                  }
                </TableCell>


                <TableCell>

                  <Chip
                    size="small"
                    label={
                      item.prediction_label
                    }
                    color={
                      item.prediction === 1
                        ? "warning"
                        : "success"
                    }
                    variant="outlined"
                  />

                </TableCell>


                <TableCell
                  align="right"
                >
                  {
                    (
                      item.churn_probability
                      * 100
                    )
                    .toFixed(1)
                  }
                  %
                </TableCell>


                <TableCell
                  align="right"
                >
                  {
                    Number(
                      item.threshold
                    )
                    .toFixed(2)
                  }
                </TableCell>


                <TableCell>
                  {
                    item.risk_level
                    ?? "-"
                  }
                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>
      </Table>
    </TableContainer>
  );
}