import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    description: "First Item",
    amount: 45,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    description: "Second Item",
    amount: 45,
  },
  {
    id: "5869aa0f-3da1-471f-bd96-145571e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-461f-bd96-145571e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-771f-bd96-145571e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-471f-bd36-145571e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-471f-bd06-145571e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145570e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29072",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145579e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145271e29d72",
    description: "Third Item",
    amount: 45,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    description: "Third Item",
    amount: 45,
  },
];

type ItemProps = { description: string; amount: number };

const Item = ({ description, amount }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.description}>
      {description} - {amount}
    </Text>
  </View>
);

const MovementsList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item description={item.description} amount={item.amount} />
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
