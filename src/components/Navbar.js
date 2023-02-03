import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { CgTrees } from "react-icons/cg";
import { useAuthStatus } from "../hooks/useAuthStatus";
import "./Navbar.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthStatus();

  return (
    <div className="navbar">
      <ul>
        <Link to="/" className="title-aTag">
          <li className="title">
            <CgTrees className="logo" />
            <span className="title-name">Social</span>
            <span className="title-name">Tree</span>
          </li>
        </Link>
        {!user && (
          <li className="btn">
            <Link to="/login">註冊 / 登入</Link>
          </li>
        )}
        {user && (
          <>
            <Link to={`/user-profile/${user.uid}`}>
              <img className="poster-photo" src={user.photoURL} alt="" />
            </Link>
            <li>Hello, {user.displayName}</li>
            <li className="btn" onClick={logout}>
              登出
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
