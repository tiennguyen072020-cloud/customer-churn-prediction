import {
  Box,
  Toolbar,
} from "@mui/material";

import {
  Outlet,
} from "react-router-dom";

import Sidebar, {
  DRAWER_WIDTH,
} from "./Sidebar";

import Header from "./Header";


function DashboardLayout() {

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >

      <Sidebar />

      <Header />


      <Box
        component="main"
        sx={{
          flexGrow: 1,

          width:
            `calc(100% - ${DRAWER_WIDTH}px)`,

          p: 3,
        }}
      >

        <Toolbar />

        <Outlet />

      </Box>

    </Box>

  );

}


export default DashboardLayout;