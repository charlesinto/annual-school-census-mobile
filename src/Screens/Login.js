import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Form, Item, Label, Text, Input, Button } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
  navigation.setOptions({
    headerLeft: null,
  });
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View style={styles.container}>
            <Form>
              <Item floatingLabel>
                <Label>Email Address | Phone number</Label>
                <Input autoFocus autoCapitalize={"none"} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input autoFocus autoCapitalize={"none"} />
              </Item>
              <Button
                onPress={() => navigation.navigate("Survey")}
                style={styles.buttonContainer}
                primary
                block
              >
                <Text>Log In</Text>
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
    marginTop: 100,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginVertical: 16,
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
