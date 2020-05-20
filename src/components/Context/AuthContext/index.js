import React, { createContext, useState } from "react";

import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../../../utils/storageUtil";
import { isAuthenticated } from "../../../utils/authUtil";
import history from "../../../utils/history";
import configureStore from "../../../store/configureStore";

const store = configureStore({}, history);
const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
  dropDown: [],
  selectedBranch: undefined,
});

const AuthProvider = (props) => {
  const [user, setUser] = useState(getLocalStorage("user") || {});
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(
    isAuthenticated() || false
  );

  const [errorMessage, setErrorMessage] = useState(undefined);

  const state = {
    user,
    loading,
    setLoading,
    authenticated,
    errorMessage,
    setErrorMessage,
  };

  const login = (formData) => {
    if (formData.userId === "reiyaz" && formData.password === "Test@123") {
      setLoading(true);
      history.push("/dashboard");
      setLocalStorage("user", formData.userId);
      setUser(formData.userId);
      setErrorMessage(null);
    } else {
      setLoading(true);
      setErrorMessage("Wrong cridentials, please try again");
    }
  };

  const logout = () => {
    store.dispatch({ type: "LOG_OUT_SUCCESS" });
    clearLocalStorage("user");
    setAuthenticated(false);
    setErrorMessage(null);
    history.push("/");
  };

  return (
    <AuthContext.Provider
      {...props}
      value={{
        ...state,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
