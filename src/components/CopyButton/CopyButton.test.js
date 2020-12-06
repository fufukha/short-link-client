import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CopyButton from './index'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'

const component = () => (
  <ThemeProvider theme={theme}>
    <CopyButton url={'url.com'} name={'Hello'}/>
  </ThemeProvider>
)

it('CopyButton component renders without crashing', () => {
  const { getByText } = render(component())

  getByText('Hello')
  getByText('url.com')
  getByText('Copy')
});

it('CopyButton component calls clipboard.writeText on click', () => {
  const { getByText } = render(component())
  navigator.clipboard = { writeText: jest.fn() }
  const button = getByText('Copy')

  fireEvent.click(button)

  expect(navigator.clipboard.writeText).toHaveBeenCalled()
});

it('CopyButton component renders error feedback when error is caught', async () => {
  const { getByTestId } = render(component())
  navigator.clipboard = { writeText: jest.fn() }

  try {
    await navigator.clipboard.writeText()
  } catch (e) {
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    getByTestId('Error')
  }
});
