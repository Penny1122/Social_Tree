import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthStatus();
  const navigate = useNavigate();

  const register = async (email, password, userName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response) {
        throw new Error("Register Unsuccess");
      }
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      //dispatch login action
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
  return { isLoading, error, register };
};
