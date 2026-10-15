import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";


interface ModelMetricCardProps {
  title: string;
  value: number;
  description: string;
}


export default function ModelMetricCard({
  title,
  value,
  description,
}: ModelMetricCardProps) {

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={1}>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            sx={{fontWeight:700}}
          >
            {(value * 100).toFixed(1)}%
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {description}
          </Typography>

        </Stack>
      </CardContent>
    </Card>
  );
}