import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthStatusContextProvider } from "./context/AuthStatusContext";
import { ChatContextProvider } from "./context/ChatContext";
import { PostContextProvider } from "./context/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthStatusContextProvider>
      <PostContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </PostContextProvider>
    </AuthStatusContextProvider>
  </React.StrictMode>
);
