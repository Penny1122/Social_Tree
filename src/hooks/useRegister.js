import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";

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

      const defaultPhotoRef = ref(storage, "member.icon.png");
      const defaultPhotoURL = await getDownloadURL(defaultPhotoRef);

      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: defaultPhotoURL,
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
