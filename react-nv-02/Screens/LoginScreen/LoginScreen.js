import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";

export const LoginScreen = () => {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);
  return (
    <View>
      <Text>Увійти</Text>
      <TextInput
        placeholder="Адреса електронної пошти"
        value={value}
        onChangeText={inputHandler}
      />
      <TextInput
        placeholder="Пароль"
        value={value}
        onChangeText={inputHandler}
      />
      <Button title="Увійти" />
      <Text>Немає акаунта? Зареєструватись</Text>
    </View>
  );
};
