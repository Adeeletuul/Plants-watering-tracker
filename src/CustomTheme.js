import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#668e08",
    },
    secondary: {
      main: "#33691e",
    },
    error: {
      main: "#b71c1c",
    },
    success: {
      main: "#64dd17",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          alignSelf: "center",
          marginTop: "7rem",
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        container: {
          justify: "center",
        },
      },
      styleOverrides: {
        container: {},
        item: {
          paddingTop: "1rem",
          justifyContent: "center",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
