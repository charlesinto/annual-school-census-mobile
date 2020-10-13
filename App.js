import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import Login from "./src/Login";
import Survey from "./src/Survey";
import Question from "./src/Question";
import Submissions from "./src/Submission";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Survey">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Survey" component={Survey} />
        <Stack.Screen
          name="Question"
          options={({ route }) => ({
            title: route.params.name,
          })}
          component={Question}
        />
        <Stack.Screen name="Submission" component={Submissions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
