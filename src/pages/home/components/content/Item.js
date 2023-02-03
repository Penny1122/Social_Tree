import React, { useState } from "react";
import MemberIcon from "../../../../images/02-6.jpg";
import Like from "../../../../images/like.png";
import LikeFilled from "../../../../images/like-filled.png";
import { BiLoaderCircle } from "react-icons/bi";
import { BiSend } from "react-icons/bi";
import { useGetComment } from "../../../../hooks/useGetComment";
import { useLikePost } from "../../../../hooks/useLikePost";
import { useAddComment } from "../../../../hooks/useAddComment";
import { useAuthStatus } from "../../../../hooks/useAuthStatus";
import Comment from "./Comment";

const Item = ({ id, note, image, author, likedBy, commentCount }) => {
  const { comments, isLoading } = useGetComment(id);
  const { user } = useAuthStatus();
  const { likePost, isLoadingLike } = useLikePost();
  const { addComment } = useAddComment();
  const [commentContent, setCommentContent] = useState("");
  const [commentCLoadingIcon, setCommentCLoadingIcon] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isLiked = likedBy?.includes(user.uid);

  const handleLikePost = () => {
    likePost(id, isLiked);
  };
  const handleSubmitComment = () => {
    if (commentContent) {
      setCommentCLoadingIcon(true);
      addComment(id, commentContent);
      setCommentContent("");
      setTimeout(() => {
        setCommentCLoadingIcon(false);
      }, 1000);
      setShowComments(true);
    }
  };
  const showAllComments = () => {
    if (!showComments) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };

  return (
    <>
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
              <span>{likedBy ? likedBy.length : 0} Likes</span>
            </div>
            <div className="text">
              <span className="poster-name">{author.displayName}</span>
              <span className="poster-text">{note}</span>
            </div>
            {commentCount && (
              <div className="checkAllComments" onClick={showAllComments}>
                {!showComments ? "查看" : "隱藏"}全部
                {!showComments ? ` ${commentCount} 則` : ""}留言
              </div>
            )}
            {!isLoading && showComments && (
              <div>
                {comments.map((doc) => {
                  const { content, author, createdAt } = doc;
                  return (
                    <Comment
                      content={content}
                      key={doc.id}
                      author={author}
                      createdAt={createdAt}
                    />
                  );
                })}
              </div>
            )}
            <div className="message">
              <img className="poster-photo" src={MemberIcon} alt="" />
              <input
                placeholder="新增留言"
                className="message-input"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitComment();
                  }
                }}
              />
              {!commentCLoadingIcon && (
                <BiSend
                  className="send-comment"
                  onClick={handleSubmitComment}
                />
              )}
              {commentCLoadingIcon && <BiLoaderCircle className="loading" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Item;
