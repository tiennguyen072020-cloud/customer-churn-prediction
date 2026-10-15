import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";


function NotFoundPage() {

  const navigate = useNavigate();


  return (

    <Box
      sx={{textAlign:"center",
      py:10}}
    >

      <Typography
        sx={{variant:"h2",
        fontWeight:700}}
      >
        404
      </Typography>

      <Typography
        sx={{variant:"h6",
        mt:1}}
      >
        Page not found
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() =>
          navigate("/")
        }
      >
        Back to Dashboard
      </Button>

    </Box>

  );

}


export default NotFoundPage;