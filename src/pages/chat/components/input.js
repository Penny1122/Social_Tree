import React, { useEffect } from "react";
import { useState } from "react";
import { IoAttachSharp } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import { useChat } from "../../../hooks/useChat";
import { useChatStatus } from "../../../hooks/useChat";

const Input = () => {
  const { ReadMessage2, SendMessage } = useChat();
  const { userData, chatId } = useChatStatus();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = () => {
    SendMessage({ img, text });
    setText("");
    setImg(null);
  };
  const handleReadMessage = () => {
    ReadMessage2(chatId, userData);
  };

  return (
    <div className="input" onClick={chatId && handleReadMessage}>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        {/* <IoAttachSharp className="attach" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <BsImages className="image" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
