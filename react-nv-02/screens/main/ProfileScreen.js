import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })));
      });
  };

  const signOut = () => {
    dispatch(authSignOutUser);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Text>Here must be your photos</Text>
            <Image source={{ uri: item.photo }} style={styles.image} />
          </View>
        )}
      />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 350, height: 200 },
});

export default ProfileScreen;
