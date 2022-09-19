import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Globals from "../Globals/Globals";

export const UpperCard = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: props.type == "home" ? "black" : "green",
      }}
    >
      <ImageBackground
        source={props.backgroundImg}
        imageStyle={{ opacity: 0.5 }}
        style={{ flex: 1 }}
      >
        {props.type == "home" ? (
          <View style={styles.logo}>
            <Image source={props.logo} style={{ width: 26, height: 26 }} />
            <Ionicons name="settings-sharp" size={26} color="green" />
          </View>
        ) : (
          <Pressable onPress={() => navigation.navigate("Home")}>
            <View style={styles.logo}>
              <Entypo name="cross" size={26} color="black" />
            </View>
          </Pressable>
        )}
        <Text style={styles.subtitle}>{props.subtitle}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    height: "66%",
  },
  logo: {
    marginTop: 40,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtitle: {
    marginTop: 50,
    color: "#ffff",
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Globals.fonts.MontserratSemiBold,
  },
  title: {
    color: "#ffff",
    padding: 20,
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: Globals.fonts.MontserratSemiBold,
  },
});
