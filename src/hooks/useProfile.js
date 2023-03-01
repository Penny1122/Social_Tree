import { useState, useEffect } from "react";
import { db, storage } from "../utils/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useAuthStatus } from "./useAuthStatus";
import BackgroundImage from "../images/defaultBackgroundImage.jpg";

export const useProfile = () => {
  const { userId } = useParams();
  const { user, dispatch } = useAuthStatus();
  const [profile, setProfile] = useState("");
  const [backgroundURL, setBackgroundURL] = useState("");
  const [isUpdatingBackgroundImage, setIsUpdatingBackgroundImage] =
    useState(false);
  const [isGettingBackgroundImage, setIsGettingBackgroundImage] =
    useState(true);

  useEffect(() => {
    console.log(userId);
    const ref = doc(db, "users", userId || user.uid);
    const unSub = onSnapshot(ref, (doc) => {
      setProfile({ id: doc.id, ...doc.data() });
      // console.log(doc.data());
    });
    return () => unSub;
  }, [userId]);

  // 更新背景圖片
  const updateBackgroundImage = async ({ metaData, backgroundImage }) => {
    setBackgroundURL("");
    setIsUpdatingBackgroundImage(true);
    const backgroundImageRef = ref(storage, "user-backgroundImage/" + user.uid);
    await uploadBytesResumable(backgroundImageRef, backgroundImage, metaData);
    const backgroundImageURL = await getDownloadURL(backgroundImageRef);
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      backgroundURL: backgroundImageURL,
    });
    setIsUpdatingBackgroundImage(false);
  };

  //  更新名稱
  const updateDisplayName = async ({ userDisplayName }) => {
    await updateProfile(auth.currentUser, {
      displayName: userDisplayName,
    });
    await dispatch({ type: "Login", status: user });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      displayName: userDisplayName,
    });

    const usersRef = collection(db, "users");
    const users = await getDocs(usersRef);
    users.forEach(async (document) => {
      const userRef = doc(db, "users", document.id);
      const friendRef = collection(userRef, "friends");
      const inviteRef = collection(userRef, "invite");
      const noticeRef = collection(userRef, "notice");
      const q = query(friendRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (friend) => {
        const ref = doc(userRef, "friends", friend.id);
        await updateDoc(ref, {
          displayName: userDisplayName,
        });
      });
      const r = query(inviteRef, where("uid", "==", user.uid));
      const querySnapshotR = await getDocs(r);
      querySnapshotR.forEach(async (invite) => {
        const ref = doc(userRef, "invite", invite.id);
        await updateDoc(ref, {
          displayName: userDisplayName,
        });
      });
      const s = query(noticeRef, where("uid", "==", user.uid));
      const querySnapshotS = await getDocs(s);
      querySnapshotS.forEach(async (notice) => {
        const ref = doc(userRef, "notice", notice.id);
        await updateDoc(ref, {
          displayName: userDisplayName,
        });
      });
    });

    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("author.uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const ref = doc(db, "posts", document.id);
      await updateDoc(ref, {
        "author.displayName": userDisplayName,
      });
    });

    const ref = collection(db, "posts");
    const posts = await getDocs(ref);
    posts.forEach(async (document) => {
      const postsRef = doc(db, "posts", document.id);
      const commentRef = collection(postsRef, "comments");
      const q = query(commentRef, where("author.uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (comment) => {
        const ref = doc(postsRef, "comments", comment.id);
        await updateDoc(ref, {
          "author.displayName": userDisplayName,
        });
      });
    });
  };

  // 更新大頭貼
  const updatePhotoURL = async ({ previewUserPhoto, metaData }) => {
    const photoRef = ref(storage, "user-photo/" + user.uid);
    await uploadBytesResumable(photoRef, previewUserPhoto, metaData);
    const photoURL = await getDownloadURL(photoRef);
    await updateProfile(auth.currentUser, {
      photoURL: photoURL,
    });

    await dispatch({ type: "Login", status: user });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      photoURL: photoURL,
    });

    const usersRef = collection(db, "users");
    const users = await getDocs(usersRef);
    users.forEach(async (document) => {
      const userRef = doc(db, "users", document.id);
      const friendRef = collection(userRef, "friends");
      const inviteRef = collection(userRef, "invite");
      const noticeRef = collection(userRef, "notice");
      const q = query(friendRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (friend) => {
        const docRef = doc(userRef, "friends", friend.id);
        await updateDoc(docRef, {
          photoURL: photoURL,
        });
      });
      const r = query(inviteRef, where("uid", "==", user.uid));
      const querySnapshotR = await getDocs(r);
      querySnapshotR.forEach(async (invite) => {
        const docRef = doc(userRef, "invite", invite.id);
        await updateDoc(docRef, {
          photoURL: photoURL,
        });
      });
      const s = query(noticeRef, where("uid", "==", user.uid));
      const querySnapshotS = await getDocs(s);
      querySnapshotS.forEach(async (notice) => {
        const docRef = doc(userRef, "notice", notice.id);
        await updateDoc(docRef, {
          photoURL: photoURL,
        });
      });
    });

    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("author.uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, "posts", document.id);
      await updateDoc(docRef, {
        "author.photo": photoURL,
      });
    });

    const posts = await getDocs(postsRef);
    posts.forEach(async (document) => {
      const postsRef = doc(db, "posts", document.id);
      const commentRef = collection(postsRef, "comments");
      const q = query(commentRef, where("author.uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (comment) => {
        const docRef = doc(postsRef, "comments", comment.id);
        await updateDoc(docRef, {
          "author.photo": photoURL,
        });
      });
    });
  };

  return {
    updateBackgroundImage,
    updateDisplayName,
    updatePhotoURL,
    backgroundURL,
    isUpdatingBackgroundImage,
    isGettingBackgroundImage,
    profile,
  };
};
