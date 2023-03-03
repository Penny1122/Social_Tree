import React from "react";
import { useChatStatus } from "../../../../hooks/useChat";
import { useChat } from "../../../../hooks/useChat";
import { useNavigate } from "react-router-dom";
import { chatNotice } from "../../../../hooks/useChat";
import { BsDot } from "react-icons/bs";

const FriendsItem = ({ uid, displayName, photoURL, invitedAt }) => {
  const { dispatch } = useChatStatus();
  const { CreateGroupFromFriendList } = useChat();
  const { notice } = chatNotice(uid);
  const navigate = useNavigate();
  const handleLinkToChatRoom = () => {
    CreateGroupFromFriendList({ uid, photoURL, displayName });
    dispatch({
      type: "Change_user",
      payload: {
        uid,
        photoURL,
        displayName,
      },
    });
    navigate("/chatRoom");
  };
  return (
    <>
      <div className="user" onClick={handleLinkToChatRoom}>
        <div className="link">
          <img className="user-photo" src={photoURL} />
          <span className="user-name">{displayName}</span>
          {notice && <BsDot className="read" />}
        </div>
      </div>
    </>
  );
};

export default FriendsItem;
