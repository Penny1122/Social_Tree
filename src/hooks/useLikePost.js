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
  getDocs,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuthStatus } from "./useAuthStatus";
import { usePostContext } from "./useGetPost";

export const useLikePost = () => {
  const { posts, setPosts } = usePostContext();
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
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      limit(posts.length)
    );
    const querySnapshot = await getDocs(q);
    setPosts([]);
    querySnapshot.forEach((doc) => {
      setPosts((prevContent) => {
        return [
          ...prevContent,
          {
            id: doc.id,
            ...doc.data(),
          },
        ];
      });
    });

    setIsLoadingLike(false);
  };

  const likeSinglePost = async ({ id, isLiked, author }) => {
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
  return { isLoadingLike, error, likePost, likeSinglePost };
};
