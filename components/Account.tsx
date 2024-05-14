import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Account = () => {
  return (
    <View>
      <Text style={styles.text}>1899</Text>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
