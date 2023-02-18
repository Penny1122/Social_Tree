import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { useAuthStatus } from "./useAuthStatus";
import {
  setDoc,
  where,
  Timestamp,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

export const useFriendInvite = () => {
  const { user } = useAuthStatus();
  const [inviteInfo, setInviteInfo] = useState([]);
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const userRef = doc(db, "users", user.uid);
    const friendRef = collection(userRef, "friends");
    const q = query(
      friendRef,
      where("reply", "==", true),
      orderBy("invitedAt", "desc")
    );
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        setFriendsInfo([]);
        querySnapshot.forEach((doc) => {
          setFriendsInfo((prevContent) => {
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
        setError("failed to fetch friends");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const userRef = doc(db, "users", user.uid);
    const inviteRef = collection(userRef, "invite");
    const q = query(inviteRef, orderBy("invitedAt", "desc"));
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        setInviteInfo([]);
        if (querySnapshot.empty) {
          setEmpty(true);
        } else {
          setEmpty(false);
          querySnapshot.forEach((doc) => {
            setInviteInfo((prevContent) => {
              return [
                {
                  id: doc.id,
                  ...doc.data(),
                },
                ...prevContent,
              ];
            });
          });
        }
      },
      (error) => {
        console.log(error);
        setError("failed to fetch invites");
      }
    );
    setIsLoading(false);
    return () => unSub();
  }, []);
  return { empty, friendsInfo, inviteInfo, useFriendInvite };
};

export const handleFriend = () => {
  const { user } = useAuthStatus();

  const acceptFriend = async ({ uid, photoURL, displayName }) => {
    const userRef = doc(db, "users", user.uid);
    const friendsRef = doc(userRef, "friends", uid);
    await setDoc(friendsRef, {
      displayName: displayName,
      photoURL: photoURL,
      uid: uid,
      reply: true,
      invitedAt: Timestamp.now(),
    });
    const ref = doc(db, "users", uid);
    const friend = doc(ref, "friends", user.uid);
    await updateDoc(friend, {
      reply: true,
    });
    await deleteDoc(doc(userRef, "invite", uid));

    const noticeRef = doc(collection(ref, "notice"));
    await setDoc(noticeRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      notice: "已接受您的好友邀請。",
      noticedAt: Timestamp.now(),
      postId: "",
      read: false,
    });
  };
  return { acceptFriend };
};

export const useFriend = () => {
  const { user } = useAuthStatus();
  const { userId } = useParams();
  const [inviteInfo, setInviteInfo] = useState([]);
  const [invited, setInvited] = useState(false);
  const [friend, setFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usersRef = doc(db, "users", user.uid);
    const friendRef = doc(usersRef, "friends", userId);
    const unSub = onSnapshot(friendRef, (docSnap) => {
      console.log(docSnap);
      if (docSnap.exists() && docSnap.data().reply) {
        console.log("Document data:", docSnap.data());
        setInvited(true);
        setFriend(true);
      } else if (docSnap.exists()) {
        setInvited(true);
      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
        setInvited(false);
      }
    });
    return () => unSub();
  }, []);

  const addFriend = async ({ uid, photoURL, displayName }) => {
    setInvited(false);
    const userRef = doc(db, "users", user.uid);
    const friendsRef = doc(userRef, "friends", uid);
    await setDoc(friendsRef, {
      displayName: displayName,
      photoURL: photoURL,
      uid: uid,
      reply: false,
      invitedAt: Timestamp.now(),
    });
    const ref = doc(db, "users", uid);
    const friendRef = doc(ref, "invite", user.uid);
    await setDoc(friendRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      notice: user.displayName + "邀請您成為他的好友。",
      invitedAt: Timestamp.now(),
    });
    const noticeRef = doc(collection(ref, "notice"));
    await setDoc(noticeRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      notice: "邀請您成為他的好友。",
      noticedAt: Timestamp.now(),
      postId: "",
      read: false,
    });
    setInvited(true);
  };

  return { friend, invited, addFriend };
};
export const useTagFriend = () => {
  const { user } = useAuthStatus();
  const [searchFriend, setSearchFriend] = useState();

  const SearchFriend = async ({ queryFriend }) => {
    setSearchFriend([]);
    console.log(queryFriend);
    const userRef = doc(db, "users", user.uid);
    const friendRef = collection(userRef, "friends");
    const q = query(
      friendRef,
      where("displayName", ">=", queryFriend),
      where("displayName", "<=", queryFriend + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSearchFriend((prevContent) => {
        return [
          {
            id: doc.id,
            ...doc.data(),
          },
          ...prevContent,
        ];
      });
    });
  };
  return { SearchFriend, searchFriend };
};
