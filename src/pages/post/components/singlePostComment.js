import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTime } from "../../../hooks/useTime";

const SinglePostComment = ({ content, author, createdAt }) => {
  const { Time } = useTime();
  const createdDate = new Date(createdAt.toDate().toString());
  const detailDate = createdDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className="comment">
      <Link to={`/user-profile/${author.uid}`}>
        <img src={author.photoURL} />
      </Link>
      <div className="comment-box">
        <Link to={`/user-profile/${author.uid}`}>
          <span className="poster-name">{author.displayName}</span>
        </Link>
        <span className="comment-time">{Time(createdDate)}</span>
        <br />
        <span className="poster-text">{content}</span>
      </div>
    </div>
  );
};

export default SinglePostComment;
