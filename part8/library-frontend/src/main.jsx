import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient";
import Books from "./Books";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Books />
  </ApolloProvider>,
  document.getElementById("root")
);
