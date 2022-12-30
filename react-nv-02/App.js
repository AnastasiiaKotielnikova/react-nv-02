import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomNavigator } from "@react-navigation/bottom-tabs";

const fonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
};

const AuthStack = createStackNavigator();
const MainTab = createBottomNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <ImageBackground
    //     style={styles.image}
    //     source={require("./images/Photo_BG.jpg")}
    //   >
    //     <RegistrationScreen />
    //     {/* <LoginScreen /> */}
    //     <StatusBar style="auto" />
    //   </ImageBackground>
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
