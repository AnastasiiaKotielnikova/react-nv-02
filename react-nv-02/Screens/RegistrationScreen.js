import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";

export const RegistrationScreen = () => {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);
  return (
    <View>
      <Text>Реєстрація</Text>
      <TextInput
        placeholder="Логін"
        value={value}
        onChangeText={inputHandler}
      />
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
      <Button title="Зареєструватися" />
      <Text>Вже є акаунт? Увійти</Text>
    </View>
  );
};
