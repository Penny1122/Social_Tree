import React, { useEffect } from "react";
import { useState } from "react";
import { useGetPost } from "../../../../hooks/useGetPost";
import { HiUserAdd } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import FriendsInvitedItem from "./FriendsInvitedItem";
import FriendsItem from "./FriendsItem";
import { useFriendInvite } from "../../../../hooks/useFriend";
import { async } from "@firebase/util";

const FriendsInvited = () => {
  const { inviteInfo, empty, usersInfo } = useFriendInvite();

  return (
    <div className="invited-friend">
      {!empty && (
        <>
          <div className="invited-slogan">
            <HiUserAdd className="invited-icon" />
            好友邀請
          </div>
          <hr className="friend-hr" />
        </>
      )}
      {inviteInfo.map((doc) => {
        const { id, displayName, photoURL, invitedAt } = doc;
        return (
          <FriendsInvitedItem
            key={id}
            uid={id}
            displayName={displayName}
            photoURL={photoURL}
            invitedAt={invitedAt}
          />
        );
      })}
      <div className="friend-list">
        <FaUserFriends className="invited-icon" />
        好友列表
      </div>
      <hr className="friend-hr" />
      {usersInfo.map((doc) => {
        const { id, displayName, photoURL, login } = doc;
        return (
          <FriendsItem
            key={id}
            uid={id}
            displayName={displayName}
            photoURL={photoURL}
            status={login ? login : false}
          />
        );
      })}
    </div>
  );
};

export default FriendsInvited;
