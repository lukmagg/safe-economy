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
import { gql, useQuery } from "@apollo/client";
import { MovementsContext } from "../context";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

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

const MovementItem = ({ id, description, amount }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.text}>
      {description} - {amount}
    </Text>
    <View style={styles.buttonsContainer}>
      <Pressable onPress={() => console.log("update")}>
        <Text style={[styles.text, styles.textButton]}>edit</Text>
      </Pressable>
      <Pressable
        onPress={() => console.log("delete")}
        //onPress={() => handleDelete(id)}
      >
        <Text style={[styles.text, styles.textButton, styles.deleteButton]}>
          delete
        </Text>
      </Pressable>
    </View>
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
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
