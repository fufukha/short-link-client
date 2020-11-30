import React from "react";
import { render } from '@testing-library/react'
import UrlShortener from './index'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'
import { MockedProvider } from '@apollo/client/testing';

const component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={[]}>
      <UrlShortener />
    </MockedProvider>
  </ThemeProvider>
)

it('UrlShortener component renders without crashing', () => {
  const { getByText, getByLabelText } = render(component)

  getByLabelText('Place URL here')
  getByLabelText('Place custom alias here')
  getByLabelText('Name your URL')
  getByText('Shorten')
});
