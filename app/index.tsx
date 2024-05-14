import { StatusBar } from "expo-status-bar";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Link } from "expo-router";
import React from "react";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.0.15:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Link href="/actions">Actions</Link>
      <Link href="/movements">Movements</Link>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("SafeEconomy", () => App);
