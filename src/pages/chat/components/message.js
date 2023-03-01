import React, { useEffect, useRef } from "react";
import { useAuthStatus } from "../../../hooks/useAuthStatus";
import { useChatStatus } from "../../../hooks/useChat";

const Message = ({ message }) => {
  const ref = useRef();
  const { user } = useAuthStatus();
  const { userData } = useChatStatus();
  const createdDate = new Date(message.date.toDate().toString());
  const time = createdDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === user.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === user.uid ? user.photoURL : userData.photoURL
          }
          alt=""
        />
        <span>{time}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.read && message.senderId === user.uid && <span>已讀</span>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
