import React from "react";
import "./styles.css";
import UrlShortener from "./components/UrlShortener";
import { ApolloProvider } from "@apollo/client";
import { client } from "./models/api";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <UrlShortener />
      </div>
    </ApolloProvider>
  );
}
