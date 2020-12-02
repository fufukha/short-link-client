import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UrlShortener from './index'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_LINK } from "../../models/api";

const url = "url.com"

const component = (mocks) => (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <UrlShortener />
    </MockedProvider>
  </ThemeProvider>
)

it('UrlShortener component renders without crashing', () => {
  const { getByText, getByLabelText } = render(component([]))

  getByLabelText('Place URL here')
  getByLabelText('Place custom alias here')
  getByLabelText('Name your URL')
  getByText('Shorten')
});

it('UrlShortener component renders loading state initially', () => {
  const createLink = { url, name: '', slug: 'xxxx'}
  const mocks = [
    {
      request: {
        query: CREATE_LINK,
        variables: { url, name: "", slug:"" }
      },
      result: { data: { createLink } },
    },
  ]

  const { getByText, getByLabelText, getByRole } = render(component(mocks))

  const input = getByLabelText('Place URL here')
  const button = getByText('Shorten')

  fireEvent.change(input, { target: { value: url }})
  fireEvent.click(button)

  getByRole('progressbar')
})

it('UrlShortener component renders create link & give visual feedback',
  async () => {
    let createLinkCalled = false
    const createLink =  { id: 1, name: "", url, slug: "dXJsLmNvbQ"}
    const mocks = [
      {
        request: {
          query: CREATE_LINK,
          variables: { url, name: "", slug:"" }
        },
        result: () => {
          createLinkCalled = true;
          return { data: { createLink }  }
        },
      },
    ]

    const { getByText, getByLabelText, getByTestId } = render(component(mocks))

    const input = getByLabelText('Place URL here')
    const button = getByText('Shorten')

    fireEvent.change(input, { target: { value: url }})
    fireEvent.click(button)

    waitFor(() => {
      new Promise(resolve => setTimeout(resolve, 0))
      expect(createLinkCalled).toBe(true)
      getByTestId("shortLinkAddress")
    });
})

it('UrlShortener component renders error when url is not submitted', () => {
  const { getByText, getByLabelText, getByRole } = render(component([]))

  const input = getByLabelText('Place URL here')
  const button = getByText('Shorten')

  fireEvent.change(input, { target: { value: "" }})
  fireEvent.click(button)

  expect(input).toBeInvalid()
})
