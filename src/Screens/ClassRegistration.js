import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
  View,
} from "react-native";
import { Button, Text as NText, Card, CardItem, Body } from "native-base";

const ClassRegistration = () => {
  const submitRecord = () => {};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>School Name</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>School Number</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Local Government</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>State</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Education District</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Date of Establishment</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="date"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Type of School</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Gender Category</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Principal/Head of School</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Telephone number</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Mailing Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Owner</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => {}}
                    style={styles.inputStyle}
                    keyboardType="default"
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
        </ScrollView>
        <Button block onPress={submitRecord}>
          <NText>Submit</NText>
        </Button>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  question: {
    fontWeight: "bold",
    fontSize: 15,
  },
  hint: {
    color: "gray",
    fontSize: 12,
  },
  inputWrapper: {
    paddingTop: 8,
    width: "100%",
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "100%",
    paddingVertical: 4,
  },
  coordinateContainer: {
    paddingVertical: 8,
    width: "100%",
    flexDirection: "row",
  },
  coordianteInput: {
    flex: 1,
    marginRight: 8,
  },
});

export default ClassRegistration;
