import { useState } from "react";
import { db } from "../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuthStatus } from "./useAuthStatus";

export const useLikePost = () => {
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthStatus();

  const likePost = async ({ id, isLiked, author }) => {
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

      const ref = doc(db, "users", author.uid);
      const noticeRef = doc(collection(ref, "notice"));
      await setDoc(noticeRef, {
        postId: id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        notice: "對您的貼文按讚。",
        noticedAt: Timestamp.now(),
        read: false,
      });
    }
    setIsLoadingLike(false);
  };
  return { isLoadingLike, error, likePost };
};
