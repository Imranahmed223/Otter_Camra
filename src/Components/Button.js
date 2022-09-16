import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export const Button = (props) => {
  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: props.backgroundColor,
      }}
      onPress={props.onPress}
    >
      <Text style={{ ...styles.btnText, color: props.color }}>
        {props.btnText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    color: "white",
    marginTop: 20,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Montserrat-Semi-Bold",
  },
});
