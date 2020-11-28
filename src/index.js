import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
