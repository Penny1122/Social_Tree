import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "./AddPost.css";
import { BsImages } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { usePost } from "../../../../hooks/usePost";
import { useTagFriend } from "../../../../hooks/useFriend";
import { useAuthStatus } from "../../../../hooks/useAuthStatus";

const AddPost = ({ add }) => {
  const inputRef = useRef(null);
  const { user } = useAuthStatus();
  const { addPost, isLoading, error } = usePost();
  const { SearchFriend, searchFriend } = useTagFriend();
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [showSearchFriend, setShowSearchFriend] = useState(false);
  const [showSearchFriendButton, setShowSearchFriendButton] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const previewURL = file ? URL.createObjectURL(file) : "";
  const handleSubmit = (e) => {
    const metaData = {
      contentType: file.type,
    };
    addPost({ add, note, previewURL, file, metaData, selectedFriends });
    setNote("");
    setFile(null);
  };
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setNote(value);
    const str = value.lastIndexOf("@");
    if (value.substring(str).includes("@")) {
      setShowSearchFriend(true);
      const queryFriend = value.split("@").pop();
      await SearchFriend({ queryFriend });
    } else {
      setShowSearchFriend(false);
    }
  };
  const handleSelectFriend = (friend) => {
    if (note.includes("@")) {
      const str = note.lastIndexOf("@");
      const str2 = note.substring(str + 1, note.length);
      const newNote = note.replace(str2, "");
      setShowSearchFriend(false);
      setNote(newNote + friend.displayName + " ");
    } else if (!note.includes("@")) {
      setShowSearchFriend(false);
      setNote((prev) => {
        return [...prev, "@" + friend.displayName];
      });
    }
    if (!selectedFriends.includes(friend.uid)) {
      setSelectedFriends([...selectedFriends, friend.uid]);
    }
    inputRef.current.focus();
  };
  const handleSelectFriendButton = (friend) => {
    setShowSearchFriendButton(false);
    setNote(note + "@" + friend.displayName + " ");
    if (!selectedFriends.includes(friend.uid)) {
      setSelectedFriends([...selectedFriends, friend.uid]);
    }
    inputRef.current.focus();
  };
  const showTagListButton = () => {
    setShowSearchFriendButton(true);
    const queryFriend = "";
    SearchFriend({ queryFriend });
  };
  return (
    <div className="post">
      <div className="post-div">
        <img src={user.photoURL} alt="" className="memberImage" />
        <textarea
          wrap="hard"
          type="text"
          placeholder="write something"
          onChange={handleInputChange}
          value={note}
          required
          ref={inputRef}
        />
        {searchFriend && showSearchFriend && (
          <div className="search-friend-list">
            {searchFriend.map((friend) => (
              <div
                key={friend.id}
                onClick={() => handleSelectFriend(friend)}
                className="search-friend"
              >
                {friend.displayName}
              </div>
            ))}
          </div>
        )}
        {searchFriend && showSearchFriendButton && (
          <div className="search-friend-list">
            {searchFriend.map((friend) => (
              <div
                key={friend.id}
                onClick={() => handleSelectFriendButton(friend)}
                className="search-friend"
              >
                {friend.displayName}
              </div>
            ))}
          </div>
        )}
        {file && (
          <div className="preImage-box">
            <img src={previewURL} className="previewImage" />
          </div>
        )}
      </div>
      <hr className="addPost-hr" />
      <div className="post-bottom">
        <div className="post-bottom-images">
          <label htmlFor="add-image">
            <BsImages className="BsImages" />
            <span>加入圖片</span>
          </label>
          <input
            type="file"
            id="add-image"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label onClick={showTagListButton}>
            <FaUserFriends className="FaUserFriends" />
            <span>標註朋友</span>
          </label>
        </div>
        {!isLoading && (
          <button className="share-btn" onClick={handleSubmit}>
            分享
          </button>
        )}
        {isLoading && (
          <button className="share-btn" disabled>
            <BiLoaderCircle className="loading" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddPost;
