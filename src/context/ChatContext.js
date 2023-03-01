import { createContext, useReducer } from "react";
import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = useAuthStatus();
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "Change_user":
        return {
          userData: action.payload,
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, {
    userData: {},
    chatId: null,
  });
  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
