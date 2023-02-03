import { createContext, useReducer, useEffect } from "react";
import React from "react";
import { auth } from "../utils/firebase";

export const AuthStatusContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "Login":
      return { ...state, user: action.status };
    case "Logout":
      return { ...state, user: null };
    case "Auth_Ready":
      return { ...state, authReady: true, user: action.status };

    default:
      return state;
  }
};

export const AuthStatusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authReady: false,
  });

  useEffect(() => {
    const authStatus = auth.onAuthStateChanged((user) => {
      dispatch({ type: "Auth_Ready", status: user });
      authStatus();
    });
  }, []);

  return (
    <AuthStatusContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthStatusContext.Provider>
  );
};
