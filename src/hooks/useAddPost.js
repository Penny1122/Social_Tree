import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { v4 } from "uuid";
import { setDoc, collection, Timestamp, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../utils/firebase";

export const useAddPost = () => {
  const { user } = useAuthStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPost = async ({ add, note, previewURL, file, metaData }) => {
    // const data = {
    //   id: v4(),
    //   note: note,
    //   image: previewURL,
    // };
    // add(function (prevContent) {
    //   return [
    //     {
    //       id: data.id,
    //       note: data.note,
    //       image: data.image,
    //     },
    //     ...prevContent,
    //   ];
    // });
    try {
      const docRef = doc(collection(db, "posts"));
      const imageRef = ref(storage, "post-images/" + docRef.id);
      // Upload file and metadata to the object 'images/mountains.jpg'
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
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // await setDoc(doc(db, "posts"), {
    //   note: note,
    //   createdAt: Timestamp.now(),
    //   author: {
    //     displayName: user.displayName,
    //     uid: user.uid,
    //     email: user.email,
    //     photo: user.photoURL || "",
    //   },
    // });
  };
  return { isLoading, error, addPost };
};
