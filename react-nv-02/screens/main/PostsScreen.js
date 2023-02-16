import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nested/DefaultScreenPosts";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
    console.log("Sign out succesful");
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreenPosts"
        options={{
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={26}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
              onPress={signOut}
            />
          ),
          headerShown: true,
        }}
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
