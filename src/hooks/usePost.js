import { useState } from "react";
import { useAuthStatus } from "./useAuthStatus";
import {
  setDoc,
  collection,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
  limit,
  orderBy,
  getDocs,
  query,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import { usePostContext } from "./useGetPost";

export const usePost = () => {
  const { posts, setPosts } = usePostContext();
  const { user } = useAuthStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPost = async ({ note, file, metaData, selectedFriends }) => {
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
      selectedFriends.forEach(async (uid) => {
        const userRef = doc(db, "users", uid);
        const noticeRef = doc(collection(userRef, "notice"));
        await setDoc(noticeRef, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          notice: "標註在一則貼文中",
          noticedAt: Timestamp.now(),
          postId: docRef.id,
          read: false,
          tag: true,
        });
      });
      setIsLoading(false);
    } catch (e) {}
  };

  const editPost = async ({ newNote, newFile, postId, metaData }) => {
    if (newFile) {
      const imageRef = ref(storage, "post-images/" + postId);
      await uploadBytesResumable(imageRef, newFile, metaData);
      const imageURL = await getDownloadURL(imageRef);
      const userRef = doc(db, "posts", postId);
      await updateDoc(userRef, {
        note: newNote,
        imageURL: imageURL,
      });
    } else {
      const userRef = doc(db, "posts", postId);
      await updateDoc(userRef, {
        note: newNote,
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
  };

  const deletePost = async ({ postId }) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  return { isLoading, error, addPost, deletePost, editPost };
};
