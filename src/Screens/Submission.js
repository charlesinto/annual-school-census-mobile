import React, { useEffect, useState } from "react";
import {
  View,
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  Alert,
} from "react-native";
import { Card, CardItem, Body } from "native-base";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";
import { firebase } from "../firebase/config";

const Submissions = ({ route }) => {
  const id = route.params.id;
  const db = firebase.firestore();
  const [survey, setSurvey] = useState([]);
  useEffect(() => {
    const getSurvey = async () => {
      try {
        const surveysJSON = await AsyncStorage.getItem("offline-survey");
        if (surveysJSON === null) return;
        const survey = JSON.parse(surveysJSON);
        const responses = [];
        survey.forEach((ele) => {
          if (ele.id === id) {
            responses.push(ele);
          }
        });
        setSurvey(responses);
      } catch (error) {
        console.log(error);
      }
    };
    getSurvey();
  }, []);
  const deleteRecord = async (responseId) => {
    try {
      Alert.alert(
        "Delete Record",
        "Are you sure you want to delete this survey",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Yes",
            onPress: async () => deleteItem(responseId),
          },
        ]
      );
    } catch (eror) {
      console.log(eror);
    }
  };
  const deleteItem = async (responseId) => {
    try {
      const findIndex = survey.findIndex(
        (ele) => ele.responseId === responseId
      );
      if (findIndex !== -1) {
        const newSurvey = [...survey];
        newSurvey.splice(findIndex, 1);
        // remove from local storaye

        const surveysJSON = await AsyncStorage.getItem("offline-survey");
        if (surveysJSON === null) return;
        const savedSurvey = JSON.parse(surveysJSON);
        const localIndex = savedSurvey.findIndex(
          (ele) => ele.responseId === responseId
        );
        savedSurvey.splice(localIndex, 1);
        AsyncStorage.setItem("offline-survey", JSON.stringify(savedSurvey));

        setSurvey(newSurvey);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadRecord = async (item) => {
    try {
      Alert.alert("Upload Survey", "Upload survey to online database", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "OK",
          onPress: async () => {
            await db.collection("responses").add({ ...item });
            await deleteItem(item.responseId);
            Alert.alert("Operation Successful", "Record uploaded successful", [
              {
                text: "OK",
                onPress: () => {},
              },
            ]);
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <Card>
        <CardItem>
          <Body>
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  paddingVertical: 8,
                }}
              >
                <Text>Response ID: </Text>
                <Text>{item.responseId}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-end",
                paddingTop: 8,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => deleteRecord(item.responseId)}
                style={{ paddingRight: 8 }}
              >
                <Feather name="trash" size={28} color="red" />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => uploadRecord(item)}>
                <AntDesign name="sync" size={28} color="green" />
              </TouchableWithoutFeedback>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <FlatList
          renderItem={renderItem}
          keyExtractor={(item) => item.responseId}
          data={survey}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Submissions;
