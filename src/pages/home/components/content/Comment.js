import { useAddComment } from "../../../../hooks/useAddComment";
import React, { useState } from "react";
import MemberIcon from "../../../../images/02-6.jpg";
import { BiSend } from "react-icons/bi";
import { BiLoaderCircle } from "react-icons/bi";

const Comment = ({ content, author, createdAt }) => {
  //   const { addComment, isLoadingAddComment } = useAddComment();
  //   const [commentContent, setCommentContent] = useState("");
  //   const handleSubmit = () => {
  //     addComment(id, commentContent);
  //   };
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
