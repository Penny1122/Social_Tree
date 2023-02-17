import React from "react";
import { useState } from "react";
import { useGetPost } from "../../../../hooks/useGetPost";
import FriendsInvited from "./FriendsInvited";
import "./Friend.css";

const Friend = () => {
  return (
    <li className="friend">
      <FriendsInvited />
    </li>
  );
};

export default Friend;
