import React, { useState } from "react";
import { db } from "../../../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useAuthStatus } from "../../../hooks/useAuthStatus";
import { useChat } from "../../../hooks/useChat";

const Search = () => {
  const { user } = useAuthStatus();
  const [username, setUsername] = useState("");
  const { SearchUser, searchUser, setSearchUser, err, CreateGroup } = useChat();

  const handleSearch = async () => {
    SearchUser({ username });
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = () => {
    //check whether the group(chats in firestore) exists, if not create
    CreateGroup({ searchUser, user });
    setUsername("");
    setSearchUser(null);
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {searchUser && (
        <div className="userChat" onClick={handleSelect}>
          <img src={searchUser.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{searchUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
