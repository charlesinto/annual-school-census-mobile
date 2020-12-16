import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Button as MButton,
  ScrollView,
  BackHandler,
} from "react-native";
import { Card, CardItem, Body, Text } from "native-base";

import { useFocusEffect } from "@react-navigation/native";
const Survey = ({ navigation }) => {
  navigation.setOptions({
    headerLeft: null,
  });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

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
                {/* <MButton
                  title="View Submission"
                  color="red"
                  onPress={() => {}}
                /> */}
                <MButton
                  title="Proceed"
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
                {/* <MButton
                  title="View Submission"
                  color="red"
                  onPress={() => {}}
                /> */}
                <MButton
                  title="Proceed"
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
                {/* <MButton
                  title="View Submission"
                  color="red"
                  onPress={() => {}}
                /> */}
                <MButton
                  title="Proceed"
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
                  title="Proceed"
                  onPress={() => navigation.navigate("Class Attendance")}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <View>
                <Text>Facility Report</Text>
              </View>
              <View style={styles.actionContainer}>
                <MButton
                  title="Proceed"
                  onPress={() => navigation.navigate("Facility Report")}
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
