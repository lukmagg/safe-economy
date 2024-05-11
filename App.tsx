import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Expense from "./src/components/Expense";
import Income from "./src/components/Income";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Account from "./src/components/Account";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.10.126:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Account />
        <Income />
        <Expense />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    backgroundColor: "black",
    paddingHorizontal: 25,
  },
});

AppRegistry.registerComponent("MyApplication", () => App);
