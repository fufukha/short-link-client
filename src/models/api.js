import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://bqreu.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

export const getLinks = () => {
  return client.query({
    query: gql`
      query {
        getLinks {
          url
          name
        }
      }
    `
  });
};

export const addLink = (name, url) => {
  return client.mutation({
    mutation: gql`
      mutation {
        createLink(name: name, url: url) {
          name
          url
        }
      }
    `
  });
};
