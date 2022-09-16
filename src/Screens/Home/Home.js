import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import logo from "../../../assets/icons/logo.png";
import { UpperCard } from "../../Components/UpperCard";
import { Button } from "../../Components/Button";
import * as ScreenOrientation from "expo-screen-orientation";

export const Home = ({ navigation, route }) => {
  const [text, setText] = useState();
  const flip = false;
  if (flip == false) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.container}>
          <UpperCard
            backgroundImg={require("../../../assets/images/background_tablet.png")}
            type="home"
            logo={logo}
            subtitle={"My Phone"}
            title={"Join a shoot via shoot link or notification"}
          />
          <View style={styles.subContainer}>
            <Text style={styles.inputFieldTitle}>Add your shoot link</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setText(e);
              }}
              value={text}
              placeholder="Add link here"
            />
            <Button
              backgroundColor="green"
              color="white"
              btnText="JOIN SHOOT"
              onPress={() => navigation.navigate("ShootPage")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: { marginTop: 10, padding: 20 },
  inputFieldTitle: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Montserrat-Semi-Bold",
  },
  input: {
    height: 50,
    marginTop: 20,
    borderWidth: "none",
    borderRadius: 10,
    backgroundColor: "lightgrey",
    color: "black",
    padding: 10,
    fontFamily: "Roboto-Regular",
  },
});
