import React, { useEffect } from "react";
import { View, AsyncStorage } from "react-native";

function Home({ navigation }) {
  useEffect(() => {
    const getAppState = async () => {
      if (!(await AsyncStorage.getItem("isActivated"))) {
        return navigation.navigate("Register");
      } else if (!(await AsyncStorage.getItem("user"))) {
        return navigation.navigate("Login");
      }
      return navigation.navigate("Survey");
    };
    getAppState();
  });
  return <View></View>;
}

export default Home;
