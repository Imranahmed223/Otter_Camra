import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import logo from "../../../assets/icons/logo.png";
import { UpperCard } from "../../Components/UpperCard";
import { Button } from "../../Components/Button";
import * as ScreenOrientation from "expo-screen-orientation";
import Globals from "../../Globals/Globals";
import * as Linking from 'expo-linking';
import { Entypo } from "@expo/vector-icons";

export const Home = ({ navigation, route }) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    // To get the initialURL  
    Linking.getInitialURL().then((url) => {
      setUrl(url);
    }) 

    const { hostname, path, queryParams } = Linking.parse(url);
    console.log("query", hostname, queryParams);
  }, []);

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
      <ScrollView>
        <View style={styles.container}>
          <UpperCard
            backgroundImg={Globals.images.upperCardBackImg}
            type="home"
            logo={logo}
            subtitle={"My Phone"}
            title={"Join a shoot via shoot link or notification"}
          />
          <View style={styles.subContainer}>
            <Text style={styles.inputFieldTitle}>Add your shoot link</Text>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setUrl(e);
              }}
              value={url}
              placeholder="Add link here"
            />
            <Pressable onPress={() => setUrl(null)}>
              <Entypo name="cross" size={24} color="black" style={styles.crossIcon} />
            </Pressable>
            </View>
            <Button
              backgroundColor="green"
              color="white"
              btnText="JOIN SHOOT"
              onPress={() => {
                if(!url) {
                  Alert.alert("Shoot URL not found!");
                } else {
                  navigation.navigate("ShootPage");
                }
              }}
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
    fontFamily: Globals.fonts.MontserratSemiBold,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: "none",
    borderRadius: 10,
    backgroundColor: "lightgrey",
    color: "black",
    padding: 10,
    fontFamily: Globals.fonts.RobotoRegular,
  },
  crossIcon: { position: 'absolute', right: 10, paddingTop: 10 },
  inputContainer: { flexDirection: 'row', marginTop: 20 }
});
