import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const ShootCamera = ({ navigation }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }, []);

  const changeScreenOrientation = () => {
    if (flipped) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  const toggleOrientation = () => {
    setFlipped(!flipped);
    changeScreenOrientation();
  };

  return (
    <SafeAreaView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/images/cameraclick.jpg")}
          imageStyle={{ opacity: 0.5 }}
          style={{ flex: 1, justifyContent: "space-between" }}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.box}>
              <Pressable
                onPress={() => {
                  navigation.navigate("Home", { flip: false });
                }}
              >
                <Entypo name="cross" size={26} color="gray" />
              </Pressable>
              <MaterialCommunityIcons
                name="record-circle-outline"
                size={24}
                color="red"
              />
              <Text style={styles.text}>Live</Text>
            </View>

            <View
              style={{ ...styles.box, backgroundColor: "red", width: "15%" }}
            >
              <Text style={styles.text}>ON AIR</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.roundBox}>
                <Text style={styles.text}>1X</Text>
              </View>

              <Pressable onPress={toggleOrientation}>
                <View style={{ ...styles.roundBox, marginLeft: 10 }}>
                  <MaterialIcons
                    name="flip-camera-android"
                    size={24}
                    color="gray"
                  />
                </View>
              </Pressable>
            </View>
          </View>

          <View style={{ padding: 20 }}>
            <View style={{ ...styles.roundBox }}>
              <Ionicons name="settings-sharp" size={26} color="green" />
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  box: {
    width: "20%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "black",
    opacity: 0.5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  roundBox: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "black",
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 5,
    fontSize: 16,
  },
});
