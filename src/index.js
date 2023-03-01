import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthStatusContextProvider } from "./context/AuthStatusContext";
import { ChatContextProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthStatusContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthStatusContextProvider>
  </React.StrictMode>
);
