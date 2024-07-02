import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { SpentContext } from "../context";
import { TOTAL_SPENT } from "../constants";

const Account = () => {
  const [refetchTotalSpent, setRefetchTotalSpent] = useContext(SpentContext);
  const [totalSpent, setTotalSpent] = useState(0);
  const { loading, error, data, refetch } = useQuery(TOTAL_SPENT);

  useEffect(() => {
    if (refetchTotalSpent) {
      refetch();
      setRefetchTotalSpent(false);
    }
  }, [refetchTotalSpent]);

  useEffect(() => {
    if (data) {
      setTotalSpent(data.totalSpent);
    }
    if (error) {
      console.log(error.message);
    }
  }, [data, error]);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Total spent: {totalSpent}</Text>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  view: {
    marginTop: 4,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
