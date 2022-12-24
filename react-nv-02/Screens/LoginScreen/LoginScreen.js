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
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const onLogin = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 0 : 0,
              paddingBottom: isShowKeyboard ? 32 : 78,
            }}
          >
            <Text style={styles.title}>Увійти</Text>
            <TextInput
              value={state.email}
              placeholder="Адреса електронної пошти"
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
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
              title="Увійти"
              style={styles.button}
              onPress={onLogin}
            >
              <Text style={styles.btnTitle}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Немає акаунта? Зареєструватись</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    height: 50,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 43,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 12,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    color: "#ffffff",
  },

  btnTitle: {
    fontFamily: "Roboto-Bold",
    color: "#ffffff",
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
