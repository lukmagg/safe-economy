import { View } from "react-native";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import MovementsList from "../../components/MovementsList";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.0.15:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function Tab() {
  return (
    <ApolloProvider client={client}>
      <View className="flex-1 justify-center bg-black p-6">
        <MovementsList />
      </View>
    </ApolloProvider>
  );
}
