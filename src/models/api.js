import {
  ApolloClient,
  InMemoryCache,
  gql
} from '@apollo/client';

export const client = new ApolloClient({
  uri: "https://j7mzr.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

export const LINKS = gql`
  query {
    getLinks {
      name
      url
    }
  }
`

export const CREATE_LINK = gql`
  mutation CreateLink($name: String!, $url: String!) {
    createLink(name: $name, url: $url) {
      id
      name
      url
      slug
    }
  }
`
