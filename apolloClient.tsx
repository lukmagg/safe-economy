import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  //uri: "http://economysafe.com:3001/graphql/",
  //uri: "http://192.168.10.126:3001/graphql/",
  uri: "http://192.168.0.13:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
