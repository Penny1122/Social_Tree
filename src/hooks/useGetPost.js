import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useParams } from "react-router-dom";

export const useGetPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt"));
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        setPosts([]);

        querySnapshot.forEach((doc) => {
          // results.push({ id: doc.id, ...doc.data() });
          setPosts((prevContent) => {
            return [
              {
                id: doc.id,
                ...doc.data(),
              },
              ...prevContent,
            ];
          });
        });
      },
      (error) => {
        console.log(error);
        setError("failed to fetch data");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, []);

  return { isLoading, error, posts };
};
export const useGetMyPost = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("author.uid", "==", userId),
      orderBy("createdAt")
    );
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        setPosts([]);

        querySnapshot.forEach((doc) => {
          // results.push({ id: doc.id, ...doc.data() });
          setPosts((prevContent) => {
            return [
              {
                id: doc.id,
                ...doc.data(),
              },
              ...prevContent,
            ];
          });
        });
      },
      (error) => {
        console.log(error);
        setError("failed to fetch data");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, [userId]);

  return { isLoading, error, posts };
};

export const GetSinglePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(false);
  const { postId } = useParams();
  console.log(postId);
  useEffect(() => {
    setIsLoading(true);
    const postRef = doc(db, "posts", postId);
    const unSub = onSnapshot(postRef, (doc) => {
      setPost({ id: doc.id, ...doc.data() });
    });
    setIsLoading(false);
    return () => unSub;
  }, []);
  return { isLoading, post };
};
