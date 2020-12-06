import React from "react";
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mount } from 'jest'
import CopyButton from './index'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'

const component = (onClick) => (
  <ThemeProvider theme={theme}>
    <CopyToClipboard data-testid={'copyBtn'} onCopy={onClick}>
      <CopyButton url={'url.com'} name={'Hello'} />
    </CopyToClipboard>
  </ThemeProvider>
)

it('CopyButton component renders without crashing', () => {
  const { getByText } = render(component())

  getByText('Hello')
  getByText('url.com')
  getByText('Copy')
});
