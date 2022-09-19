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
import Globals from "../../Globals/Globals";

export const ShootConfirmation = ({ navigation }) => {
  // On this screen we don't need to see screen in landscape mood So we set it as default as Portrait
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
          backgroundImg={Globals.images.upperCardBackImg}
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
    fontFamily: Globals.fonts.MontserratSemiBold,
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
