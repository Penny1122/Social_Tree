import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthStatusContextProvider } from "./context/AuthStatusContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthStatusContextProvider>
      <App />
    </AuthStatusContextProvider>
  </React.StrictMode>
);
