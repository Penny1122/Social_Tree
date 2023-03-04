import { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  doc,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { useContext } from "react";

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw Error("useAuthStatus must be inside an AuthStatusContextProvider");
  }

  return context;
};

export const useGetPost = () => {
  const { setPosts } = usePostContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const querySnapshotRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    setPosts([]);
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"), limit(2));
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
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
        querySnapshotRef.current =
          querySnapshot.docs[querySnapshot.docs.length - 1];
      },
      (error) => {
        console.log(error);
        setError("failed to fetch data");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, []);

  const scrollGetData = async () => {
    if (querySnapshotRef.current) {
      const postsRef = collection(db, "posts");
      const q = query(
        postsRef,
        orderBy("createdAt", "desc"),
        startAfter(querySnapshotRef.current),
        limit(2)
      );
      const querySnapshot = await getDocs(q);
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
      querySnapshotRef.current =
        querySnapshot.docs[querySnapshot.docs.length - 1];
    }
  };
  return { isLoading, error, scrollGetData };
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
  useEffect(() => {
    setIsLoading(true);
    const postRef = doc(db, "posts", postId);
    const unSub = onSnapshot(postRef, (doc) => {
      setPost({ id: doc.id, ...doc.data() });
    });
    setIsLoading(false);
    return () => unSub;
  }, [postId]);
  return { isLoading, post };
};
