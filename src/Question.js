import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
  AsyncStorage,
} from "react-native";
import {
  Card,
  CardItem,
  Body,
  Button,
  Text as NText,
  Icon,
  ListItem,
  Picker,
} from "native-base";
import { TextInput } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { v4 as uuidv4 } from "uuid";
import NetInfo from "@react-native-community/netinfo";
import { firebase } from "../firebase/config";

// const data = {
//   id: 11,
//   name: "2016/2017 Junior Secondary Education School Census",
//   survey: [
//     {
//       id: 1,
//       section: "School Identification",
//       data: [
//         {
//           question: "How many students\\pupils board at the school premises",
//           type: "single-select",
//           hint: "School Name",
//           required: true,
//           options: ["Male", "Female"],
//           id: 2,
//         },
//         {
//           question: "Number and Street Nane",
//           type: "text",
//           hint: "Street Name",
//           id: 3,
//         },
//         {
//           question: "Ward",
//           type: "text",
//           hint: "ward",
//           id: 4,
//         },
//         {
//           question: "Village or Town",
//           type: "number",
//           id: 5,
//         },
//         {
//           question: "School Coordinate",
//           type: "coordinate",
//           id: 6,
//         },
//         {
//           question: "Email Address",
//           type: "email",
//           id: 7,
//         },
//         {
//           question: "Ownership",
//           type: "single-select",
//           id: 8,
//           options: ["Federal", "State", "LGA", "Community"],
//         },
//         {
//           question: "Did the school prepare SDP in the last school year",
//           type: "boolean",
//           id: 9,
//         },
//       ],
//     },
//     {
//       id: 2,
//       section: "School Charachteristics",
//       data: [
//         {
//           question: "School Name",
//           type: "text",
//           hint: "School Name",
//           required: true,
//           id: 2,
//         },
//         {
//           question: "Number and Street Nane",
//           type: "text",
//           hint: "Street Name",
//           id: 3,
//         },
//         {
//           question: "Ward",
//           type: "text",
//           hint: "ward",
//           id: 4,
//         },
//         {
//           question: "Village or Town",
//           type: "number",
//           id: 5,
//         },
//         {
//           question: "School Coordinate",
//           type: "coordinate",
//           id: 6,
//         },
//         {
//           question: "Email Address",
//           type: "email",
//           id: 7,
//         },
//         {
//           question: "Ownership",
//           type: "single-select",
//           id: 8,
//           options: ["Federal", "State", "LGA", "Community"],
//         },
//         {
//           question: "Did the school prepare SDP in the last school year",
//           type: "boolean",
//           id: 9,
//         },
//       ],
//     },
//   ],
// };

const Question = ({ route }) => {
  const [data, setData] = useState({});
  const db = firebase.firestore();
  const [location, setLocation] = useState(null);
  const [response, setResponse] = useState({});
  const [errMsg, setErrorMsg] = useState();
  const [validate, setValidate] = useState({});
  useEffect(() => {
    setData(route.params.data);
  }, [route]);
  const submitRecord = () => {
    const validaStatus = {};

    data.survey.forEach((record) => {
      record.data.forEach((field) => {
        if (field.required) {
          if (
            response[`${record.id}-${field.id}`] &&
            response[`${record.id}-${field.id}`].trim() !== ""
          ) {
            field.response = response[`${record.id}-${field.id}`];
          } else {
            validaStatus[`${record.id}-${field.id}`] = "Field is required";
            setValidate((state) => ({
              ...state,
              [`${record.id}-${field.id}`]: "Field is required",
            }));
          }
        } else {
          field.response = response[`${record.id}-${field.id}`]
            ? response[`${record.id}-${field.id}`]
            : "";
        }
      });
    });
    if (Object.keys(validaStatus).length > 0) {
      return Alert.alert(
        "Validation failed",
        "Please fill all required fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    Alert.alert(
      "Submit form",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            data.responseId = uuidv4();
            data.createdAt = new Date();
            const networkState = await NetInfo.fetch();
            if (networkState.isConnected) {
              try {
                await db.collection("responses").add({ ...data });
                setResponse({});
                Alert.alert("Submit Form", "Form Submitted Successfully", [
                  {
                    text: "Ok",
                    onPress: () => console.log("success"),
                  },
                ]);
              } catch (error) {
                console.log(error);
                Alert.alert(
                  "Operation Failed",
                  "Some errors were encountered, could not save response",
                  [
                    {
                      text: "Ok",
                      onPress: () => console.log("pressed"),
                    },
                  ]
                );
              }
            } else {
              Alert.alert(
                "No Internet Access",
                "No Internet access, save locally and synchronize later?",
                [
                  {
                    text: "Dont't Save",
                    onPress: () => {},
                  },
                  {
                    text: "Ok",
                    onPress: async () => {
                      try {
                        const surveys = await AsyncStorage.getItem(
                          "offline-survey"
                        );
                        if (surveys === null) {
                          const newData = JSON.stringify([data]);
                          await AsyncStorage.setItem("offline-survey", newData);
                          return Alert.alert(
                            "Survey Saved",
                            "Survey saved locally",
                            [
                              {
                                text: "Ok",
                                onPress: () => console.log("saved"),
                              },
                            ]
                          );
                        }
                        const parsedSurveys = JSON.parse(surveys);
                        parsedSurveys.push(data);
                        await AsyncStorage.setItem(
                          "offline-survey",
                          JSON.stringify(parsedSurveys)
                        );
                        setResponse({});
                        return Alert.alert(
                          "Survey Saved",
                          "Survey saved locally",
                          [
                            {
                              text: "Ok",
                              onPress: () => console.log("saved"),
                            },
                          ]
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    },
                  },
                ]
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const requestLocation = async (id) => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      return setErrorMsg("Permission to access location was denied");
    }
    const location = await Location.getCurrentPositionAsync({});

    setResponse((state) => ({
      ...state,
      [id]: `${location.coords.latitude},${location.coords.longitude}`,
    }));
  };
  const renderInput = (categoryId, item) => {
    switch (item.type) {
      // case "text":
      //   return (
      //     <View style={styles.inputWrapper}>
      //       <TextInput
      //         onChangeText={(value) =>
      //           setResponse((state) => ({
      //             ...state,
      //             [`${categoryId}-${item.id}`]: value,
      //           }))
      //         }
      //         value={response[`${categoryId}-${item.id}`]}
      //         style={styles.inputStyle}
      //         placeholder={item.hint}
      //         keyboardType="default"
      //         autoCapitalize={false}
      //         autoCorrect={false}
      //       />
      //     </View>
      //   );
      case "email":
        return (
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={(value) =>
                setResponse((state) => ({
                  ...state,
                  [`${categoryId}-${item.id}`]: value,
                }))
              }
              value={response[`${categoryId}-${item.id}`]}
              style={styles.inputStyle}
              placeholder={item.hint}
              keyboardType="email-address"
            />
          </View>
        );
      case "boolean":
        return (
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text style={{ paddingHorizontal: 8, marginTop: 4 }}>NO</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                response[`${categoryId}-${item.id}`] ? "#f5dd4b" : "#f4f3f4"
              }
              value={response[`${categoryId}-${item.id}`]}
              onValueChange={() => {
                setResponse((state) => ({
                  ...state,
                  [`${categoryId}-${item.id}`]: !response[
                    `${categoryId}-${item.id}`
                  ],
                }));
                // if (response[`${categoryId}-${item.id}`] === null) {
                //   setResponse((state) => ({
                //     ...state,
                //     [`${categoryId}-${item.id}`]: true,
                //   }));
                // } else {
                //   setResponse((state) => ({
                //     ...state,
                //     [`${categoryId}-${item.id}`]: !response[
                //       `${categoryId}-${item.id}`
                //     ],
                //   }));
                // }
              }}
              ios_backgroundColor="#3e3e3e"
            />
            <Text style={{ paddingHorizontal: 8, marginTop: 4 }}>YES</Text>
          </View>
        );
      case "single-select":
        return (
          <View style={{ paddingVertical: 8, width: "100%" }}>
            <Picker
              mode="dropdown"
              selectedValue={response[`${categoryId}-${item.id}`]}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                setResponse((state) => ({
                  ...state,
                  [`${categoryId}-${item.id}`]: itemValue,
                }))
              }
              iosIcon={<Icon name="arrow-down" />}
            >
              <Picker.Item label={"Choose One"} value={""} />
              {item.options.map((value, i) => (
                <Picker.Item key={i} label={value} value={value} />
              ))}
            </Picker>
          </View>
        );
      case "number":
        return (
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={(value) =>
                setResponse((state) => ({
                  ...state,
                  [`${categoryId}-${item.id}`]: value,
                }))
              }
              value={response[`${categoryId}-${item.id}`]}
              style={styles.inputStyle}
              placeholder={item.hint}
              keyboardType="numeric"
            />
          </View>
        );
      case "coordinates":
        return (
          <View style={styles.coordinateContainer}>
            <TextInput
              onChangeText={(value) =>
                setResponse((state) => ({
                  ...state,
                  [`${categoryId}-${item.id}`]: value,
                }))
              }
              value={response[`${categoryId}-${item.id}`]}
              style={[styles.inputStyle, styles.coordianteInput]}
            />
            <Button
              onPress={() => requestLocation(`${categoryId}-${item.id}`)}
              iconLeft
            >
              <Icon name="map" />
              <NText>Capture</NText>
            </Button>
          </View>
        );
      case "text":
        return (
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={(value) =>
                setResponse((state) => ({
                  ...state,
                  [`${categoryId}-${item.id}`]: value,
                }))
              }
              value={response[`${categoryId}-${item.id}`]}
              style={styles.inputStyle}
              placeholder={item.hint}
              keyboardType="default"
              autoCapitalize={"none"}
              autoCorrect={false}
            />
          </View>
        );
      default:
        return (
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={(value) =>
                setResponse((state) => ({
                  ...state,
                  [`${categoryId}-${item.id}`]: value,
                }))
              }
              value={response[`${categoryId}-${item.id}`]}
              style={styles.inputStyle}
              placeholder={item.hint}
              keyboardType="default"
              autoCapitalize={"none"}
              autoCorrect={false}
            />
          </View>
        );
    }
  };
  const renderItem = (categoryId, { item }) => {
    return (
      <View>
        <Card>
          <CardItem>
            <Body>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.question}>{item.question}</Text>
                {item.required ? (
                  <Text style={{ color: "red", fontSize: 18, marginLeft: 2 }}>
                    *
                  </Text>
                ) : null}
              </View>
              {renderInput(categoryId, item)}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  };
  const renderSection = ({ item }) => {
    return (
      <View>
        <ListItem itemDivider>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>{item.name}</Text>
        </ListItem>
        {item.data &&
          item.data.map((ele) => (
            <View key={ele.id}>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>{ele.question}</Text>
                      {ele.required ? (
                        <Text
                          style={{ color: "red", fontSize: 18, marginLeft: 2 }}
                        >
                          *
                        </Text>
                      ) : null}
                    </View>
                    {renderInput(item.id, ele)}
                  </Body>
                </CardItem>
              </Card>
            </View>
          ))}
        {/* <FlatList
          data={item.data}
          renderItem={(data) => renderItem(item.id, data)}
          keyExtractor={(item) => `${item.id}`}
        /> */}
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={data.survey}
            renderItem={renderSection}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
        <Button block onPress={submitRecord}>
          <NText>Submit</NText>
        </Button>
      </SafeAreaView>
    </KeyboardAvoidingView>
    // </SafeAreaView>
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

export default Question;
