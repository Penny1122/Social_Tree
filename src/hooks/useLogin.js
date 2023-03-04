import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";
import { doc, setDoc, getDoc, updateDoc, getDocs } from "firebase/firestore";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthStatus();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "Login", status: response.user });

      const res = await getDoc(doc(db, "userChats", response.user.uid));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "userChats", response.user.uid), {});
      }
      const res2 = await getDoc(doc(db, "users", response.user.uid));
      if (res2.exists()) {
        await updateDoc(doc(db, "users", response.user.uid), {
          login: true,
        });
      }

      setIsLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("信箱格式不正確");
          break;
        case "auth/internal-error":
          setError("密碼不可為空白");
          break;
        case "auth/user-not-found":
          setError("此信箱不存在");
          break;
        case "auth/wrong-password":
          setError("密碼錯誤");
          break;
        default:
      }
      console.log(error.code);
      setIsLoading(false);
    }
  };
  return { isLoading, error, login };
};
