import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  Alert,
  AsyncStorage,
} from "react-native";
import { Form, Item, Label, Text, Input, Button, Picker } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import App from "../services";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

const Register = ({ navigation }) => {
  navigation.setOptions({
    headerLeft: null,
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPIn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const states = App.getStates();
    setStates(states);
  }, [setStates]);

  const registerAccount = async (e) => {
    if (firstName.trim() === "") {
      return Alert.alert("Invalid Data", "First name is required");
    } else if (lastName.trim() === "") {
      return Alert.alert("Invalid Data", "Last name is required");
    } else if (phoneNumber.trim() === "") {
      return Alert.alert("Invalid Data", "Phone number is required");
    } else if (email.trim() === "") {
      return Alert.alert("Invalid Data", "Email is required");
    } else if (state.trim() === "") {
      return Alert.alert("Invalid Data", "State is required");
    } else if (pin.trim() === "") {
      return Alert.alert("Invalid Data", "PIN is required");
    } else if (password.trim() === "") {
      return Alert.alert("Invalid Data", "Password is requred");
    } else if (confirmPassword !== password) {
      return Alert.alert(
        "Invalid Data",
        "Confirm password and password do not match"
      );
    }
    const onConfirm = () => {
      setLoading(false);
    };
    try {
      setLoading(true);
      const params = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        phonenumber: phoneNumber,
        role: "AGENT",
        state_access: state,
        password: password,
        token: pin,
      };
      const response = await App.registerUser(params);
      await AsyncStorage.setItem("isActivated", "true");
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: email,
          phonenumber: phoneNumber,
          state_access: state,
        })
      );
      await AsyncStorage.setItem("xxx-token", response.data.token);
      App.showAlert(
        "Action successful",
        "Account activated successfully",
        () => {
          setLoading(false);
          navigation.navigate("Survey");
        },
        () => {
          setLoading(false);
          navigation.navigate("Survey");
        }
      );
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return App.showAlert(
          "Action error",
          error.response.data.message,
          onConfirm,
          onConfirm
        );
      }
      App.showAlert(
        "Action error",
        "Some errors were encountered",
        onConfirm,
        onConfirm
      );
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View style={styles.container}>
            <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input
                  autoFocus
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  autoCapitalize={"none"}
                />
              </Item>
              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input
                  autoFocus
                  autoCapitalize={"none"}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                />
              </Item>
              <Item floatingLabel>
                <Label>Email Address</Label>
                <Input
                  autoFocus
                  autoCapitalize={"none"}
                  value={email}
                  keyboardType="email-address"
                  onChangeText={(text) => setEmail(text)}
                />
              </Item>
              <Item floatingLabel>
                <Label>Phone Number</Label>
                <Input
                  autoFocus
                  autoCapitalize={"none"}
                  value={phoneNumber}
                  keyboardType="number-pad"
                  onChangeText={(text) => setPhoneNumber(text)}
                />
              </Item>
              <View style={{ marginTop: 20, marginLeft: 12 }}>
                {/* <Label>Statssse</Label> */}
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Ionicons name="ios-arrow-down" size={24} color="black" />
                  }
                  selectedValue={state}
                  style={{
                    width: "100%",
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                  }}
                  placeholder="Select"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  onValueChange={(value) => {
                    setState(value);
                  }}
                >
                  <Picker.Item label={"Select State"} value={""} />
                  {states.map((item, i) => (
                    <Picker.Item key={i} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  autoFocus
                  //   secureTextEntry={true}
                  autoCapitalize={"none"}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </Item>
              <Item floatingLabel>
                <Label>Confirm Password</Label>
                <Input
                  autoFocus
                  //   secureTextEntry={true}
                  autoCapitalize={"none"}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
              </Item>
              <Item floatingLabel>
                <Label>PIN</Label>
                <Input
                  autoFocus
                  autoCapitalize={"none"}
                  value={pin}
                  onChangeText={(text) => setPIn(text)}
                />
              </Item>
              <Button
                onPress={registerAccount}
                style={styles.buttonContainer}
                primary
                block
              >
                <Text>Activate & Register</Text>
              </Button>

              <View style={{ alignItems: "center", marginTop: 10 }}>
                <Image
                  source={require("../../assets/Logo-1.png")}
                  resizeMethod="auto"
                  style={{ width: 120 }}
                />
                <Text>Powered by CBC</Text>
              </View>
            </Form>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginVertical: 16,
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerTextStyle: {
    color: "#0000ff",
  },
});

export default Register;
