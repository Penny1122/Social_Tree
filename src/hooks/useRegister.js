import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (email, password, userName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response.user);
      if (!response) {
        throw new Error("Could not complete register");
      }
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, register };
};
