import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const useGetNotice = () => {
  const { user } = useAuthStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const userRef = doc(db, "users", user.uid);
    const noticeRef = collection(userRef, "notice");
    const q = query(noticeRef, orderBy("noticedAt", "asc"));
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        setNotice([]);

        querySnapshot.forEach((doc) => {
          setNotice((prevContent) => {
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
        setError("failed to fetch notice");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, []);
  return { notice, isLoading };
};
export const useGetNoticeLength = () => {
  const { user } = useAuthStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const userRef = doc(db, "users", user.uid);
    const noticeRef = collection(userRef, "notice");
    const q = query(noticeRef, where("read", "==", false));
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        setNotice([]);

        querySnapshot.forEach((doc) => {
          setNotice((prevContent) => {
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
        setError("failed to fetch notice");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, []);
  return { notice, isLoading };
};

export const useUpdateNotice = () => {
  const { user } = useAuthStatus();
  const UpdateNotice = async ({ id }) => {
    const userRef = doc(db, "users", user.uid);
    const noticeRef = doc(userRef, "notice", id);
    await updateDoc(noticeRef, {
      read: true,
    });
  };
  return { UpdateNotice };
};
