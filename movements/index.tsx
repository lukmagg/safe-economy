import { Text, View } from "react-native";
import React from "react";
import MovementsList from "../components/MovementsList";
import { ApolloProvider } from "@apollo/client";
import { Link } from "expo-router";
import { client } from "../apolloClient";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const Movements = () => {
  return (
    <ApolloProvider client={client}>
      <StyledView className="flex-1 justify-center bg-black p-6">
        <Link href="/">
          <StyledText className="text-white font-bold">Go Init</StyledText>
        </Link>
        <MovementsList />
      </StyledView>
    </ApolloProvider>
  );
};

export default Movements;
