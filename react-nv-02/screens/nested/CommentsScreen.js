import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    console.log("createCommet...");
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .add({ comment, login });
    setComment([]);
  };

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .onSnapshot((data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text>{item.login}</Text>
                <Text>{item.comment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...StyleSheet.form,
              marginBottom: isShowKeyboard ? 20 : 150,
            }}
          >
            <TextInput
              value={comment}
              placeholder="Add comment..."
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={createComment}>
              <Text style={styles.sendLabel}>Create comment</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  sendLabel: { color: "#20b2aa", fontSize: 20 },

  commentsContainer: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#212121",
    marginBottom: 10,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#212121",
  },

  form: { marginHorizontal: 16 },

  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 10,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#212121",
  },
});

export default CommentsScreen;
