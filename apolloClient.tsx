import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "http://192.168.10.126:3001/graphql/",
  uri: "http://192.168.0.10:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
