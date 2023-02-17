import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";
import { doc, setDoc, collection } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

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

      const defaultBackgroundImageRef = ref(
        storage,
        "defaultBackgroundImage.jpg"
      );
      const defaultBackgroundImageURL = await getDownloadURL(
        defaultBackgroundImageRef
      );

      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: defaultPhotoURL,
      });
      //dispatch login action
      dispatch({ type: "Login", status: response.user });

      const newUserRef = doc(db, "users", response.user.uid);
      await setDoc(newUserRef, {
        uid: response.user.uid,
        displayName: response.user.displayName,
        photoURL: response.user.photoURL,
        backgroundURL: defaultBackgroundImageURL,
      });

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
