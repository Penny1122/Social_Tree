import React, { useState } from "react";
import MemberIcon from "../../../../images/02-6.jpg";
import Like from "../../../../images/like.png";
import LikeFilled from "../../../../images/like-filled.png";
import { BiLoaderCircle } from "react-icons/bi";
import { BiSend } from "react-icons/bi";
import { useGetPost } from "../../../../hooks/useGetPost";
import { useLikePost } from "../../../../hooks/useLikePost";
import { useAddComment } from "../../../../hooks/useAddComment";
import { useAuthStatus } from "../../../../hooks/useAuthStatus";
// import Comment from "./Comment";

const Item = ({ id, note, image, author, likedBy, doc }) => {
  const { user } = useAuthStatus();
  const { isLoading } = useGetPost();
  const { likePost, isLoadingLike } = useLikePost();
  const { addComment, isLoadingAddComment } = useAddComment();
  const [commentContent, setCommentContent] = useState("");

  const isLiked = likedBy?.includes(user.uid);

  const handleLikePost = () => {
    likePost(id, isLiked);
  };
  const handleSubmit = () => {
    addComment(id, commentContent);
    setCommentContent("");
  };

  return (
    <>
      {!isLoading && (
        <div className="item">
          <div className="poster">
            <img className="poster-photo" src={MemberIcon} alt="" />
            <span className="poster-name">{author.displayName}</span>
          </div>
          <div className="item-photo">
            <img src={image} alt="" onDoubleClick={handleLikePost} />
            {isLoadingLike && (
              <div className="heart">
                <img src={LikeFilled} alt="" />
              </div>
            )}
            <div className="item-bottom">
              <div className="like">
                <img
                  src={isLiked ? LikeFilled : Like}
                  alt=""
                  onClick={handleLikePost}
                />

                <span>{likedBy.length || 0} Likes</span>
              </div>
              <div className="text">
                <span className="poster-name">{author.displayName}</span>
                <span className="poster-text">{note}</span>
              </div>
              <div className="message">
                <img className="poster-photo" src={MemberIcon} alt="" />
                <input
                  placeholder="新增留言"
                  className="message-input"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                {!isLoadingAddComment && (
                  <BiSend className="send-comment" onClick={handleSubmit} />
                )}
                {isLoadingAddComment && <BiLoaderCircle className="loading" />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Item;
