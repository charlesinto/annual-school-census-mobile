import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button as MButton, ScrollView } from "react-native";
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
      <ScrollView>
        <Card>
          <CardItem>
            <Body>
              <View>
                <Text>School Registration</Text>
              </View>
              <View style={styles.actionContainer}>
                <MButton
                  title="View Submission"
                  color="red"
                  onPress={() => {}}
                />
                <MButton
                  title="Take Survey"
                  onPress={() => {
                    navigation.navigate("School Registration");
                  }}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <View>
                <Text>Teacher Registration</Text>
              </View>
              <View style={styles.actionContainer}>
                <MButton
                  title="View Submission"
                  color="red"
                  onPress={() => {}}
                />
                <MButton
                  title="Take Survey"
                  onPress={() => navigation.navigate("Teacher Registration")}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <View>
                <Text>Student Registration</Text>
              </View>
              <View style={styles.actionContainer}>
                <MButton
                  title="View Submission"
                  color="red"
                  onPress={() => {}}
                />
                <MButton
                  title="Take Survey"
                  onPress={() => navigation.navigate("Student Registration")}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <View>
                <Text>Class Attendance</Text>
              </View>
              <View style={styles.actionContainer}>
                <MButton
                  title="View Submission"
                  color="red"
                  onPress={() => {}}
                />
                <MButton
                  title="Take Survey"
                  onPress={() => navigation.navigate("Class Registration")}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
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
    paddingVertical: 10,
    justifyContent: "space-between",
  },
});

export default Survey;
