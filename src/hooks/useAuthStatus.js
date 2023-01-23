import { AuthStatusContext } from "../context/AuthStatusContext";
import { useContext } from "react";

export const useAuthStatus = () => {
  const context = useContext(AuthStatusContext);

  if (!context) {
    throw Error("useAuthStatus must be inside an AuthStatusContextProvider");
  }

  return context;
};
