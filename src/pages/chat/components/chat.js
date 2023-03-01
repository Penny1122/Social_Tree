import React from "react";
import { useChatStatus } from "../../../hooks/useChat";
import Messages from "./messages";
import Input from "./input";

const Chat = () => {
  const { userData } = useChatStatus();

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{userData?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
