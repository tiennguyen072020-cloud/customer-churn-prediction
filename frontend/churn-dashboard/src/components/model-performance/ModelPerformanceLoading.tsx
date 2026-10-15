import {
  Box,
  Skeleton,
} from "@mui/material";

import Grid from "@mui/material/Grid";


export default function ModelPerformanceLoading() {

  return (
    <Box>

      <Skeleton
        width={260}
        height={48}
      />

      <Skeleton
        width={400}
        height={28}
      />


      <Grid
        container
        spacing={2}
        sx={{mt:1}}
      >

        {Array.from({
          length: 5,
        }).map((_, index) => (

          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              lg: 2.4,
            }}
          >
            <Skeleton
              variant="rounded"
              height={150}
            />
          </Grid>

        ))}

      </Grid>


      <Grid
        container
        spacing={3}
       sx={{ mt:1}}
      >

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Skeleton
            variant="rounded"
            height={420}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <Skeleton
            variant="rounded"
            height={420}
          />
        </Grid>

      </Grid>

    </Box>
  );
}