import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

export const useGetPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPosts([]);
    let results = [];
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
        // setPosts((prevContent) => {
        //   return [
        //     {
        //       id: doc.id,
        //       ...doc.data(),
        //     },
        //     ...prevContent,
        //   ];
        // });
      });
      setPosts(results);
    });
    return () => unSub();
  }, []);
  return { isLoading, error, posts };
};
