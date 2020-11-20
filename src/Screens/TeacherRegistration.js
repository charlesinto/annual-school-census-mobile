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
const TeacherRegistration = () => {
  const [locals, setLocal] = useState([]);
  const [state, setUserState] = useState("");
  const [states, setState] = useState([]);
  const [lga, setLga] = useState("");
  const [oracleNumber, setOracleNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [gender, setGenderCategory] = useState("Female");
  const [maidenName, setMaidenName] = useState("");
  const [designation, setDesignation] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [qualification, setQualification] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfFirstAppointment, setDateOfFirstAppointment] = useState(null);
  const [dateOfInterStateTravel, setDateOfInterstateTravle] = useState(null);
  const [dateOfConfirmation, setDateOfConfirmation] = useState(null);
  const [dateOfPromotion, setDateOfPromotion] = useState(null);
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [telePhoneNumber, setTelephoneNumber] = useState("");
  const [pfa, setPfa] = useState("");
  const [pfaNumber, setPfaNumber] = useState("");
  const [residentNumber, setResidentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [exitDate, setExitDate] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [schoolId, setSchoolId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qualificationDate, setQualificationDate] = useState(null);
  const [salarySource, setSalarySource] = useState("Other");
  const [subjectTaught, setSubjectTaught] = useState("");
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
  const [teacherClass, setTeacherClass] = useState("SS One");
  const [teachingType, setTeachingType] = useState("Part Time");
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
    const networkState = await NetInfo.fetch();
    const stopLoading = () => setLoading(false);
    if (networkState.isConnected) {
      try {
        if (schoolId === null) {
          return App.showAlert("School ID is required", "please choose school");
        }
        if (qualification.trim() === "") {
          return App.showAlert(
            "Qualification is required",
            "please choose qualification"
          );
        }
        const findIndex = schools.findIndex(
          (item) => parseInt(item.id) === parseInt(schoolId)
        );
        const schoolName = schools[findIndex].schoolName;
        setLoading(true);
        await App.createTeacher({
          remarks,
          exitDate,
          email,
          residentNumber,
          pfaNumber,
          telePhoneNumber,
          homeAddress,
          school,
          dateOfPromotion,
          dateOfConfirmation,
          dateOfInterStateTravel,
          dateOfFirstAppointment,
          dateOfBirth,
          qualification,
          gradeLevel,
          designation,
          maidenName,
          gender,
          otherNames,
          surname,
          registrationNumber,
          oracleNumber,
          state,
          schoolName,
          schoolId,
          qualificationDate,
          salarySource,
          subjectTaught,
          teacherClass,
          teachingType,
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
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView style={{ flex: 1, paddingHorizontal: 8 }}>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Oracle number</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setOracleNumber(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={oracleNumber}
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
                  <Text style={styles.question}>Maiden Name</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setMaidenName(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={maidenName}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Desgination</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setDesignation(value)}
                    style={styles.inputStyle}
                    keyboardType="date"
                    value={designation}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Grade level</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setGradeLevel(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={gradeLevel}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Source of Salary</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={salarySource}
                    style={{ width: "100%" }}
                    placeholder="Select"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(value) => setSalarySource(value)}
                  >
                    <Picker.Item
                      label="Federal Government"
                      value={"Federal Government"}
                    />
                    <Picker.Item
                      label="State Government"
                      value={"State Government"}
                    />
                    <Picker.Item label="PTA" value={"PTA"} />
                    <Picker.Item label="Volunteer" value={"Volunteer"} />
                    <Picker.Item label="Other" value={"Other"} />
                  </Picker>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Qualification</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={qualification}
                    onValueChange={(value) => {
                      setQualification(value);
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select Qualification"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    {[
                      "Below SSCE",
                      "SSCE/WAEC",
                      "OND/DIPLOMA",
                      "NCE",
                      "PGDE",
                      "B.ED",
                      "M.ED",
                      "GRADE 11",
                      "B.A(ED)",
                      "B.SC/HND",
                      "B.SC(ED)",
                      "HND",
                      "Other Degrees/graduate",
                    ].map((item, i) => (
                      <Picker.Item key={i} label={item} value={item} />
                    ))}
                  </Picker>
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
                    onDateChange={(value) => setQualificationDate(value)}
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
                  <Text style={styles.question}>Date of first appointment</Text>
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
                    onDateChange={(value) => setDateOfFirstAppointment(value)}
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
                  <Text style={styles.question}>
                    Date of inter-state transfer
                  </Text>
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
                    onDateChange={(value) => setDateOfInterstateTravle(value)}
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
                  <Text style={styles.question}>Date of confirmation</Text>
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
                    onDateChange={(value) => setDateOfConfirmation(value)}
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
                  <Text style={styles.question}>Date of last promotion</Text>
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
                    onDateChange={(value) => setDateOfPromotion(value)}
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
                  <Text style={styles.question}>Subject Taught</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={subjectTaught}
                    multiline={true}
                    onChangeText={(text) => setSubjectTaught(text)}
                    style={styles.inputStyle}
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
                    selectedValue={teacherClass}
                    onValueChange={(value) => setTeacherClass(value)}
                    style={{ width: "100%" }}
                    placeholder="Select"
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
                  <Text style={styles.question}>Teaching Type</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Ionicons name="ios-arrow-down" size={24} color="black" />
                    }
                    selectedValue={teachingType}
                    onValueChange={(value) => setTeachingType(value)}
                    style={{ width: "100%" }}
                    placeholder="Select"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                  >
                    {["Part Time", "Full Time"].map((item, i) => (
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
                  <Text style={styles.question}>Home Address</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setHomeAddress(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={homeAddress}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Telephone Number</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setTelephoneNumber(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={telePhoneNumber}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>PFA</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setPfa(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={pfa}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>PFA number</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setPfaNumber(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={pfaNumber}
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
                    State resident registration number
                  </Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setResidentNumber(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={residentNumber}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Email</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setEmail(value)}
                    style={styles.inputStyle}
                    keyboardType="email-address"
                    value={setEmail}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.question}>Exit Date</Text>
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
                    onDateChange={(value) => setExitDate(value)}
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
                  <Text style={styles.question}>Remarks</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={(value) => setRemarks(value)}
                    style={styles.inputStyle}
                    keyboardType="default"
                    value={remarks}
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
  spinnerTextStyle: {
    color: "#0000ff",
  },
});

export default TeacherRegistration;
