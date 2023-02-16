import "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, login }) =>
  async () => {
    try {
      const auth = getAuth();

      const user = await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(auth.currentUser, {
        displayName: login,
      });

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: user.displayName,
          })
        );

        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    Alert.alert(error.message);
    console.log("error:", error);
    console.log("error.code:", error.code);
    console.log("error.message:", error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getSatte) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log("error:", error);
    console.log("error.code:", error.code);
    console.log("error.message:", error.message);
  }
};
