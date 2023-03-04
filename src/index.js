import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthStatusContextProvider } from "./context/AuthStatusContext";
import { ChatContextProvider } from "./context/ChatContext";
import { PostContextProvider } from "./context/PostContext";
import { ShowAddPostContextProvider } from "./context/ShowAddPostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthStatusContextProvider>
      <ShowAddPostContextProvider>
        <PostContextProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
        </PostContextProvider>
      </ShowAddPostContextProvider>
    </AuthStatusContextProvider>
  </React.StrictMode>
);
