import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ content, author, createdAt }) => {
  return (
    <div>
      <div className="comment">
        <Link to={`/user-profile/${author.uid}`}>
          <span className="poster-name">{author.displayName}</span>
        </Link>
        <span className="poster-text">{content}</span>
      </div>
    </div>
  );
};

export default Comment;
