import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { FC } from "react";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export const WrapperApp: FC = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
