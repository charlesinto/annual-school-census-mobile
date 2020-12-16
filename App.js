import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View, Button } from "react-native";
import Login from "./src/Screens/Login";
import Survey from "./src/Screens/Survey";
import Question from "./src/Screens/Question";
import Submissions from "./src/Screens/Submission";
import SchoolRegistration from "./src/Screens/SchoolRegistration";
import TeacherRegistration from "./src/Screens/TeacherRegistration";
import StudentRegistration from "./src/Screens/StudentRegistration";
import ClassRegistration from "./src/Screens/ClassRegistration";
import Register from "./src/Screens/Register";
import Home from "./src/Screens/Home";
import FacilityReport from "./src/Screens/FacilityReport";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Logout"
      />
    </View>
  );
}

function ResetApp({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Reset App" />
    </View>
  );
}

const stackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Survey" component={Survey} />
      <Stack.Screen
        name="Question"
        options={({ route }) => ({
          title: route.params.data.name,
        })}
        component={Question}
      />
      <Stack.Screen name="Submission" component={Submissions} />
      <Stack.Screen name="School Registration" component={SchoolRegistration} />
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
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Register" component={Register} />
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
        <Stack.Screen name="Facility Report" component={FacilityReport} />
        <Stack.Screen name="Class Attendance" component={ClassRegistration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
