import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Context } from "../context";

const TOTAL_SPENT = gql`
  query TotalSpentThisMonth {
    totalSpent
  }
`;

const Account = () => {
  const [signedIn, setSignedIn] = useContext(Context);
  const [totalSpent, setTotalSpent] = useState(10);
  const { loading, error, data, refetch } = useQuery(TOTAL_SPENT);

  useEffect(() => {
    if (data) {
      if (signedIn) {
        refetch();
        setSignedIn(false);
      }
      setTotalSpent(data.totalSpent);
    }
    if (error) {
      console.log(error.message);
    }
  }, [data, error, signedIn]);

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
