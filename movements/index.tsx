import { Text, View } from "react-native";
import React from "react";
import MovementsList from "../../components/MovementsList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Link } from "expo-router";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.0.15:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const Movements = () => {
  return (
    <ApolloProvider client={client}>
      <View className="flex-1 justify-center bg-black p-6">
        <Link href="/">
          <Text className="text-white font-bold">Go Init</Text>
        </Link>
        <MovementsList />
      </View>
    </ApolloProvider>
  );
};

export default Movements;
