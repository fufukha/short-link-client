import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from "@apollo/client";
import { client } from './models/api'
import theme from './theme'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
