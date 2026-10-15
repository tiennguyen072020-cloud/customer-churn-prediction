import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  RocCurveResponse,
} from "../../types/modelPerformance";


interface Props {
  data: RocCurveResponse;
}


export default function RocCurveCard({
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
          sx={{fontWeight:700}}
        >
          ROC Curve
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{mb:2}}
        >
          Area Under Curve:{" "}
          {(data.auc * 100).toFixed(1)}%
        </Typography>


        <ResponsiveContainer
          width="100%"
          height={360}
        >

          <LineChart
            data={data.points}
            margin={{
              top: 10,
              right: 25,
              bottom: 30,
              left: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              type="number"
              dataKey="fpr"
              domain={[0, 1]}
              tickFormatter={(
                value: number
              ) =>
                value.toFixed(1)
              }
              label={{
                value:
                  "False Positive Rate",

                position:
                  "insideBottom",

                offset:
                  -15,
              }}
            />


            <YAxis
              type="number"
              domain={[0, 1]}
              tickFormatter={(
                value: number
              ) =>
                value.toFixed(1)
              }
              label={{
                value:
                  "True Positive Rate",

                angle:
                  -90,

                position:
                  "insideLeft",
              }}
            />


            <Tooltip
              formatter={(
                value
              ) =>
                Number(
                  value
                ).toFixed(3)
              }
            />


            <Legend />


            <ReferenceLine
              segment={[
                {
                  x: 0,
                  y: 0,
                },
                {
                  x: 1,
                  y: 1,
                },
              ]}
              strokeDasharray="6 6"
            />


            <Line
              type="monotone"
              dataKey="tpr"
              name="ROC"
              dot={false}
              strokeWidth={2}
              isAnimationActive
            />

          </LineChart>

        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}