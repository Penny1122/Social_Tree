import React from "react";
import { useChat } from "../../../hooks/useChat";
import Message from "./message";

const Messages = () => {
  const { messages } = useChat();

  return (
    <div className="messages">
      {messages.map((doc) => (
        <Message message={doc} key={doc.id} />
      ))}
    </div>
  );
};

export default Messages;
