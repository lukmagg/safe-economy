import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { MovementsContext } from "../context";

const MONTH_EXPENSES = gql`
  query GetMonthExpenses {
    monthExpenses {
      id
      description
      amount
    }
  }
`;

type ItemProps = { id: string; description: string; amount: number };

const Item = ({ id, description, amount }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.description}>
      {description} - {amount}
    </Text>
  </View>
);

const MovementsList = () => {
  const { loading, error, data, refetch } = useQuery(MONTH_EXPENSES);
  const [refetchMovements, setRefetchMovements] = useContext(MovementsContext);

  const [monthExpenses, setMonthExpenses] = useState<ItemProps[]>();

  useEffect(() => {
    if (data) {
      if (refetchMovements) {
        refetch();
        setRefetchMovements(false);
      }
      setMonthExpenses([...data.monthExpenses]);
    }
    if (error) {
      console.log(error.message);
    }
  }, [data, error, refetchMovements]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={monthExpenses}
        renderItem={({ item }) => (
          <Item
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 32,
  },
});
