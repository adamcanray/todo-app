import { ThemeProvider } from "@emotion/react";
import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../application/store";
import { theme } from "../../core";

export const WrapperApp: FC = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
