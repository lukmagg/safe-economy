import { View } from "react-native";
import React from "react";
import MovementsList from "../../components/MovementsList";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function Tab() {
  return (
    <StyledView className="flex-1 justify-center bg-black p-6">
      <MovementsList />
    </StyledView>
  );
}
