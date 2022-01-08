import { ThemeProvider } from "@emotion/react";
import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../../application/store";
import { theme } from "../../core";

export const WrapperApp: FC = (props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Provider>
  );
};
