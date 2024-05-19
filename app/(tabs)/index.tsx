import { View } from "react-native";
import React from "react";
import Account from "../../components/Account";
import Income from "../../components/Income";
import Expense from "../../components/Expense";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.0.10:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function Tab() {
  return (
    <ApolloProvider client={client}>
      <View className="flex-1 justify-center bg-black px-6">
        <Income />
        <Expense />
      </View>
    </ApolloProvider>
  );
}
