import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon
  from "@mui/icons-material/Dashboard";

import PsychologyIcon
  from "@mui/icons-material/Psychology";

import InsightsIcon
  from "@mui/icons-material/Insights";

import AnalyticsOutlinedIcon
  from "@mui/icons-material/AnalyticsOutlined";

import HistoryOutlinedIcon
  from "@mui/icons-material/HistoryOutlined";

import { useNavigate } from "react-router-dom";


export const DRAWER_WIDTH = 250;


function Sidebar() {

  const navigate = useNavigate();


  return (

    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,

        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >

      <Toolbar>

        <Box>

          <Typography
            variant="h6"
           sx={{ "fontWeight":700}}
          >
            Churn AI
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Prediction Platform
          </Typography>

        </Box>

      </Toolbar>


      <Divider />


      <List>

        <ListItemButton
          onClick={() =>
            navigate("/")
          }
        >

          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>

          <ListItemText
            primary="Dashboard"
          />

        </ListItemButton>


        <ListItemButton
          onClick={() =>
            navigate("/prediction")
          }
        >

          <ListItemIcon>
            <PsychologyIcon />
          </ListItemIcon>

          <ListItemText
            primary="Prediction"
          />

        </ListItemButton>
        <ListItemButton
            onClick={() =>
              navigate("/model-performance")
            }
          >

            <ListItemIcon>
            <AnalyticsOutlinedIcon />
            </ListItemIcon>

            <ListItemText
              primary="Model Performance"
            />

        </ListItemButton>

        <ListItemButton
            onClick={() =>
              navigate("/analytics")
            }
          >

            <ListItemIcon>
              <InsightsIcon />
            </ListItemIcon>

            <ListItemText
              primary="Analytics"
            />

        </ListItemButton>

        <ListItemButton
            onClick={() =>
              navigate("/prediction-history")
            }
          >

            <ListItemIcon>
             <HistoryOutlinedIcon />
            </ListItemIcon>

            <ListItemText
              primary="Prediction History"
            />

        </ListItemButton>

      </List>

    </Drawer>

  );
}


export default Sidebar;