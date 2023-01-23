import { useState } from "react";
import { auth } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthStatus();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await auth.signOut();
      dispatch({ type: "Logout" });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, logout };
};
