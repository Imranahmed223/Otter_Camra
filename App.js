import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Home } from "./src/Screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShootConfirmation } from "./src/Screens/ShootConfirmation/ShootConfirmation";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { ShootCamera } from "./src/Screens/ShootCamera/ShootCamera";

// Custom fonts declaration
let customFonts = {
  "Montserrat-Semi-Bold": require("./assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
};
// For creating screens stack
const Stack = createNativeStackNavigator();

export default function App() {
  //This state keeps track if the app has rendered
  const [ready, setReady] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const readyApp = async () => {
    try {
      // Keep the splash screen visible while we fetch resources
      console.log(
        "Trigger the Splash Screen visible till this try block resolves the promise"
      );
      await SplashScreen.preventAutoHideAsync();

      //Explicit delay to mock some loading time
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      console.log("Render the application screen");
      //Set ready to true to render the application
      setReady(true);
    }
  };

  // loading fonts when App.js renders
  const _loadFontsAsync = async () => {
    try {
    await Font.loadAsync(customFonts);
    } catch (e) {
      console.warn(e);
    } finally {
      // fonts loaded successfully 
      setFontsLoaded(true);
    }
  };

  // Function called to hide the splash screen if ready is true
  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      console.log("Hide the splash screen immediately");
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  // this hook renders firstly when App.js loaded
  useEffect(() => {
    readyApp();
    _loadFontsAsync();
  }, []);

  if (!ready) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShootPage"
            component={ShootConfirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShootCamera"
            component={ShootCamera}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: "bold",
    fontSize: 18,
  },
});
