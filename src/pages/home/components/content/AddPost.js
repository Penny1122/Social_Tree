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

  const handleSubmit = (e) => {
    addPost({ add, note });
  };

  // function handleSubmit() {
  //   add(function (prevData) {
  //     return [
  //       {
  //         id: v4(),
  //         note,
  //       },
  //       ...prevData,
  //     ];
  //   });
  // }

  return (
    <div className="post">
      <div>
        <img src={MemberIcon} alt={MemberIcon} />
        <input
          type="text"
          placeholder="write something"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
      </div>
      <hr />
      <div className="post-bottom">
        <div className="post-bottom-images">
          <label htmlFor="add-image">
            <BsImages className="BsImages" />
            <span>加入圖片</span>
          </label>
          <input type="file" id="add-image" style={{ display: "none" }} />
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
