import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useGetNoticeLength } from "../hooks/useGetNotice";
import { CgTrees } from "react-icons/cg";
import { HiBell } from "react-icons/hi";
import { useAuthStatus } from "../hooks/useAuthStatus";
import "./Navbar.css";
import Notice from "./Notice";

const Navbar = () => {
  const [showList, setShowList] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthStatus();
  const { notice } = useGetNoticeLength();

  const toggleList = () => {
    setShowList(!showList);
  };

  return (
    <div className="navbar">
      <ul className="navbar-ul">
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
            <div className="circle-box" onClick={toggleList}>
              <HiBell className="notice" />
              <div className="notice-count">{notice.length}</div>
              {showList && <Notice />}
            </div>
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
