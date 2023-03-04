import { createContext, useState } from "react";
import React from "react";

export const ShowAddPost = createContext();

export const ShowAddPostContextProvider = ({ children }) => {
  const [showAddPost, setShowAddPost] = useState(false);
  return (
    <ShowAddPost.Provider value={{ showAddPost, setShowAddPost }}>
      {children}
    </ShowAddPost.Provider>
  );
};
