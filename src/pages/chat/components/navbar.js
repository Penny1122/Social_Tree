import React from "react";
import { useAuthStatus } from "../../../hooks/useAuthStatus";

const Navbar = () => {
  const { user } = useAuthStatus();
  return (
    <div className="navbar">
      <span className="chat-logo">SocialTree Chat</span>
      <div className="user">
        <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
