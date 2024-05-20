import { View } from "react-native";
import React from "react";
import Account from "../../components/Account";
import Income from "../../components/Income";
import Expense from "../../components/Expense";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Toast from "react-native-toast-message";
import { styled } from "nativewind";

const StyledView = styled(View);

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.10.126:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function Tab() {
  return (
    <ApolloProvider client={client}>
      <StyledView className="flex-1 justify-center bg-black px-2">
        <Income />
        <Expense />
        <Toast />
        <Account />
      </StyledView>
    </ApolloProvider>
  );
}
