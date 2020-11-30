import React from "react";
import { render } from '@testing-library/react'
import App from './App'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { ApolloProvider } from "@apollo/client";
import { client } from './models/api'

const component = (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>
)

it('App component renders without crashing', () => {
  const { getByText} = render(component)

  getByText("snipper")
});
