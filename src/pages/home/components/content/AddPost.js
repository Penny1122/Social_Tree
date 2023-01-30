import React from "react";
import { useState } from "react";
import "./AddPost.css";
import { BsImages } from "react-icons/Bs";
import { FaUserFriends } from "react-icons/Fa";
import MemberIcon from "../../../../images/02-6.jpg";
import { useAddPost } from "../../../../hooks/useAddPost";

const AddPost = ({ add }) => {
  const { addPost, isLoading, error } = useAddPost();
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  const previewURL = file ? URL.createObjectURL(file) : "";
  const handleSubmit = (e) => {
    const metaData = {
      contentType: file.type,
    };
    addPost({ add, note, previewURL, file, metaData });
  };

  return (
    <div className="post">
      <div>
        <img src={MemberIcon} alt={MemberIcon} className="memberImage" />
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
      <hr />
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
        <div className="btn" onClick={handleSubmit}>
          分享
        </div>
      </div>
    </div>
  );
};

export default AddPost;
