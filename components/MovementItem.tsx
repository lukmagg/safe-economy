import React from "react";
import { ItemProps } from "../constants";
import { View, Text, Pressable } from "react-native";
import { styled } from "nativewind";
import { gql, useMutation } from "@apollo/client";
import { showToast } from "../notifications";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const DELETE_EXPENSE = gql`
  mutation CreateExpense($id: string!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;

function MovementItem({ id, description, amount }: ItemProps) {
  const [
    executeDeleteMutation,
    { loading: loadingDelete, error: errorDelete, data: dataDetele },
  ] = useMutation(DELETE_EXPENSE);

  const handleDelete = async (id: string) => {
    try {
      await executeDeleteMutation({
        variables: {
          createExpenseDto: id,
        },
      });
    } catch (error) {
      showToast("error", "something was bad", error);
    }
  };

  return (
    <StyledView className="flex-1 justify-center bg-black p-6">
      <StyledText className="text-white font-bold text-xl mb-2">
        {description} - {amount}
      </StyledText>
      <StyledPressable
        onPress={() => console.log("update")}
        className="rounded-md border-2 border-sky-500 mb-4 p-2"
      >
        <StyledText className="uppercase text-white font-bold text-xl">
          edit
        </StyledText>
      </StyledPressable>
      <StyledPressable
        onPress={() => handleDelete(id)}
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
