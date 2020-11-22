import React from "react";
import "./styles.css";
import UrlShortener from "./components/UrlShortener";
import { ApolloProvider } from "@apollo/client";
import { client } from "./models/api";
import Container from "@material-ui/core/Container";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" className="App">
        <h1>Shorten your link</h1>
        <UrlShortener />
      </Container>
    </ApolloProvider>
  );
}
