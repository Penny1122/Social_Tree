import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Like from "../../../../images/like.png";
import LikeFilled from "../../../../images/like-filled.png";
import { BiLoaderCircle } from "react-icons/bi";
import { BiSend, BiDotsHorizontalRounded } from "react-icons/bi";
import { useGetComment } from "../../../../hooks/useGetComment";
import { useLikePost } from "../../../../hooks/useLikePost";
import { useAddComment } from "../../../../hooks/useAddComment";
import { useAuthStatus } from "../../../../hooks/useAuthStatus";
import { useTime } from "../../../../hooks/useTime";
import Comment from "./Comment";
import EditPost from "../../../../components/editPost";

const Item = ({
  id,
  note,
  image,
  author,
  likedBy,
  commentCount,
  createdAt,
}) => {
  const { comments, isLoading } = useGetComment(id);
  const { user } = useAuthStatus();
  const { likePost, isLoadingLike } = useLikePost();
  const { addComment } = useAddComment();
  const { Time } = useTime();
  const [commentContent, setCommentContent] = useState("");
  const [commentCLoadingIcon, setCommentCLoadingIcon] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (user.uid === author.uid) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, []);

  const isLiked = likedBy?.includes(user.uid);
  const createdDate = new Date(createdAt.toDate().toString());
  const detailDate = createdDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const handleLikePost = () => {
    likePost({ id, isLiked, author });
  };
  const handleSubmitComment = () => {
    if (commentContent) {
      setCommentCLoadingIcon(true);
      addComment({ id, commentContent, author });
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
          <Link to={`/user-profile/${author.uid}`}>
            <img className="poster-photo" src={author.photo} alt="" />
          </Link>
          <div className="author-bar">
            <Link to={`/user-profile/${author.uid}`}>
              <span className="poster-name">{author.displayName}</span>
            </Link>
            <div
              className="time"
              onMouseEnter={() => setShowTime(true)}
              onMouseLeave={() => setShowTime(false)}
            >
              {Time(createdDate)}
            </div>
            {showTime && <div className="detail-time">{detailDate}</div>}
          </div>
          {isAuthor && (
            <div className="edit">
              <EditPost postId={id} />
            </div>
          )}
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
              <img className="poster-photo" src={user.photoURL} alt="" />
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
