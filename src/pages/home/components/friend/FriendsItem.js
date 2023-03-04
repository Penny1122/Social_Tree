import React, { useEffect, useState } from "react";
import { useChatStatus } from "../../../../hooks/useChat";
import { useChat } from "../../../../hooks/useChat";
import { useNavigate } from "react-router-dom";
import { chatNotice } from "../../../../hooks/useChat";
import { BsDot } from "react-icons/bs";
import { MdMarkChatUnread } from "react-icons/md";
import { useFriendInvite } from "../../../../hooks/useFriend";

const FriendsItem = ({ uid, displayName, photoURL, status }) => {
  const [match, setMatch] = useState(false);
  const { friendsInfo } = useFriendInvite();
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
  useEffect(() => {
    friendsInfo.forEach((doc) => {
      if (doc.uid == uid) {
        setMatch(true);
      }
    });
  }, [friendsInfo]);

  return (
    <>
      {match && (
        <div className="user" onClick={handleLinkToChatRoom}>
          <div className="link">
            <BsDot className={` ${status ? "online" : "offline"}`} />
            <img className="user-photo" src={photoURL} />
            <span className="user-name">{displayName}</span>
            {notice && <MdMarkChatUnread className="read" />}
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsItem;
