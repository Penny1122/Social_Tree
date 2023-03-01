import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetPost } from "../../../../hooks/useGetPost";
import { HiUserAdd } from "react-icons/hi";
import { handleFriend } from "../../../../hooks/useFriend";

const FriendsInvitedItem = ({ uid, displayName, photoURL, invitedAt }) => {
  const { acceptFriend } = handleFriend();
  const handleAccept = () => {
    acceptFriend({ uid, displayName, photoURL });
  };
  return (
    <>
      <div className="user">
        <Link>
          <img className="user-photo" src={photoURL} />
          <span className="user-name">{displayName}</span>
        </Link>
      </div>
      <div className="btn">
        <button className="check-btn" onClick={handleAccept}>
          確認
        </button>
        <button className="refuse-btn">忽略</button>
      </div>
    </>
  );
};

export default FriendsInvitedItem;
