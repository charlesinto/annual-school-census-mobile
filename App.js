import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import Login from "./src/Screens/Login";
import Survey from "./src/Screens/Survey";
import Question from "./src/Screens/Question";
import Submissions from "./src/Screens/Submission";
import SchoolRegistration from "./src/Screens/SchoolRegistration";
import TeacherRegistration from "./src/Screens/TeacherRegistration";
import StudentRegistration from "./src/Screens/StudentRegistration";
import ClassRegistration from "./src/Screens/ClassRegistration";

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
            title: route.params.data.name,
          })}
          component={Question}
        />
        <Stack.Screen name="Submission" component={Submissions} />
        <Stack.Screen
          name="School Registration"
          component={SchoolRegistration}
        />
        <Stack.Screen
          name="Teacher Registration"
          component={TeacherRegistration}
        />
        <Stack.Screen
          name="Student Registration"
          component={StudentRegistration}
        />
        <Stack.Screen name="Class Attendance" component={ClassRegistration} />
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
