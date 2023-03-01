import React from "react";
import { useState, useEffect } from "react";
import { friendList } from "../../../hooks/useFriend";
import { Link, useParams } from "react-router-dom";
import "./albumAndFriend.css";

const AlbumAndFriend = ({ posts }) => {
  const { userId } = useParams();
  const { friendsList } = friendList();
  const [clickAlbum, setClickAlbum] = useState(true);
  const [clickFriend, setClickFriend] = useState(false);

  const handleAlbum = () => {
    setClickAlbum(true);
    setClickFriend(false);
  };
  const handleFriend = () => {
    setClickAlbum(false);
    setClickFriend(true);
  };
  useEffect(() => {
    setClickAlbum(true);
    setClickFriend(false);
  }, [userId]);
  return (
    <div className="albumAndFriend">
      <div className="title">
        <span className={clickAlbum ? "click" : ""} onClick={handleAlbum}>
          相簿
        </span>
        <span className={clickFriend ? "click" : ""} onClick={handleFriend}>
          好友
        </span>
      </div>
      {clickAlbum && (
        <div className="photo">
          {posts.map((doc) => {
            const { id, imageURL } = doc;
            return <img src={imageURL} key={id} />;
          })}
        </div>
      )}
      {clickFriend && (
        <div className="friend">
          {friendsList.map((doc) => {
            const { id, photoURL, displayName } = doc;
            return (
              <Link to={`/user-profile/${id}`} key={id}>
                <span className="friend-item">
                  <div>
                    <img src={photoURL} />
                    <span className="name">{displayName}</span>
                  </div>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlbumAndFriend;
