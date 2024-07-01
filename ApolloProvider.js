// ApolloProvider.js

import React from "react";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";

const ApolloProvider = ({ children }) => {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};

export default ApolloProvider;
