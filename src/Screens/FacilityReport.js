import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  Keyboard,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Button,
  Text as NText,
  Header,
  Left,
  Right,
  Title,
  Body,
  Picker,
  Card,
  CardItem,
  Content,
  CheckBox,
  ListItem,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import App from "../services";

function FacilityReport() {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState("");
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
  }, []);
  const submitRecord = () => {};
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
                      <Text style={styles.question}>School</Text>
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
                        selectedValue={schoolId}
                        onValueChange={(value) => setSchoolId(value)}
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                      >
                        <Picker.Item label={"Select School"} value={""} />
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
              <Header style={styles.header}>
                <Left />
                <Body>
                  <Title>Data Input</Title>
                </Body>
                <Right />
              </Header>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>Shared Facility?</Text>
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
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={() => {}}
                      >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
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
                        School development plan
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
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={() => {}}
                      >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>Fenced Wall</Text>
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
                        style={{ width: "100%" }}
                        placeholder="Select"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={() => {}}
                      >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
                      </Picker>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Header style={styles.header}>
                <View style={{ width: "100%" }}>
                  <Title>Source of Drinking Water & Toilet</Title>
                </View>
              </Header>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>
                        Source of Drinking Water
                      </Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <Content>
                        <ListItem>
                          <CheckBox checked={true} />
                          <Body style={styles.checkboxBody}>
                            <Text>Pipe borne water</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <CheckBox checked={false} />
                          <Body style={styles.checkboxBody}>
                            <Text>Borehole</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <CheckBox checked={false} color="green" />
                          <Body style={styles.checkboxBody}>
                            <Text>No Water</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <Text>Others</Text>
                          <Body style={styles.checkboxBody}>
                            <View
                              style={{
                                width: "100%",
                                backgroundColor: "#f3f3f3",
                                paddingVertical: 4,
                                paddingLeft: 8,
                              }}
                            >
                              <TextInput />
                            </View>
                          </Body>
                        </ListItem>
                      </Content>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}>
                        Number of usable toilet
                      </Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <Content>
                        <ListItem>
                          <Text>Pit</Text>
                          <Body style={styles.checkboxBody}>
                            <View
                              style={{
                                width: "100%",
                                backgroundColor: "#f3f3f3",
                                paddingVertical: 4,
                                paddingLeft: 8,
                              }}
                            >
                              <TextInput keyboardType="number-pad" />
                            </View>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <Text>Bucket</Text>
                          <Body style={styles.checkboxBody}>
                            <View
                              style={{
                                width: "100%",
                                backgroundColor: "#f3f3f3",
                                paddingVertical: 4,
                                paddingLeft: 8,
                              }}
                            >
                              <TextInput keyboardType="number-pad" />
                            </View>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <Text>Water Flush</Text>
                          <Body style={styles.checkboxBody}>
                            <View
                              style={{
                                width: "100%",
                                backgroundColor: "#f3f3f3",
                                paddingVertical: 4,
                                paddingLeft: 8,
                              }}
                            >
                              <TextInput keyboardType="number-pad" />
                            </View>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <Text>Others</Text>
                          <Body style={styles.checkboxBody}>
                            <View
                              style={{
                                width: "100%",
                                backgroundColor: "#f3f3f3",
                                paddingVertical: 4,
                                paddingLeft: 8,
                              }}
                            >
                              <TextInput keyboardType="number-pad" />
                            </View>
                          </Body>
                        </ListItem>
                      </Content>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Header style={styles.header}>
                <View style={{ width: "100%" }}>
                  <Title>Education Facilities</Title>
                </View>
              </Header>
              <Card>
                <CardItem>
                  <Body>
                    <View>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Classroom</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Laboratory</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Library</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Playground</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Computer Laboratory</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Staff office</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Security Post</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Kitchen</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      <View style={{ marginRight: 18 }}>
                        <Text style={styles.question}>Store</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          marginVertical: 4,
                        }}
                      >
                        <Text>Not Usable</Text>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#f3f3f3",
                            paddingVertical: 4,
                            paddingLeft: 8,
                            marginLeft: 8,
                          }}
                        >
                          <TextInput />
                        </View>
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Header style={styles.header}>
                <View style={{ width: "100%" }}>
                  <Title>Health Facilities</Title>
                </View>
              </Header>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}></Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <Content>
                        <ListItem>
                          <CheckBox checked={true} />
                          <Body style={styles.checkboxBody}>
                            <Text>Health Clinic</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <CheckBox checked={false} />
                          <Body style={styles.checkboxBody}>
                            <Text>First Aid Kit</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <CheckBox checked={false} color="green" />
                          <Body style={styles.checkboxBody}>
                            <Text>No health facility</Text>
                          </Body>
                        </ListItem>
                      </Content>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Header style={styles.header}>
                <View style={{ width: "100%" }}>
                  <Title>Source of Power</Title>
                </View>
              </Header>
              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.question}></Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      <Content>
                        <ListItem>
                          <CheckBox checked={true} />
                          <Body style={styles.checkboxBody}>
                            <Text>PHCN</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <CheckBox checked={false} />
                          <Body style={styles.checkboxBody}>
                            <Text>Generator</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <CheckBox checked={false} color="green" />
                          <Body style={styles.checkboxBody}>
                            <Text>Solar</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <CheckBox checked={false} color="green" />
                          <Body style={styles.checkboxBody}>
                            <Text>No Source</Text>
                          </Body>
                        </ListItem>
                      </Content>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Header style={styles.header}>
                <View style={{ width: "100%" }}>
                  <Title>More Info</Title>
                </View>
              </Header>
              <Card>
                <CardItem>
                  <Body>
                    <View>
                      <Button color="primary">
                        <Text>Add</Text>
                      </Button>
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
  header: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  checkboxBody: {
    marginLeft: 8,
  },
});

export default FacilityReport;
