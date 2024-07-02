import { View } from "react-native";
import React, { useState } from "react";
import Account from "../../components/Account";
import Income from "../../components/Income";
import Expense from "../../components/Expense";
import Toast from "react-native-toast-message";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function Tab() {
  return (
    <StyledView className="flex-1 justify-center bg-black px-2">
      <Income />
      <Expense />
      <Account />
      <Toast />
    </StyledView>
  );
}
