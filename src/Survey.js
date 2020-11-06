import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button as MButton, FlatList } from "react-native";
import { Card, CardItem, Body, Text, Button } from "native-base";
import { firebase } from "../firebase/config";
const Survey = ({ navigation }) => {
  const [survey, setSurvey] = useState([]);

  const db = firebase.firestore();
  useEffect(() => {
    db.collection("projects").onSnapshot((doc) => {
      if (!doc.empty) {
        const data = [];
        doc.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setSurvey((state) => [...data]);
      }
    });
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Card>
        <CardItem>
          <Body>
            <View>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.actionContainer}>
              <MButton
                title="View Submission"
                color="red"
                onPress={() => {
                  navigation.navigate("Submission", {
                    id: item.id,
                    data: item,
                  });
                }}
              />
              <MButton
                title="Take Survey"
                onPress={() => {
                  console.log(item.survey);
                  if (item.survey) {
                    navigation.navigate("Question", {
                      name:
                        "2016/2017 Junior Secondary Education School Census",
                      data: item,
                    });
                  }
                }}
              />
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={survey}
        renderItem={renderItem}
        keyExtractor={(data) => data.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  actionContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default Survey;
