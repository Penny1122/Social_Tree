import { useState } from "react";
import { useAuthStatus } from "./useAuthStatus";
import {
  setDoc,
  collection,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../utils/firebase";

export const usePost = () => {
  const { user } = useAuthStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPost = async ({ note, file, metaData }) => {
    setIsLoading(true);
    try {
      const docRef = doc(collection(db, "posts"));
      const imageRef = ref(storage, "post-images/" + docRef.id);
      const uploadTask = await uploadBytesResumable(imageRef, file, metaData);
      const imageURL = await getDownloadURL(imageRef);
      await setDoc(docRef, {
        note: note,
        createdAt: Timestamp.now(),
        imageURL: imageURL,
        author: {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photo: user.photoURL || "",
        },
      });
      setIsLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deletePost = async ({ postId }) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  return { isLoading, error, addPost, deletePost };
};