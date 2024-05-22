import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../apolloClient";
import { MovementsContext } from "../../context";

export default function TabLayout() {
  const [refetchMovements, setRefetchMovements] = useState(false);

  return (
    <ApolloProvider client={client}>
      <MovementsContext.Provider
        value={[refetchMovements, setRefetchMovements]}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "black",
            tabBarStyle: {
              backgroundColor: "white",
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              paddingBottom: 5,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Actions",
              tabBarIcon: ({ color }) => (
                <FontAwesome size={28} name="home" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="movements"
            options={{
              title: "Movements",
              tabBarIcon: ({ color }) => (
                <FontAwesome size={28} name="cog" color={color} />
              ),
            }}
          />
        </Tabs>
      </MovementsContext.Provider>
    </ApolloProvider>
  );
}
