import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTime } from "../../../hooks/useTime";
import { useAuthStatus } from "../../../hooks/useAuthStatus";
import { useLikePost } from "../../../hooks/useLikePost";
import { useAddComment } from "../../../hooks/useAddComment";
import { useGetComment } from "../../../hooks/useGetComment";
import Like from "../../../images/like.png";
import LikeFilled from "../../../images/like-filled.png";
import SinglePostComment from "./singlePostComment";
import EditPost from "../../../components/editPost";
import { BiLoaderCircle } from "react-icons/bi";
import { BiSend } from "react-icons/bi";

const PostItem = ({ post }) => {
  const id = post.id;
  const author = post.author;
  const note = post.note;
  const image = post.imageURL;
  const { user } = useAuthStatus();
  const { addComment } = useAddComment();
  const [commentContent, setCommentContent] = useState("");
  const [commentCLoadingIcon, setCommentCLoadingIcon] = useState(false);
  const { comments, isLoading } = useGetComment(id);
  const { Time } = useTime();
  const { likeSinglePost, isLoadingLike } = useLikePost();
  const [showTime, setShowTime] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (user.uid === author.uid) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, []);

  const isLiked = post.likedBy?.includes(user.uid);
  const createdDate = new Date(post.createdAt.toDate().toString());
  const detailDate = createdDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const handleLikePost = () => {
    likeSinglePost({ id, isLiked, author });
  };

  const handleSubmitComment = () => {
    if (commentContent) {
      setCommentCLoadingIcon(true);
      addComment({ id, commentContent, author });
      setCommentContent("");
      setTimeout(() => {
        setCommentCLoadingIcon(false);
      }, 1000);
    }
  };
  return (
    <div className="single-post">
      <ul className="post-ul">
        <li className="post-image">
          <img src={post.imageURL} />
        </li>
        <li className="post-box">
          <div className="poster">
            <Link
              to={`/user-profile/${post.author.uid}`}
              className="poster-photo-link"
            >
              <img className="poster-photo" src={post.author.photo} alt="" />
            </Link>
            <div className="author-bar">
              <Link to={`/user-profile/${post.author.uid}`}>
                <span className="poster-name">{post.author.displayName}</span>
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
                <EditPost
                  postId={id}
                  note={note}
                  author={author}
                  image={image}
                />
              </div>
            )}
          </div>
          <div className="poster-text">{post.note}</div>
          <hr />
          <div className="like">
            <img
              src={isLiked ? LikeFilled : Like}
              alt=""
              onClick={handleLikePost}
            />
            <span>{post.likedBy ? post.likedBy.length : 0} Likes</span>
          </div>
          <hr />
          <div className="comment-list">
            {comments.map((doc) => {
              const { content, author, createdAt } = doc;
              return (
                <SinglePostComment
                  content={content}
                  key={doc.id}
                  author={author}
                  createdAt={createdAt}
                />
              );
            })}
          </div>
          {comments.length > 0 && <hr />}
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
              <BiSend className="send-comment" onClick={handleSubmitComment} />
            )}
            {commentCLoadingIcon && <BiLoaderCircle className="loading" />}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PostItem;
