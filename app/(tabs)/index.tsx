import { View } from "react-native";
import React, { useState } from "react";
import Account from "../../components/Account";
import Income from "../../components/Income";
import Expense from "../../components/Expense";
import Toast from "react-native-toast-message";
import { styled } from "nativewind";
import { Context } from "../../context";

const StyledView = styled(View);

export default function Tab() {
  const [refetchTotalSpent, setRefetchTotalSpent] = useState(false);
  return (
    <StyledView className="flex-1 justify-center bg-black px-2">
      <Income />
      <Context.Provider value={[refetchTotalSpent, setRefetchTotalSpent]}>
        <Expense />
        <Account />
      </Context.Provider>
      <Toast />
    </StyledView>
  );
}
