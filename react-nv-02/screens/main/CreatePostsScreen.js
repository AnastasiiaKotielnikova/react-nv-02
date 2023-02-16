import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { EvilIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { uuidv4 } from "@firebase/util";
import { storage, db } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { Firestore } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);

    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreenPosts", { photo });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const photoId = uuidv4();
    console.log("photoId:", photoId);
    const storageRef = ref(storage, `postImage/${photoId}`);
    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(ref(storage, `postImage/${photoId}`));
    console.log("photoUrl:", photoUrl);
    return photoUrl;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    console.log(location);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId,
        login,
        location,
        photo,
        comment,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let locationRes = await Location.getCurrentPositionAsync();
      setLocation(locationRes);
    })();
  }, []);

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
              <TextInput style={styles.input} onChangeText={setComment} />
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
