import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Button as MButton,
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
  CheckBox,
} from "native-base";
import App from "../services";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../firebase/config";
import NetInfo from "@react-native-community/netinfo";
import Spinner from "react-native-loading-spinner-overlay";
import * as Location from "expo-location";

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
  const [dateOfEstablishment, setDateOfEstablishment] = useState(null);
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [principal, setPrincipal] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [mailingAddress, setMailingAddres] = useState("");
  const [privateLevel, setPrivate] = useState(false);
  const [stateLevel, setStateLevel] = useState(true);
  const [federal, setFederal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recognitionStatus, setRecognitionStatus] = useState("");
  const [schoolDistance, setSchoolDistance] = useState(0);
  const [boardingFacility, setBoardingFacility] = useState("");
  const [pta, setPta] = useState("");
  const [classRoomNumber, setClassroomNumber] = useState(0);
  const [enoughSeats, setEnoughSeats] = useState("");
  const [libraryNumber, setLibraryNumber] = useState(0);
  const [laboratoryNumber, setLaboratoryNumber] = useState(0);
  const [schoolCondition, setSchoolCondition] = useState("");
  const [schoolCoordinate, setSchoolCoordinate] = useState("");
  const [religionLevel, setReligionLevel] = useState(false);
  const submitRecord = async () => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      const stopLoading = () => setLoading(false);
      const onConfirmSubmit = async () => {
        try {
          setLoading(true);
          await App.createSchool({
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
            recognitionStatus,
            schoolDistance,
            boardingFacility,
            pta,
            classRoomNumber,
            enoughSeats,
            libraryNumber,
            laboratoryNumber,
            schoolCondition,
            schoolCoordinate,
          });

          App.showAlert(
            "Upload successful",
            "Record uploaded successfully",
            stopLoading,
            stopLoading
          );
        } catch (error) {
          setLoading(false);
          App.showAlert(
            "Action Unsuccessful",
            "some errors were encountered",
            stopLoading,
            stopLoading
          );
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
  const getCoordinate = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg('Permission to access location was denied');
      }
      setLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      setLoading(false);
      const coords = `${location.coords.latitude},${location.coords.longitude}`;
      setSchoolCoordinate(coords);
    } catch (error) {
      startLoading(false);
    }
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
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
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
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginVertical: 4,
                        }}
                      >
                        <View>
                          <CheckBox
                            checked={federal}
                            onPress={() => {
                              setFederal(true);
                              setStateLevel(false);
                              setPrivate(false);
                              setReligionLevel(false);
                            }}
                          />
                          <Text>Federal</Text>
                        </View>
                        <View>
                          <CheckBox
                            checked={stateLevel}
                            onPress={() => {
                              setStateLevel(true);
                              setFederal(false);
                              setPrivate(false);
                              setReligionLevel(false);
                            }}
                          />
                          <Text>State</Text>
                        </View>
                        <View>
                          <CheckBox
                            checked={privateLevel}
                            onPress={() => {
                              setPrivate(true);
                              setStateLevel(false);
                              setFederal(false);
                              setReligionLevel(false);
                            }}
                          />
                          <Text>Private</Text>
                        </View>
                        <View>
                          <CheckBox
                            checked={religionLevel}
                            onPress={() => {
                              setPrivate(false);
                              setStateLevel(false);
                              setFederal(false);
                              setReligionLevel(true);
                            }}
                          />
                          <Text>Religion</Text>
                        </View>
                      </View>
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
                        <Picker.Item
                          label="Special needs"
                          value={"Special needs"}
                        />
                        <Picker.Item label="Nomadic" value={"Nomadic"} />
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
                        <Picker.Item label="NGO" value={"NGO"} />
                        <Picker.Item
                          label="Faith Based"
                          value={"Faith Based"}
                        />
                        <Picker.Item label="Others" value={"Others"} />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>Recognition Status</Text>
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
                        selectedValue={recognitionStatus}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setRecognitionStatus(value)}
                      >
                        <Picker.Item
                          label="Yet to Approved"
                          value={"Yet to Approved"}
                        />
                        <Picker.Item label="In Process" value={"In Process"} />
                        <Picker.Item label="Approved" value={"Approved"} />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              {/* <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>School Distance (KM)</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          onChangeText={(text) => setSchoolDistance(text)}
                          value={schoolDistance}
                          keyboardType="number-pad"
                          style={styles.inputStyle}
                        />
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card> */}
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>Boarding Facility</Text>
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
                        selectedValue={boardingFacility}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setBoardingFacility(value)}
                      >
                        <Picker.Item label="Yes" value={"Yes"} />
                        <Picker.Item label="No" value={"No"} />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              {/* <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>PTA</Text>
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
                        selectedValue={pta}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setPta(value)}
                      >
                        <Picker.Item label="Yes" value={"Yes"} />
                        <Picker.Item label="No" value={"No"} />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card> */}
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>How many classroom</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        value={classRoomNumber}
                        style={styles.inputStyle}
                        onChangeText={(text) => setClassroomNumber(text)}
                      />
                    </View>
                  </Body>
                </CardItem>
              </Card>
              {/* <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>Has enough seats</Text>
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
                        selectedValue={enoughSeats}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setEnoughSeats(value)}
                      >
                        <Picker.Item label="Yes" value={"Yes"} />
                        <Picker.Item label="No" value={"No"} />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card> */}
              {/* <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>How many Library</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          value={libraryNumber}
                          style={styles.inputStyle}
                          onChangeText={(text) => setLibraryNumber(text)}
                        />
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card> */}
              {/* <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>How many Laboratory</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          onChangeText={(text) => setLaboratoryNumber(text)}
                          value={laboratoryNumber}
                          keyboardType="number-pad"
                          style={styles.inputStyle}
                        />
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card> */}
              {/* <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>
                        Present School condition
                      </Text>
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
                        selectedValue={schoolCondition}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(value) => setSchoolCondition(value)}
                      >
                        <Picker.Item label="Good" value={"Good"} />
                        <Picker.Item
                          label="Need minor repairs"
                          value={"Need minor repairs"}
                        />
                        <Picker.Item
                          label="Need major repairs"
                          value={"Need major repairs"}
                        />
                        <Picker.Item
                          label="Under construction"
                          value={"Under construction"}
                        />
                        <Picker.Item label="Others" value={"Others"} />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card> */}
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>School Coordinate</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        value={schoolCoordinate}
                        onChangeText={(text) => setSchoolCoordinate(text)}
                        style={styles.inputStyle}
                      />
                    </View>
                    <View
                      style={{
                        marginVertical: 8,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <MButton
                        title="Get Coordinates"
                        color="red"
                        onPress={getCoordinate}
                      />
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
  spinnerTextStyle: {
    color: "#0000ff",
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
