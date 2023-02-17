import React from "react";
import { useState } from "react";
import "./albumAndFriend.css";

const AlbumAndFriend = ({ posts }) => {
  const [clickAlbum, setClickAlbum] = useState(true);
  const [clickFriend, setClickFriend] = useState(false);

  return (
    <div className="albumAndFriend">
      <div className="title">
        <span className={clickAlbum ? "click" : ""}>相簿</span>
        <span className={clickFriend ? "click" : ""}>好友</span>
      </div>
      <div className="photo">
        {posts.map((doc) => {
          const { id, imageURL } = doc;
          return <img src={imageURL} key={id} />;
        })}
      </div>
    </div>
  );
};

export default AlbumAndFriend;
