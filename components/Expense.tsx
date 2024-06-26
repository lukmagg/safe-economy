import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Modal } from "react-native";
import ExpenseModal from "./ExpenseModal";

const Expense = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <ExpenseModal visible={modalVisible} closeModal={closeModal} />
      <Pressable style={styles.button} onPress={openModal}>
        <Text style={styles.text}>EXPENSE</Text>
      </Pressable>
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  button: {
    height: 120,
    alignItems: "center", // text center inside buttom horizontal
    justifyContent: "center", // text center inside buttom vertical
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    width: 340,
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
