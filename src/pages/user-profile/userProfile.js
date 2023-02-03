import React from "react";
import "./userProfile.css";
import Background from "./components/background";
import User from "./components/user";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <ul className="user-profile-ul">
        <li className="profile">
          <ul className="profile-container">
            <Background />
            <User />
          </ul>
        </li>
        <li className="friend"></li>
      </ul>
    </div>
  );
};

export default UserProfile;
