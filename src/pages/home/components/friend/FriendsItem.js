import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetPost } from "../../../../hooks/useGetPost";
import { HiUserAdd } from "react-icons/hi";

const FriendsItem = ({ uid, displayName, photoURL, invitedAt }) => {
  return (
    <>
      <div className="user">
        <Link>
          <img className="user-photo" src={photoURL} />
          <span className="user-name">{displayName}</span>
        </Link>
      </div>
    </>
  );
};

export default FriendsItem;
