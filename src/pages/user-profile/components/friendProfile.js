import React, { useEffect, useState } from "react";
import { useProfile } from "../../../hooks/useProfile";
import { useFriend, handleFriend } from "../../../hooks/useFriend";
import { HiUserAdd } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";

const FriendProfile = () => {
  const { profile } = useProfile();
  const { friend, invited, addFriend } = useFriend();

  const handleAddFriend = () => {
    const uid = profile.uid;
    const photoURL = profile.photoURL;
    const displayName = profile.displayName;
    addFriend({ uid, photoURL, displayName });
  };
  console.log(friend, invited);
  return (
    <>
      <li className="user">
        <img className="user-photo" src={profile.photoURL} alt="" />
        <span className="user-name">{profile.displayName}</span>
      </li>
      {!invited && !friend && (
        <button className="btn" onClick={handleAddFriend}>
          <HiUserAdd />
          加好友
        </button>
      )}
      {invited && !friend && (
        <button className="btn">
          <HiUserAdd />
          已送出邀請
        </button>
      )}
      {friend && (
        <button className="btn">
          <FaUserCheck />
          朋友
        </button>
      )}
    </>
  );
};
export default FriendProfile;
