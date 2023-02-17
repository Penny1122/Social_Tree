import { useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  Timestamp,
  doc,
  writeBatch,
  increment,
  setDoc,
} from "firebase/firestore";
import { useAuthStatus } from "./useAuthStatus";

export const useAddComment = () => {
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);
  const { user } = useAuthStatus();

  const addComment = async ({ id, commentContent, author }) => {
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
    const ref = doc(db, "users", author.uid);
    const noticeRef = doc(collection(ref, "notice"));
    await setDoc(noticeRef, {
      postId: id,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      notice: "對您的貼文發表留言。",
      noticedAt: Timestamp.now(),
    });

    setIsLoadingAddComment(false);
  };

  return { isLoadingAddComment, addComment };
};
