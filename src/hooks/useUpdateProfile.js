import { useState, useEffect } from "react";
import { db, storage } from "../utils/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useAuthStatus } from "./useAuthStatus";
import BackgroundImage from "../images/defaultBackgroundImage.jpg";

export const useUpdateProfile = () => {
  const { user } = useAuthStatus();
  const [backgroundURL, setBackgroundURL] = useState("");
  const [isUpdatingBackgroundImage, setIsUpdatingBackgroundImage] =
    useState(false);
  const [isGettingBackgroundImage, setIsGettingBackgroundImage] =
    useState(true);
  const [updatedError, setUpdatedError] = useState(null);

  useEffect(() => {
    // setIsGettingBackgroundImage(true);
    const get = async () => {
      const backgroundImageRef = ref(
        storage,
        "user-backgroundImage/" + user.uid
      );
      const backgroundImageURL = await getDownloadURL(backgroundImageRef);

      if (!backgroundImageURL) {
        setBackgroundURL(BackgroundImage);
      } else {
        setBackgroundURL(backgroundImageURL);
      }

      //   setIsGettingBackgroundImage(false);
      console.log("OK");
    };
    get();
  }, []);

  const updateBackgroundImage = async ({ metaData, backgroundImage }) => {
    console.log(backgroundImage);
    setBackgroundURL("");
    // setIsUpdatingAndGettingBackgroundImage(true);
    setIsUpdatingBackgroundImage(true);
    const backgroundImageRef = ref(storage, "user-backgroundImage/" + user.uid);
    await uploadBytesResumable(backgroundImageRef, backgroundImage, metaData);
    const backgroundImageURL = await getDownloadURL(backgroundImageRef);
    setBackgroundURL(backgroundImageURL);
    setIsUpdatingBackgroundImage(false);
    // setIsUpdatingAndGettingBackgroundImage(false);
  };

  const updateDisplayName = async ({ userDisplayName }) => {
    await updateProfile(auth.currentUser, {
      displayName: userDisplayName,
    });
    location.reload();
  };

  const updatePhotoURL = async ({ previewUserPhoto, metaData }) => {
    const photoRef = ref(storage, "user-photo/" + user.uid);
    await uploadBytesResumable(photoRef, previewUserPhoto, metaData);
    const photoURL = await getDownloadURL(photoRef);
    console.log(photoURL);
    await updateProfile(auth.currentUser, {
      photoURL: photoURL,
    });
    location.reload();
  };

  return {
    updateBackgroundImage,
    updateDisplayName,
    updatePhotoURL,
    backgroundURL,
    isUpdatingBackgroundImage,
    isGettingBackgroundImage,
  };
};
