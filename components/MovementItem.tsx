import React, { useContext, useState } from "react";
import { DELETE_EXPENSE, ItemProps } from "../constants";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { useMutation } from "@apollo/client";
import { MovementsContext, SpentContext } from "../context";
import { showToast } from "../notifications";
import ExpenseModal from "./ExpenseModal";

function MovementItem({ id, description, amount }: ItemProps) {
  const [refetchTotalSpent, setRefetchTotalSpent] = useContext(SpentContext);
  const [refetchMovements, setRefetchMovements] = useContext(MovementsContext);

  const [modalVisible, setModalVisible] = useState(false);

  const [
    executeDeleteMutation,
    { loading: loadingDelete, error: errorDelete, data: dataDetele },
  ] = useMutation(DELETE_EXPENSE);

  const handleDelete = async (id: string) => {
    try {
      await executeDeleteMutation({
        variables: {
          id,
        },
      });
      setRefetchMovements(true);
      setRefetchTotalSpent(true);
    } catch (error) {
      showToast("error", "something was bad", error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const dataExpense = {
    id: id,
    description: description,
    amount: amount,
    // paymentDate?: Date;
  };
  return (
    <View style={styles.item}>
      <ExpenseModal
        visible={modalVisible}
        closeModal={closeModal}
        dataExpense={dataExpense}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{amount}€</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={openModal}>
          <Text style={[styles.text, styles.textButton, styles.button]}>
            edit
          </Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(id)}>
          <Text
            style={[
              styles.text,
              styles.textButton,
              styles.deleteButton,
              styles.button,
            ]}
          >
            delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default MovementItem;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  textContainer: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  description: {
    fontSize: 32,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textButton: {
    textTransform: "uppercase",
  },
  deleteButton: {
    color: "red",
  },
});
