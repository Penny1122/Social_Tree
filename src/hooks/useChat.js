import { useContext, useState, useEffect } from "react";
import { useAuthStatus } from "./useAuthStatus";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { db, storage } from "./../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export const useChatStatus = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw Error("useChatStatus must be inside an useChatStatusProvider");
  }

  return context;
};

export const useChat = () => {
  const { user } = useAuthStatus();
  const { chatId, userData } = useChatStatus();
  const [searchUser, setSearchUser] = useState(null);
  const [err, setErr] = useState(false);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [chatId]);

  const SearchUser = async ({ username }) => {
    setSearchUser([]);
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", username),
      where("displayName", "<=", username + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const CreateGroup = async ({ searchUser, user }) => {
    const combinedId =
      user.uid > searchUser.uid
        ? user.uid + searchUser.uid
        : searchUser.uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [searchUser.uid + ".userInfo"]: {
            uid: searchUser.uid,
            displayName: searchUser.displayName,
            photoURL: searchUser.photoURL,
          },
          [searchUser.uid + ".date"]: serverTimestamp(),
          [searchUser.uid + ".unreadCount"]: 0,
        });

        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [user.uid + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [user.uid + ".date"]: serverTimestamp(),
          [user.uid + ".unreadCount"]: 0,
        });
      }
    } catch (err) {}
  };

  const CreateGroupFromFriendList = async ({ uid, photoURL, displayName }) => {
    const combinedId = user.uid > uid ? user.uid + uid : uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [uid + ".userInfo"]: {
            uid: uid,
            displayName: displayName,
            photoURL: photoURL,
          },
          [uid + ".date"]: serverTimestamp(),
          [uid + ".unreadCount"]: 0,
        });

        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [user.uid + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [user.uid + ".date"]: serverTimestamp(),
          [user.uid + ".unreadCount"]: 0,
        });
      }
    } catch (err) {}
  };

  const ReadMessage = async (uid) => {
    const combinedId = user.uid > uid ? user.uid + uid : uid + user.uid;
    await updateDoc(doc(db, "userChats", user.uid), {
      [uid + ".unreadCount"]: 0,
    });
    const chatsRef = doc(db, "chats", combinedId);
    const querySnapshot = await getDoc(chatsRef);
    const message = querySnapshot.data().messages;
    const updatedMessage = message.map((doc) => {
      if (doc.senderId == uid && doc.img) {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: true,
          img: doc.img,
        };
      } else if (doc.senderId == uid && !doc.img) {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: true,
        };
      } else if (doc.senderId != uid && doc.img) {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: doc.read,
          img: doc.img,
        };
      }
      {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: doc.read,
        };
      }
    });
    await updateDoc(chatsRef, { messages: updatedMessage });
  };
  const ReadMessage2 = async (chatId, userData) => {
    const combinedId =
      user.uid > userData.uid
        ? user.uid + userData.uid
        : userData.uid + user.uid;
    await updateDoc(doc(db, "userChats", user.uid), {
      [userData.uid + ".unreadCount"]: 0,
    });
    const chatsRef = doc(db, "chats", combinedId);
    const querySnapshot = await getDoc(chatsRef);
    const message = querySnapshot.data().messages;
    const updatedMessage = message.map((doc) => {
      if (doc.senderId == userData.uid && doc.img) {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: true,
          img: doc.img,
        };
      } else if (doc.senderId == userData.uid && !doc.img) {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: true,
        };
      } else if (doc.senderId != userData.uid && doc.img) {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: doc.read,
          img: doc.img,
        };
      }
      {
        return {
          id: doc.id,
          date: doc.date,
          senderId: doc.senderId,
          text: doc.text,
          read: doc.read,
        };
      }
    });
    await updateDoc(chatsRef, { messages: updatedMessage });
  };

  const SendMessage = async ({ img, text }) => {
    if (img) {
      const imageRef = ref(storage, "chat-images/" + v4());

      await uploadBytesResumable(imageRef, img);
      const chatImageURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: v4(),
          text: text,
          senderId: user.uid,
          date: Timestamp.now(),
          img: chatImageURL,
          read: false,
        }),
      });
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: v4(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
          read: false,
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [userData.uid + ".lastMessage"]: {
        text,
      },
      [userData.uid + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", userData.uid), {
      //   unreadCount: increment(1),
      [user.uid + ".lastMessage"]: {
        text,
      },
      [user.uid + ".date"]: serverTimestamp(),
      [user.uid + ".unreadCount"]: increment(1),
    });
  };

  return {
    setSearchUser,
    SearchUser,
    searchUser,
    err,
    CreateGroup,
    chats,
    SendMessage,
    messages,
    ReadMessage,
    ReadMessage2,
    CreateGroupFromFriendList,
  };
};
export const chatNotice = (uid) => {
  const { user } = useAuthStatus();
  const [notice, setNotice] = useState(false);
  useEffect(() => {
    const chatsRef = doc(db, "userChats", user.uid);
    const unSub = onSnapshot(chatsRef, (doc) => {
      if (doc.data()[uid] && doc.data()[uid].unreadCount > 0) {
        setNotice(true);
      } else {
        setNotice(false);
      }
    });
    return () => unSub();
  }, []);
  return { notice };
};
