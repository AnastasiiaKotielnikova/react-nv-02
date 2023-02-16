import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router.js";
import { authStateChangeUser } from "../redux/auth/authOperations.js";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
