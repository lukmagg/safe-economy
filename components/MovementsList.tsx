import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from "react-native";
import { useQuery } from "@apollo/client";
import { MovementsContext } from "../context";
import { ItemProps, MONTH_EXPENSES } from "../constants";
import MovementItem from "./MovementItem";

const MovementsList = () => {
  const [refetchMovements, setRefetchMovements] = useContext(MovementsContext);

  const [monthExpenses, setMonthExpenses] = useState<ItemProps[]>();

  const {
    loading: loadingExpenses,
    error: errorExpenses,
    data: dataExpenses,
    refetch: refetchExpenses,
  } = useQuery(MONTH_EXPENSES);

  useEffect(() => {
    if (dataExpenses) {
      setMonthExpenses([...dataExpenses.monthExpenses]);
    }
    if (errorExpenses) {
      console.log(errorExpenses.message);
    }
  }, [dataExpenses, errorExpenses]);

  useEffect(() => {
    refetchExpenses();
    setRefetchMovements(false);
    if (errorExpenses) {
      console.log(errorExpenses.message);
    }
  }, [refetchMovements]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={monthExpenses}
        renderItem={({ item }) => (
          <MovementItem
            id={item.id}
            description={item.description}
            amount={item.amount}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default MovementsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
