import React from "react";
import { useState } from "react";
import "./AddPost.css";
import { BsImages } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { usePost } from "../../../../hooks/usePost";
import { useAuthStatus } from "../../../../hooks/useAuthStatus";

const AddPost = ({ add }) => {
  const { user } = useAuthStatus();
  const { addPost, isLoading, error } = usePost();
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  const previewURL = file ? URL.createObjectURL(file) : "";
  const handleSubmit = (e) => {
    const metaData = {
      contentType: file.type,
    };
    addPost({ add, note, previewURL, file, metaData });
    setNote("");
    setFile(null);
  };

  return (
    <div className="post">
      <div>
        <img src={user.photoURL} alt="" className="memberImage" />
        <textarea
          wrap="hard"
          type="text"
          placeholder="write something"
          onChange={(e) => setNote(e.target.value)}
          value={note}
          required
        />
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
          <label>
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
