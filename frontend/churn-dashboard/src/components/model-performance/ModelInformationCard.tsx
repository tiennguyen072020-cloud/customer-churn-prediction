import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type {
  ModelInformation,
} from "../../types/modelPerformance";


interface Props {
  data: ModelInformation;
}


export default function ModelInformationCard({
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
            mb: 2,
          }}
        >
          Model Information
        </Typography>

        <Stack
          spacing={1.5}
          divider={
            <Divider flexItem />
          }
        >

          <InfoRow
            label="Model"
            value={data.model_name}
          />

          <InfoRow
            label="Algorithm"
            value={data.algorithm}
          />

          <InfoRow
            label="Task"
            value={data.task}
          />

          <InfoRow
            label="Target"
            value={data.target}
          />

          <InfoRow
            label="Positive Class"
            value={data.positive_class}
          />

          <InfoRow
            label="Threshold"
            value={
              data
                .decision_threshold
                .toFixed(2)
            }
          />

          <InfoRow
            label="Model Selection"
            value={
              data.model_selection_metric
              ?? "-"
            }
          />

          <InfoRow
            label="Threshold Selection"
            value={
              data.threshold_selection_metric
              ?? "-"
            }
          />

          <Stack
            direction="row"
            sx={{justifyContent:"space-between",
            alignItems:"center"}}
          >

            <Typography
              color="text.secondary"
            >
              Status
            </Typography>

            <Chip
              label={data.status}
              size="small"
            />

          </Stack>

        </Stack>

      </CardContent>
    </Card>
  );
}


interface InfoRowProps {
  label: string;
  value: string;
}


function InfoRow({
  label,
  value,
}: InfoRowProps) {

  return (
    <Stack
      direction="row"
      sx={{justifyContent:"space-between",
      spacing:2}}
    >

      <Typography
        color="text.secondary"
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        {value}
      </Typography>

    </Stack>
  );
}