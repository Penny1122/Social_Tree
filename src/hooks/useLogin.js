import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthStatus();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      console.log("login success");
      dispatch({ type: "Login", status: response.user });

      setIsLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };
  return { isLoading, error, login };
};
