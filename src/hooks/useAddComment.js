import { useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  Timestamp,
  doc,
  writeBatch,
  increment,
} from "firebase/firestore";
import { useAuthStatus } from "./useAuthStatus";

export const useAddComment = () => {
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);
  const { user } = useAuthStatus();

  const addComment = (id, commentContent) => {
    setIsLoadingAddComment(true);
    const batch = writeBatch(db);

    const postRef = doc(db, "posts", id);
    batch.update(postRef, { commentCount: increment(1) });

    const commentRef = doc(collection(postRef, "comments"));
    batch.set(commentRef, {
      content: commentContent,
      createdAt: Timestamp.now(),
      author: {
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      },
    });
    batch.commit();
    setIsLoadingAddComment(false);
  };

  return { isLoadingAddComment, addComment };
};
