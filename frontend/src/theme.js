import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Black
    },
    secondary: {
      main: "#ffffff", // White
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
