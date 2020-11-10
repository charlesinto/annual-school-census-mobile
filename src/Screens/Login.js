import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Form, Item, Label, Text, Input, Button } from "native-base";

const Login = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View style={styles.container}>
          <Form>
            <Item floatingLabel>
              <Label>Field Agent Code</Label>
              <Input autoFocus autoCapitalize={"none"} autoCorrect={false} />
            </Item>
            <Button
              onPress={() => navigation.navigate("Survey")}
              style={styles.buttonContainer}
              primary
              block
            >
              <Text>Log In</Text>
            </Button>
          </Form>
        </View>
      </TouchableWithoutFeedback>
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
