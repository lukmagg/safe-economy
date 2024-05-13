import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Expense from "./../src/components/Expense";
import Income from "./../src/components/Income";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Account from "./../src/components/Account";
import { Link } from "expo-router";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.10.126:3001/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View className="flex-1 justify-center bg-black p-6">
        {/* <Account />
        <Income />
        <Expense />
        */}
        <StatusBar style="auto" />
        <Link href="/movements" className="color-white text-lg">
          Movements
        </Link>
      </View>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("MyApplication", () => App);
