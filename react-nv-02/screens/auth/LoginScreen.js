import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  console.log("navigation", navigation);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const onLogin = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={onLogin}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./images/Photo_BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 0 : 0,
                paddingBottom: isShowKeyboard ? 32 : 78,
                width: dimensions,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                value={state.email}
                placeholder="Адреса електронної пошти"
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                onChange={(nativeEvent) => console.log(nativeEvent)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                value={state.password}
                placeholder="Пароль"
                secureTextEntry={true}
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onLogin}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              ></TouchableOpacity>
              <Text style={styles.text}>Немає акаунта? Зареєструватись</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: "66%",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    justifyContent: "space-between",
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#BDBDBD",
  },

  button: {
    backgroundColor: "#FF6C00",
    alignItems: "center",
    height: 51,
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
  },

  btnTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },

  text: {
    marginTop: 16,
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
});
