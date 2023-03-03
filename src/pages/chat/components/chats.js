import React, { useEffect } from "react";
import { useChatStatus } from "../../../hooks/useChat";
import { useChat } from "../../../hooks/useChat";

const Chats = () => {
  const { chats, ReadMessage } = useChat();
  const { dispatch } = useChatStatus();
  const handleSelect = async (e, f) => {
    console.log(e);
    dispatch({ type: "Change_user", payload: e });
    ReadMessage(f.userInfo.uid);
  };
  useEffect(() => {}, [chats]);

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo, chat[1])}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
            {chat[1].unreadCount > 0 && (
              <div className="unread">{chat[1].unreadCount}</div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Chats;
