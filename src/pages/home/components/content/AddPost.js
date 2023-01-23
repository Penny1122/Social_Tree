import React from "react";
import "./AddPost.css";
import { BsImages } from "react-icons/Bs";
import MemberIcon from "../../../../images/02-6.jpg";

const NewPost = () => {
  return (
    <div className="post">
      <div>
        <img src={MemberIcon} alt={MemberIcon} />
        <input type="text" placeholder="write something" />
      </div>
      <hr />
      <div className="post-bottom">
        <div className="post-bottom-images">
          <BsImages className="BsImages" />
          <span>加入圖片</span>
        </div>
        <div className="btn">分享</div>
      </div>
    </div>
  );
};

export default NewPost;
