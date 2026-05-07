import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          margin: 0,
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
      },
    },
  },
});