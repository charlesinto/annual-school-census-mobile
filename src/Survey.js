import React from "react";
import { View, StyleSheet, Button as MButton } from "react-native";
import { Card, CardItem, Body, Text, Button } from "native-base";

const Survey = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card>
        <CardItem>
          <Body>
            <View>
              <Text>2016/2017 Junior Secondary Education School Census</Text>
            </View>
            <View style={styles.actionContainer}>
              <MButton
                title="View Submission"
                color="red"
                onPress={() => {
                  navigation.navigate("Submission", { id: 11 });
                }}
              />
              <MButton
                title="Take Survey"
                onPress={() =>
                  navigation.navigate("Question", {
                    name: "2016/2017 Junior Secondary Education School Census",
                  })
                }
              />
            </View>
          </Body>
        </CardItem>
      </Card>
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
