import React, { useState } from "react";

const Comment = ({ content, author, createdAt }) => {
  return (
    <div>
      <div className="comment">
        <span className="poster-name">{author.displayName}</span>
        <span className="poster-text">{content}</span>
      </div>
    </div>
  );
};

export default Comment;
