import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  StatusBar,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { MovementsContext } from "../context";
import { showToast } from "../notifications";
import {
  DELETE_EXPENSE,
  ItemProps,
  MONTH_EXPENSES,
  TOTAL_SPENT,
} from "../constants";

const MovementsList = () => {
  const {
    loading: loadingExpenses,
    error: errorExpenses,
    data: dataExpenses,
    refetch: refetchExpenses,
  } = useQuery(MONTH_EXPENSES);

  const {
    loading: loadingSpent,
    error: errorSpent,
    data: dataSpent,
    refetch: refetchSpent,
  } = useQuery(TOTAL_SPENT);

  const [refetchMovements, setRefetchMovements] = useContext(MovementsContext);

  const [monthExpenses, setMonthExpenses] = useState<ItemProps[]>();

  const [
    executeDeleteMutation,
    { loading: loadingDelete, error: errorDelete, data: dataDetele },
  ] = useMutation(DELETE_EXPENSE);

  useEffect(() => {
    if (dataExpenses) {
      setMonthExpenses([...dataExpenses.monthExpenses]);
    }
    refetchExpenses();
    if (errorExpenses) {
      console.log(errorExpenses.message);
    }
  }, [dataExpenses, errorExpenses, refetchMovements]);

  const handleDelete = async (id: string) => {
    try {
      await executeDeleteMutation({
        variables: {
          id,
        },
      });
      //setRefetchMovements(true);
      refetchExpenses();
      refetchSpent();
    } catch (error) {
      showToast("error", "something was bad", error);
    }
  };

  const MovementItem = ({ id, description, amount }: ItemProps) => (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{amount}€</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => console.log("update")}>
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
    marginHorizontal: 16,
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
