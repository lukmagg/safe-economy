// ApolloProvider.js

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as BaseApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://192.168.0.15:3001/graphql/", // Cambia la URL por la de tu servidor GraphQL
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};

export default ApolloProvider;
