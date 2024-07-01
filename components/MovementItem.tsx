import React from "react";
import { ItemProps } from "../constants";
import { View, Text, Pressable } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

function MovementItem({ id, description, amount }: ItemProps) {
  return (
    <StyledView className="flex-1 justify-center bg-black p-6">
      <StyledText className="text-white font-bold text-xl mb-2">
        {description} - {amount}
      </StyledText>
      <StyledPressable
        onPress={() => console.log("delete")}
        className="rounded-md border-2 border-sky-500 mb-4 p-2"
      >
        <StyledText className="uppercase text-white font-bold text-xl">
          edit
        </StyledText>
      </StyledPressable>
      <StyledPressable
        onPress={() => console.log("delete")}
        className="rounded-md border-2 border-sky-500 p-2"
      >
        <StyledText className="uppercase text-white font-bold text-xl">
          delete
        </StyledText>
      </StyledPressable>
    </StyledView>
  );
}

export default MovementItem;
