import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuthStatus();
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await auth.signOut();
      const res2 = await getDoc(doc(db, "users", user.uid));
      if (res2.exists()) {
        //create a chat in chats collection
        await updateDoc(doc(db, "users", user.uid), {
          login: false,
        });
      }
      dispatch({ type: "Logout" });
      setIsLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, logout };
};
