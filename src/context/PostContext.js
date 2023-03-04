import { createContext, useReducer } from "react";
import React from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "Scroll":
        return {
          posts: action.payload,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, {
    posts: [],
  });
  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
