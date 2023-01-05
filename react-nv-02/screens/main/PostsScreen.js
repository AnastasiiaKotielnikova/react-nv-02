import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostScreen from "../nested/DefaultPostScreen";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import { MaterialIcons } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPostScreen"
        options={{
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={26}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
            />
          ),
          headerShown: true,
        }}
        component={DefaultPostScreen}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
