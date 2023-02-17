import React, { useState } from "react";
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
  console.log(detailDate);
  return (
    <div className="comment">
      <img src={author.photoURL} />
      <div className="comment-box">
        <span className="poster-name">{author.displayName}</span>
        <span className="comment-time">{Time(createdDate)}</span>
        <br />
        <span className="poster-text">{content}</span>
      </div>
    </div>
  );
};

export default SinglePostComment;
