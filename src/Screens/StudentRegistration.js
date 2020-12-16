import React, { useEffect, useState } from "react";
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
import NetInfo from "@react-native-community/netinfo";
import { firebase } from "../firebase/config";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
const db = firebase.firestore();
const StudentRegistration = () => {
  const [locals, setLocal] = useState([]);
  const [state, setUserState] = useState("");
  const [states, setState] = useState([]);
  const [lga, setLga] = useState("");
  const [
    studentIdentificationNumber,
    setStudentIdentificationNumber,
  ] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [gender, setGenderCategory] = useState("Male");
  const [town, setTown] = useState("");
  const [religion, setReligion] = useState("");
  const [primarySchoolAttended, setPrimarySchoolAttended] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfAdmission, setDateOfAdmission] = useState(null);
  const [hobby, setHooby] = useState("");
  const [admissionNumber, setAdmssionNumber] = useState("");
  const [fatherFullName, setFatherFullName] = useState("");
  const [schools, setSchools] = useState([]);
  const [address, setAddress] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [fatherTelephone, setFatherTelephone] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [motherFullName, setMotherFullName] = useState("");
  const [guardianAddress, setGuardianAddress] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("None");
  const [schoolId, setSchoolId] = useState(null);
  const [newEntrant, setNewEntrant] = useState(0);
  const [loading, setLoading] = useState(false);
  const [primarySchoolAttendedDate, setPrimarysShoolAttendedDate] = useState(
    null
  );
  const [previousClass, setPreviousClass] = useState("");
  const [fatherAddress, setFatherAddress] = useState("");
  const [motherAddress, setMotherAddress] = useState("");
  const [motherTelephone, setMotherTelephone] = useState("");
  const [guardianTelephone, setGuardianTelephone] = useState("");
  const [guardianName, setGuardianName] = useState("");

  const [classes] = useState([
    "SS One",
    "SS Two",
    "SS Three",
    "JS One",
    "JS Two",
    "JS Three",
    "Primary One",
    "Primary Two",
    "Primary Three",
    "Primary Four",
    "Primary Five",
    "Primary Six",
  ]);
  const [studentClass, setClass] = useState("JS One");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [studentflow, setStudentFlow] = useState("Transfer In");

  useEffect(() => {
    const getSchools = async () => {
      try {
        setLoading(true);
        const schoolsDt = await App.getSchools();
        setLoading(false);
        setSchools(schoolsDt);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getSchools();
    const lga = App.getAllLocalGovernment();
    setLocal(lga);
    const statesDt = App.getStates();
    setState(statesDt);
  }, [setLocal, setState]);

  const submitRecord = async () => {
    const stopLoading = () => setLoading(false);
    const networkState = await NetInfo.fetch();
    if (networkState.isConnected) {
      try {
        if (schoolId === null) {
          return App.showAlert(
            "School is required",
            "please select student school"
          );
        }
        console.log(schools);
        const index = schools.findIndex(
          (item) => parseInt(item.id) === parseInt(schoolId)
        );
        console.log("index: ", index);
        const school = schools[index].schoolName;
        setLoading(true);
        await App.createStudent({
          medicalCondition,
          guardianAddress,
          motherFullName,
          motherOccupation,
          fatherFullName,
          fatherOccupation,
          fatherTelephone,
          address,
          school,
          admissionNumber,
          hobby,
          dateOfAdmission,
          dateOfBirth,
          religion,
          town,
          gender,
          otherNames,
          surname,
          registrationNumber,
          studentClass,
          newEntrant,
          schoolId,
          school,
          placeOfBirth,
          studentflow,
          primarySchoolAttendedDate,
          previousClass,
          fatherAddress,
          motherAddress,
          motherTelephone,
          guardianTelephone,
          guardianName,
        });
        return App.showAlert(
          "Operation successful",
          "Record uploaded successfuly",
          stopLoading,
          stopLoading
        );
      } catch (error) {
        console.log(error);
        return App.showAlert(
          "Error",
          "some errrors were encountered",
          stopLoading,
          stopLoading
        );
      }
    }
    App.showAlert(
      "No network connection",
      "no network connection, save locally and synchronize later"
    );
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 8 }}>
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Surname</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setSurname(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={surname}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Other names</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setOtherNames(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={otherNames}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>
                    Student Personal Identification NO
                  </Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) =>
                      setStudentIdentificationNumber(value)
                    }
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={studentIdentificationNumber}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Regsitration number</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setRegistrationNumber(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={registrationNumber}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Date of Birth</Text>
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
                    onDateChange={(value) => setDateOfBirth(value)}
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
                  <Text style={styles.question}>Place of Birth</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => setPlaceOfBirth(text)}
                    value={placeOfBirth}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Sex</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={gender}
                    style={{ width: "100%" }}
                    placeholder="Select"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(value) => setGenderCategory(value)}
                  >
                    <Picker.Item label="Male" value={"Male"} />
                    <Picker.Item label="Female" value={"Female"} />
                  </Picker>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>State of Origin</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
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
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
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
                  <Text style={styles.question}>Town</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setTown(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={town}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Religion</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setReligion(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={religion}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>New Entrant</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={newEntrant}
                    onValueChange={(value) => setNewEntrant(value)}
                    style={{ width: "100%" }}
                    placeholder="Select"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    {[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 },
                    ].map((item, i) => (
                      <Picker.Item
                        key={i}
                        label={item.label}
                        value={item.value}
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
                  <Text style={styles.question}>Student Flow</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={studentflow}
                    onValueChange={(value) => setStudentFlow(value)}
                    style={{ width: "100%" }}
                    placeholder="Select"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    {["Transfer In", "Transfer Out", "Promoted"].map(
                      (item, i) => (
                        <Picker.Item key={i} label={item} value={item} />
                      )
                    )}
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
                    Primary/Secondary school initially attended
                  </Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setPrimarySchoolAttended(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={primarySchoolAttended}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={{ marginBottom: 4 }}>Date Attended</Text>
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
                    onDateChange={(value) =>
                      setPrimarysShoolAttendedDate(value)
                    }
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
                  <Text style={styles.question}>Class in previous school</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={previousClass}
                    onValueChange={(value) => {
                      setPreviousClass(value);
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select class"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    <Picker.Item value="" label="Select class" />
                    {classes.map((item, i) => (
                      <Picker.Item key={i} label={item} value={item} />
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
                  <Text style={styles.question}>Hobbies</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setHooby(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={hobby}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Admission Number</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setAdmssionNumber(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={admissionNumber}
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
                  <Text style={styles.question}>Father's fullname</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setFatherFullName(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={fatherFullName}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Father's Occupation</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setFatherOccupation(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={fatherOccupation}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Father's Telephone</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setFatherTelephone(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={fatherTelephone}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Father's Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setFatherAddress(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={fatherAddress}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Mother's Telephone</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setMotherTelephone(value)}
                    style={styles.inputStyle}
                    keyboardType="number-pad"
                    value={motherTelephone}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Mother's Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setMotherAddress(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={motherAddress}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Mother's occupation</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setMotherOccupation(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={motherOccupation}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Mother's Fullname</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setMotherFullName(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={motherFullName}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Guardian's Name</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setGuardianName(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={guardianName}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Guardian's Telephone</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setGuardianTelephone(value)}
                    style={styles.inputStyle}
                    keyboardType="number-pad"
                    value={guardianTelephone}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Guardian's Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setGuardianAddress(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={guardianAddress}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>School</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={schoolId}
                    onValueChange={(value) => setSchoolId(value)}
                    style={{ width: "100%" }}
                    placeholder="Select"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    {schools.map((item, i) => (
                      <Picker.Item
                        key={i}
                        label={item.schoolName}
                        value={item.id}
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
                  <Text style={styles.question}>Date of Admission</Text>
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
                    onDateChange={(value) => setDateOfAdmission(value)}
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
                  <Text style={styles.question}>Class</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={studentClass}
                    onValueChange={(value) => {
                      setClass(value);
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select class"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    {classes.map((item, i) => (
                      <Picker.Item key={i} label={item} value={item} />
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
                  <Text style={styles.question}>Medical Condition</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={medicalCondition}
                    onValueChange={(value) => setMedicalCondition(value)}
                    style={{ width: "100%" }}
                    placeholder="Select"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    {[
                      "Blind/Visually Impaired",
                      "Hearing/Speech Impaired",
                      "Phyically challenged other than visual or hearing",
                      "Mentally challenged",
                      "Albnisim",
                      "Autisim",
                      "None",
                    ].map((item, i) => (
                      <Picker.Item key={i} label={item} value={item} />
                    ))}
                  </Picker>
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
  spinnerTextStyle: {
    color: "#0000ff",
  },
});

export default StudentRegistration;
