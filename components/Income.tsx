import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import IncomeModal from "./IncomeModal";

const Income = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <IncomeModal visible={modalVisible} closeModal={closeModal} />
      <Pressable style={styles.button} onPress={openModal}>
        <Text style={styles.text}>INCOME</Text>
      </Pressable>
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  button: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    width: 340,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
