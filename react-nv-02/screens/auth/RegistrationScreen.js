import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={styles.input}
                placeholder="Логін"
                value={state.name}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, name: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                value={state.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={state.password}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
              ></TouchableOpacity>
              <Text style={styles.text}>Вже маєте акаунт? Увійти</Text>
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
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-between",
  },
  title: {
    marginTop: 92,
    marginBottom: 33,
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Bold",
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
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#212121",
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
    fontFamily: "Roboto-Bold",
    color: "#FFFFFF",
    fontSize: 16,
  },

  text: {
    marginTop: 16,
    fontStyle: "normal",
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
});
