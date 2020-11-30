import React from "react";
import { render, fireEvent } from '@testing-library/react'
import UrlShortener from './index'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_LINK } from "../../models/api";

const url = "url.com"
const addedLink = { url, id: 1, name: '', slug: 'xxxx'}

const component = (mocks) => (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <UrlShortener />
    </MockedProvider>
  </ThemeProvider>
)

const { getByText, getByLabelText, getByRole } = render(component(mocks))

it('UrlShortener component renders without crashing', () => {
  getByLabelText('Place URL here')
  getByLabelText('Place custom alias here')
  getByLabelText('Name your URL')
  getByText('Shorten')
});

it('UrlShortener component renders loading state initially', () => {
  const mocks = [
    {
      request: {
        query: CREATE_LINK,
        variables: { url }
      },
      result: { data: { addedLink } },
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
    const createLinkCalled = false
    const mocks = [
      {
        request: {
          query: CREATE_LINK,
          variables: { url }
        },
        result: () => {
          createLinkCalled = true;
          return { data: addedLink }
        },
      },
    ]

    const { getByText, getByLabelText, getByRole } = render(component(mocks))

    const input = getByLabelText('Place URL here')
    const button = getByText('Shorten')

    fireEvent.change(input, { target: { value: url }})
    fireEvent.click(button)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(createLinkCalled).toBe(true)

    getByTestId(shortLinkAddress)
})
