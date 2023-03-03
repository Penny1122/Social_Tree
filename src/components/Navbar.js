import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useGetNoticeLength } from "../hooks/useGetNotice";
import { useSearchUser } from "../hooks/useFriend";
import { BiSearch } from "react-icons/bi";
import { CgTrees } from "react-icons/cg";
import { HiBell, HiChat } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAuthStatus } from "../hooks/useAuthStatus";
import "./Navbar.css";
import Notice from "./Notice";
import FriendsInvited from "../pages/home/components/friend/FriendsInvited";

const Navbar = () => {
  const searchRef = useRef(null);
  const { SearchUser, userList } = useSearchUser();
  const [showList, setShowList] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [queryUser, setQueryUser] = useState("");
  const { logout } = useLogout();
  const { user } = useAuthStatus();
  const { notice } = useGetNoticeLength();
  const navigate = useNavigate();

  const toggleList = () => {
    setShowFriendList(false);
    setShowList(!showList);
  };
  const handleSearchUser = (e) => {
    const value = e.target.value;
    setQueryUser(value);
    SearchUser(value);
  };
  const toggleFriendList = () => {
    setShowList(false);
    setShowFriendList(!showFriendList);
  };
  const handleShowAddPost = () => {
    setShowList(false);
    setShowFriendList(false);
    setShowAddPost(!showAddPost);
  };
  const handleLink = () => {
    navigate("/chatroom");
  };
  useEffect(() => {
    if (showSearch) {
      searchRef.current.focus();
    }
  }, [showSearch]);
  return (
    <>
      <div div className="navbar-fix"></div>
      <div className="navbar">
        <ul className="navbar-ul">
          <div className="title-aTag">
            <Link to="/">
              <li className="title">
                <CgTrees className="logo" />
                <span className="title-name">Social</span>
                <span className="title-name">Tree</span>
              </li>
            </Link>
            {showIcon && user && (
              <div
                className="circle-box RWDIcon"
                onClick={() => {
                  setShowIcon(false);
                  setShowSearch(true);
                }}
              >
                <BiSearch className="notice" />
              </div>
            )}
            {user && (
              <li className="search-bar-box">
                {!showSearch && (
                  <>
                    <input
                      className="search-bar"
                      type="text"
                      placeholder="Search User..."
                      onClick={() => setShowSearch(true)}
                    />
                    <BiSearch className="search-bar-icon" />
                  </>
                )}

                {showSearch && (
                  <div
                    className="search-user-list"
                    style={
                      userList && {
                        boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
                      }
                    }
                  >
                    <div className="search-bar2-box">
                      <AiOutlineArrowLeft
                        className="arrow"
                        onClick={() => {
                          setShowSearch(false);
                          setShowIcon(true);
                        }}
                      />
                      <input
                        ref={searchRef}
                        className="search-bar2"
                        type="text"
                        placeholder="Search User..."
                        value={queryUser}
                        onChange={handleSearchUser}
                      />
                    </div>
                    {userList && (
                      <>
                        {userList.map((user) => (
                          <Link
                            to={`/user-profile/${user.id}`}
                            key={user.id}
                            className="search-user"
                            onClick={() => {
                              setShowSearch(false);
                              setShowIcon(true);
                            }}
                          >
                            <div
                              className="search-user"
                              onClick={() => {
                                setShowSearch(false);
                                setQueryUser("");
                              }}
                            >
                              <img
                                className="poster-photo"
                                src={user.photoURL}
                              />
                              <span>{user.displayName}</span>
                            </div>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </li>
            )}
          </div>

          {!user && (
            <li className="btn">
              <Link to="/login">註冊 / 登入</Link>
            </li>
          )}
          {user && (
            <>
              <div className="circle-box" onClick={handleLink}>
                <HiChat className="notice" />
              </div>
              <div className="circle-box RWDIcon" onClick={toggleFriendList}>
                <FaUserFriends className="notice" />
                {showFriendList && (
                  <li className="friend">
                    <FriendsInvited />
                  </li>
                )}
              </div>
              <div className="circle-box" onClick={toggleList}>
                <HiBell className="notice" />
                {notice.length > 0 && (
                  <div className="notice-count">{notice.length}</div>
                )}
                {showList && user && <Notice />}
              </div>
              <Link to={`/user-profile/${user.uid}`}>
                <img className="poster-photo" src={user.photoURL} alt="" />
              </Link>

              <li className="hello">Hello, {user.displayName}</li>
              <li className="btn" onClick={logout}>
                登出
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
