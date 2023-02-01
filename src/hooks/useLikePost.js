import { useState } from "react";
import { db } from "../utils/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuthStatus } from "./useAuthStatus";

export const useLikePost = () => {
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthStatus();

  const likePost = async (id, isLiked) => {
    if (isLiked) {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        likedBy: arrayRemove(user.uid),
      });
    } else {
      setIsLoadingLike(true);
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        likedBy: arrayUnion(user.uid),
      });
    }
    setIsLoadingLike(false);
  };
  return { isLoadingLike, error, likePost };
};
