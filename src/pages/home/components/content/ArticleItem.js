import React from "react";
import "./ArticleItem.css";
import Item from "./Item";
import MemberIcon from "../../../../images/02-6.jpg";
import cat from "../../../../images/catcat.jpg";
import Like from "../../../../images/like.png";
import LikeFilled from "../../../../images/like-filled.png";

const ArticleItem = ({ articleContent }) => {
  return (
    <>
      {articleContent.map((doc) => {
        const { note, id, imageURL } = doc;
        return <Item key={id} note={note} image={imageURL} />;
      })}
      <div className="item">
        <div className="poster">
          <img className="poster-photo" src={MemberIcon} alt="" />
          <span className="poster-name">Penny Chen</span>
        </div>
        <div className="item-photo">
          <img src={cat} alt=""></img>
          <div className="item-bottom">
            <div className="like">
              <img src={LikeFilled} alt=""></img>
              <span>100 Likes</span>
            </div>
            <div className="text">
              <span className="poster-name">Penny Chen</span>
              <span className="poster-text">這是我家的貓咪</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleItem;
