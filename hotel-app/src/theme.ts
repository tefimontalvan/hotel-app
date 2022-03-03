import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#51472e" },
    secondary: { main: "#df2040" },
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#51472e",
        "&:hover": {
          backgroundColor: "#413925",
        },
      },
    },

    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "white",
        },
        color: "white",
        textDecorationColor: "white",
      },
    },
  },
});

export default theme;
