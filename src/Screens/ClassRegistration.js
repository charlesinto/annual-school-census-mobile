import React, { useEffect, useState, createRef, useLayoutEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  SafeAreaView,
  Text,
  FlatList,
  Button,
  Alert,
  View,
} from "react-native";
import { Text as NText, Card, CardItem, Body, Picker } from "native-base";
import App from "../services";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import DelayInput from "react-native-debounce-input";
import Spinner from "react-native-loading-spinner-overlay";

const ClassRegistration = ({ navigation }) => {
  const inputRef = createRef();
  const [students, setStudents] = useState([]);
  const [studentDatabase, setStudentsDatabase] = useState([]);
  const [schools, setSchools] = useState([]);
  const [schoolDataBase, setSchoolDataBase] = useState([]);
  const [school, setSchool] = useState("");
  const [searchValue, setValue] = useState("");
  const [lga, setLga] = useState("");
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
  const [studentClass, setClass] = useState("");
  const [locals, setLocal] = useState([]);
  const [state, setUserState] = useState("");
  const [states, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    const refreshData = async () => {
      try {
        setLoading(true);
        const studentsDt = await App.getStudents();
        const schoolsDt = await App.getSchools();
        const lga = App.getAllLocalGovernment();
        setLocal(lga);
        const statesDt = App.getStates();
        setState(statesDt);
        // setSchools(schoolsDt);
        setSchoolDataBase(schoolsDt);
        setStudentsDatabase(studentsDt);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("errror is: ", error);
      }
    };
    navigation.setOptions({
      headerRight: () => <Button title="Refresh" onPress={refreshData} />,
    });
  }, [navigation]);
  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        const studentsDt = await App.getStudents();
        const schoolsDt = await App.getSchools();
        const lga = App.getAllLocalGovernment();
        setLocal(lga);
        const statesDt = App.getStates();
        setState(statesDt);
        // setSchools(schoolsDt);
        setSchoolDataBase(schoolsDt);
        setStudentsDatabase(studentsDt);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("errror is: ", error);
      }
    };
    getStudents();
  }, []);
  const renderStudents = ({ item }) => {
    return (
      <Card>
        <CardItem>
          <Body>
            <View>
              <Text>{item.studentName}</Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ fontSize: 11, color: "gray", marginRight: 4 }}>
                  Class
                </Text>
                <Text>{item.studentClass}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "flex-end",
                  marginTop: 8,
                  flexDirection: "row",
                }}
              >
                <Button
                  onPress={() => markStudentAbsent(item)}
                  color="red"
                  style={{ marginRight: 8 }}
                  title="Absent"
                />
                <Button
                  onPress={() => markStudentPresent(item)}
                  title="Present"
                />
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  };
  const markStudentAbsent = async (item) => {
    try {
      setLoading(true);
      await App.markAttendance(item, "Absent");

      Alert.alert(
        "Attendance Successful",
        "Student attendance taken successfully",
        [
          {
            text: "Cancel",
            onPress: () => setLoading(false),
            style: "cancel",
          },
          { text: "OK", onPress: () => setLoading(false) },
        ],
        { cancelable: true }
      );
    } catch (error) {
      if (error.response.status === 400) {
        Alert.alert(
          "Attendance Unsuccessful",
          `Student Attendance has been taken for ${new Date().toLocaleDateString()}`,
          [
            {
              text: "Cancel",
              onPress: () => setLoading(false),
              style: "cancel",
            },
            { text: "OK", onPress: () => setLoading(false) },
          ],
          { cancelable: false }
        );
        return;
        // reject(error);
      }
      setLoading(false);
      console.log(error);
    }
  };
  const markStudentPresent = async (item) => {
    try {
      console.log("called here ");
      setLoading(true);
      await App.markAttendance(item, "Present");

      Alert.alert(
        "Attendance Successful",
        "Student attendance taken successfully",
        [
          {
            text: "Cancel",
            onPress: () => setLoading(false),
            style: "cancel",
          },
          { text: "OK", onPress: () => setLoading(false) },
        ],
        { cancelable: true }
      );
    } catch (error) {
      if (error.response.status === 400) {
        Alert.alert(
          "Attendance Unsuccessful",
          `Student Attendance has been taken for ${new Date().toLocaleDateString()}`,
          [
            {
              text: "Cancel",
              onPress: () => setLoading(false),
              style: "cancel",
            },
            { text: "OK", onPress: () => setLoading(false) },
          ],
          { cancelable: false }
        );
        return;
        // reject(error);
      }
      setLoading(false);
      console.log(error);
    }
  };
  const debounce = (func, wait, immediate) => {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;

    // Calling debounce returns a new anonymous function
    return function () {
      // reference the context and args for the setTimeout function
      var context = this,
        args = arguments;

      // Should the function be called now? If immediate is true
      //   and not already in a timeout then the answer is: Yes
      var callNow = immediate && !timeout;

      // This is the basic debounce behaviour where you can call this
      //   function several times, but it will only execute once
      //   [before or after imposing a delay].
      //   Each time the returned function is called, the timer starts over.
      clearTimeout(timeout);

      // Set the new timeout
      timeout = setTimeout(function () {
        // Inside the timeout function, clear the timeout variable
        // which will let the next execution run when in 'immediate' mode
        timeout = null;

        // Check if the function already ran with the immediate flag
        if (!immediate) {
          // Call the original function with apply
          // apply lets you define the 'this' object as well as the arguments
          //    (both captured before setTimeout)
          func.apply(context, args);
        }
      }, wait);

      // Immediate mode and no wait timer? Execute the function..
      if (callNow) func.apply(context, args);
    };
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
        <View style={{ paddingHorizontal: 8 }}>
          <View style={{ width: "100%", marginTop: 8, marginVertical: 8 }}>
            <View
              style={{
                with: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text>Attendance Date</Text>
              <Text style={{ color: "gray" }}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
            <View style={{ marginBottom: 8 }}>
              <View style={styles.inputWrapper}>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Ionicons name="ios-arrow-down" size={24} color="black" />
                  }
                  selectedValue={state}
                  style={{ width: "100%" }}
                  placeholder="Select State"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  onValueChange={(value) => {
                    setUserState(value);

                    const filteredLga = App.getLocalgovernments(value);
                    const findIndex = filteredLga.findIndex(
                      (item) => item.name === lga
                    );
                    const filteredSchool = schoolDataBase.filter(
                      (item) => item.state === value
                    );
                    // console.log("sc", schoolDataBase);
                    setSchools(filteredSchool);
                    if (findIndex === -1) return setLocal(filteredLga);
                  }}
                >
                  {states.map((item, i) => (
                    <Picker.Item key={i} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ marginBottom: 8 }}>
              <View style={styles.inputWrapper}>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Ionicons name="ios-arrow-down" size={24} color="black" />
                  }
                  selectedValue={lga}
                  onValueChange={(value) => {
                    setLga(value);
                    const filteredSchool = schoolDataBase.filter(
                      (item) => item.lga === value
                    );
                    setSchools(filteredSchool);
                  }}
                  style={{ width: "100%" }}
                  placeholder="Select LGA"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                >
                  {locals.map((item, i) => (
                    <Picker.Item key={i} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ marginBottom: 8 }}>
              <View style={styles.inputWrapper}>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Ionicons name="ios-arrow-down" size={24} color="black" />
                  }
                  selectedValue={school}
                  onValueChange={(value) => {
                    const filteredStudent = studentDatabase.filter(
                      (item) => item.school == value
                    );
                    console.log(filteredStudent);
                    setStudents(filteredStudent);
                    setSchool(value);
                  }}
                  style={{ width: "100%" }}
                  placeholder="Select school"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                >
                  {schools.map((item, i) => (
                    <Picker.Item
                      key={i}
                      label={item.schoolName}
                      value={item.schoolName}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ marginBottom: 8 }}>
              <View style={styles.inputWrapper}>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Ionicons name="ios-arrow-down" size={24} color="black" />
                  }
                  selectedValue={studentClass}
                  onValueChange={(value) => {
                    const filteredStudents = studentDatabase.filter(
                      (item) =>
                        item.studentClass === value && item.school === school
                    );
                    console.log(value);
                    console.log("filtered: ", filteredStudents);
                    setStudents(filteredStudents);
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
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                borderColor: "gray",
                paddingVertical: 10,
                paddingLeft: 8,
                borderRadius: 6,
              }}
            >
              <DelayInput
                value={searchValue}
                minLength={3}
                inputRef={inputRef}
                onChangeText={(text) => {
                  setValue(text);
                  let re = new RegExp(text, "i");

                  const newStudens = students.filter(function (item) {
                    return item.studentName.match(re);
                  });
                  setStudents(newStudens);
                }}
                placeholder="Search Student"
                delayTimeout={1000}
                // style={{ margin: 10, height: 40, borderColor: "gray", borderWidth: 1 }}
              />
              {/* <TextInput
                placeholder="Search school or student"
                onChangeText={(text) => {
                  setSchool(text);
                  const func = debounce(function () {
                    searchStudent();
                  }, 2000);
                }}
              /> */}
            </View>
          </View>

          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={renderStudents}
          />
        </View>
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
    width: "100%",
    backgroundColor: "#fff",
    paddingRight: 8,
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

export default ClassRegistration;
