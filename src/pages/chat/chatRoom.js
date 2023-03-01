import React from "react";
import "./chatRoom.css";
import { useChatStatus } from "../../hooks/useChat";
import Sidebar from "./components/sidebar";
import Chat from "./components/chat";

const ChatRoom = () => {
  const { chatId } = useChatStatus();
  return (
    <div className="chatRoom">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatRoom;
