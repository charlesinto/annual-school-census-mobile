import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Button,
  Text as NText,
  Card,
  CardItem,
  Body,
  Picker,
  DatePicker,
} from "native-base";
import App from "../services";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../firebase/config";
import NetInfo from "@react-native-community/netinfo";

const db = firebase.firestore();

function SchoolRegistration() {
  const [locals, setLocal] = useState([]);
  const [lga, setLga] = useState("");
  const [schoolNumber, setSchoolNumber] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [state, setUserState] = useState("");
  const [states, setState] = useState([]);
  const [typeOfSchool, setTypeOfSchool] = useState("");
  const [genderCategory, setGenderCategory] = useState("");
  const [dateOfEstablishment, setDateOfEstablishment] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [principal, setPrincipal] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [mailingAddress, setMailingAddres] = useState("");
  const submitRecord = async () => {
    const networkState = await NetInfo.fetch();
    if (networkState.isConnected) {
      const onConfirmSubmit = async () => {
        try {
          await db.collection("school-registration").add({
            address,
            district,
            principal,
            telephoneNumber,
            mailingAddress,
            schoolName,
            schoolNumber,
            lga,
            state,
            typeOfSchool,
            genderCategory,
            dateOfEstablishment,
            owner,
          });
          App.showAlert("Upload successful", "Record uploaded successfully");
          resetForm();
        } catch (error) {
          App.showAlert("Action Unsuccessful", "some errors were encountered");
        }
      };

      App.showAlert(
        "Sumbit Record",
        "Are you sure you want to submit this record?",
        onConfirmSubmit
      );
    } else {
      App.showAlert(
        "No network detected",
        "Save locally and synchronize later?"
      );
    }
  };
  const resetForm = () => {
    setLocal("");
    setAddress("");
    setDateOfEstablishment("");
    setDistrict("");
    setGenderCategory("");
    setLga("");
    setMailingAddres("");
    setOwner("");
    setPrincipal("");
    setSchoolName("");
    setSchoolNumber("");
    setState("");
    setTelephoneNumber("");
    setTypeOfSchool("");
    setUserState("");
  };
  useEffect(() => {
    const lga = App.getAllLocalGovernment();
    setLocal(lga);
    const statesDt = App.getStates();
    setState(statesDt);
  }, [setLocal, setState]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>School Name</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        onChangeText={(value) => setSchoolName(value)}
                        style={styles.inputStyle}
                        keyboardType="default"
                        value={schoolName}
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
                        onChangeText={(value) => setSchoolNumber(value)}
                        style={styles.inputStyle}
                        keyboardType="default"
                        value={schoolNumber}
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
                        onChangeText={(value) => setAddress(value)}
                        style={styles.inputStyle}
                        keyboardType="default"
                        value={address}
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
                      <Picker
                        mode="dropdown"
                        iosIcon={
                          <Ionicons
                            name="ios-arrow-down"
                            size={24}
                            color="black"
                          />
                        }
                        selectedValue={lga}
                        onValueChange={(value) => setLga(value)}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                      >
                        {locals.map((item, i) => (
                          <Picker.Item
                            key={i}
                            label={item.name}
                            value={item.name}
                          />
                        ))}
                      </Picker>
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
                      <Picker
                        mode="dropdown"
                        iosIcon={
                          <Ionicons
                            name="ios-arrow-down"
                            size={24}
                            color="black"
                          />
                        }
                        selectedValue={state}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => {
                          setUserState(value);

                          const filteredLga = App.getLocalgovernments(value);
                          const findIndex = filteredLga.findIndex(
                            (item) => item.name === lga
                          );
                          if (findIndex === -1) return setLocal(filteredLga);
                        }}
                      >
                        {states.map((item, i) => (
                          <Picker.Item
                            key={i}
                            label={item.name}
                            value={item.name}
                          />
                        ))}
                      </Picker>
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
                        onChangeText={(value) => setDistrict(value)}
                        style={styles.inputStyle}
                        keyboardType="default"
                        value={district}
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
                      <DatePicker
                        defaultDate={new Date()}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date"
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        // onDateChange={this.setDate}
                        onDateChange={(value) => setDateOfEstablishment(value)}
                        disabled={false}
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
                      <Picker
                        mode="dropdown"
                        iosIcon={
                          <Ionicons
                            name="ios-arrow-down"
                            size={24}
                            color="black"
                          />
                        }
                        selectedValue={genderCategory}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setGenderCategory(value)}
                      >
                        <Picker.Item label="Boys" value={"Technical"} />
                        <Picker.Item label="Girls" value={"Girls"} />
                        <Picker.Item label="Mixed" value={"Mixed"} />
                      </Picker>
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
                      <Picker
                        mode="dropdown"
                        iosIcon={
                          <Ionicons
                            name="ios-arrow-down"
                            size={24}
                            color="black"
                          />
                        }
                        selectedValue={typeOfSchool}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setTypeOfSchool(value)}
                      >
                        <Picker.Item label="Technical" value={"Boys"} />
                        <Picker.Item label="Junior" value={"Junior"} />
                        <Picker.Item label="Senior" value={"Senior"} />
                        <Picker.Item
                          label="Junior&Senior"
                          value={"Junior&Senior"}
                        />
                        <Picker.Item label="Private" value={"Private"} />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>
                        Principal/Head of School
                      </Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        onChangeText={(value) => setPrincipal(value)}
                        style={styles.inputStyle}
                        keyboardType="default"
                        value={principal}
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
                        onChangeText={(value) => setTelephoneNumber(value)}
                        style={styles.inputStyle}
                        keyboardType="number-pad"
                        value={telephoneNumber}
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
                        onChangeText={(value) => setMailingAddres(value)}
                        style={styles.inputStyle}
                        keyboardType="default"
                        value={mailingAddress}
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
                      <Picker
                        mode="dropdown"
                        iosIcon={
                          <Ionicons
                            name="ios-arrow-down"
                            size={24}
                            color="black"
                          />
                        }
                        selectedValue={owner}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setOwner(value)}
                      >
                        <Picker.Item
                          label="Proprietor/Proprietress"
                          value={"Proprietor/Proprietress"}
                        />
                        <Picker.Item
                          label="State Government"
                          value={"State Government"}
                        />
                        <Picker.Item
                          label="Federal Government"
                          value={"Federal Government"}
                        />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </ScrollView>
          </View>
          <Button block onPress={submitRecord}>
            <NText>Submit</NText>
          </Button>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

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

export default SchoolRegistration;
