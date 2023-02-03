import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

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
