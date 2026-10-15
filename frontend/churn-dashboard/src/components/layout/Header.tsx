import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  DRAWER_WIDTH,
} from "./Sidebar";


function Header() {

  return (

    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width:
          `calc(100% - ${DRAWER_WIDTH}px)`,

        ml: `${DRAWER_WIDTH}px`,

        borderBottom:
          "1px solid",

        borderColor:
          "divider",
      }}
    >

      <Toolbar>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          Customer Churn Prediction
        </Typography>


        <Box
          sx={{display:"flex",
          alignItems:"center",
          gap:1.5}}
        >

          <Box
           
            sx={{ textAlign:"right"}}
          >

            <Typography
              
              sx={{variant:"body2",
              fontWeight:600}}
            >
              ML Dashboard
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Administrator
            </Typography>

          </Box>


          <Avatar>
            ML
          </Avatar>

        </Box>

      </Toolbar>

    </AppBar>

  );
}


export default Header;