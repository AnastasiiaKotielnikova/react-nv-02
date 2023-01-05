import React from "react";

import { View, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";
import PostsScreen from "./screens/main/PostsScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <View style={styles.container}>
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        </AuthStack.Navigator>
      </View>
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainStack.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="grid-outline" size={size} color="#212121" />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-add-circle" size={36} color="#212121" />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="person-outline" size={size} color="#212121" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      ></MainStack.Screen>
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
