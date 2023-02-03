import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const useGetComment = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const postRef = doc(db, "posts", id);
    const commentRef = collection(postRef, "comments");
    const q = query(commentRef, orderBy("createdAt", "desc"));
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        setComments([]);

        querySnapshot.forEach((doc) => {
          // results.push({ id: doc.id, ...doc.data() });
          setComments((prevContent) => {
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
        setError("failed to fetch comments");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, []);
  return { comments, isLoading };
};
