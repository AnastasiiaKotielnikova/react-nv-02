import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { EvilIcons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);

    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultPostScreen", { photo });
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Camera style={styles.camera} ref={setCamera}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.img}
              onPress={takePhoto}
            >
              <Image source={require("../../images/camera.png")} />
            </TouchableOpacity>
          </Camera>
          <Text style={styles.text}>Завантажте фото</Text>
          <View
            style={{
              ...styles.form,
              marginTop: isShowKeyboard ? 0 : 20,
            }}
          >
            <View>
              <TextInput style={styles.input} />
            </View>
            <TextInput
              style={styles.input}
              placeholder={"Назва..."}
              onFocus={() => {
                setIsShowKeyboard(true);
                console.log(isShowKeyboard);
              }}
            />
            <EvilIcons
              name="location"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              onFocus={() => {
                setIsShowKeyboard(true);
                console.log(isShowKeyboard);
              }}
              style={styles.input}
              placeholder={"     Місцевість..."}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={sendPhoto}
          >
            <Text style={styles.btnTitle}>Опублікувати</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  img: {
    marginTop: 220,
  },
  text: {
    marginTop: 8,
    marginHorizontal: 16,
    color: "#BDBDBD",
    fontFamily: "Roboto-Bold",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 32,
    height: 50,
    fontFamily: "Roboto-Bold",
  },
  form: {
    marginHorizontal: 16,
  },
  icon: {
    position: "absolute",
    top: 178,
    left: -7,
    color: "#BDBDBD",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    height: 51,
    justifyContent: "center",
    borderRadius: 100,
    marginHorizontal: 16,
  },
});

export default CreatePostsScreen;
