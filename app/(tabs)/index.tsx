import { View } from "react-native";
import React, { useState } from "react";
import Account from "../../components/Account";
import Income from "../../components/Income";
import Expense from "../../components/Expense";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Toast from "react-native-toast-message";
import { styled } from "nativewind";
import { Context } from "../../context";

const StyledView = styled(View);

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.10.126:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function Tab() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <ApolloProvider client={client}>
      <StyledView className="flex-1 justify-center bg-black px-2">
        <Income />
        <Context.Provider value={[signedIn, setSignedIn]}>
          <Expense />
          <Account />
        </Context.Provider>
        <Toast />
      </StyledView>
    </ApolloProvider>
  );
}
