import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { UpperCard } from "../../Components/UpperCard";
import { Button } from "../../Components/Button";
import * as ScreenOrientation from "expo-screen-orientation";

export const ShootConfirmation = ({ navigation }) => {
  const flip = false;
  if (flip == false) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <UpperCard
          backgroundImg={require("../../../assets/images/background_tablet.png")}
          type="shoot"
          title={"Would you like to join this shoot?"}
        />

        <View style={styles.subContainer}>
          <Text style={styles.subtitle}>Nadav Givoni</Text>
          <Text style={styles.inputFieldTitle}>Test090078601</Text>
          <View>
            <Button
              backgroundColor="orange"
              color="black"
              btnText="JOIN THE SHOOT"
              onPress={() => navigation.navigate("ShootCamera")}
            />
            <Button
              backgroundColor="lightgray"
              color="black"
              btnText="DECLINE"
              onPress={() => Alert.alert("Declined")}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: { padding: 20 },
  inputFieldTitle: {
    color: "black",
    fontSize: 26,
    fontWeight: "600",
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
  },
});
