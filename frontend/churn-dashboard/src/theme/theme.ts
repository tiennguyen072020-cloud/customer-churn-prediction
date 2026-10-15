import {
  createTheme,
} from "@mui/material/styles";


export const theme = createTheme({

  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
    },

    secondary: {
      main: "#7c3aed",
    },

    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },


  typography: {

    fontFamily: [
      "Inter",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },
  },


  shape: {
    borderRadius: 10,
  },


  components: {

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

  },

});