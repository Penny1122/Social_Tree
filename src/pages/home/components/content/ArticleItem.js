import React, { useEffect } from "react";
import "./ArticleItem.css";
import Item from "./Item";
import { Waypoint } from "react-waypoint";
import { useGetPost } from "../../../../hooks/useGetPost";
import MemberIcon from "../../../../images/02-6.jpg";
import cat from "../../../../images/catcat.jpg";
import Like from "../../../../images/like.png";
import LikeFilled from "../../../../images/like-filled.png";

const ArticleItem = ({ posts }) => {
  const { scrollGetData } = useGetPost();

  return (
    <>
      {posts.map((doc) => {
        const { note, id, imageURL, likedBy, author, commentCount, createdAt } =
          doc;
        return (
          <Item
            key={id}
            id={id}
            note={note}
            image={imageURL}
            likedBy={likedBy}
            author={author}
            commentCount={commentCount}
            createdAt={createdAt}
          />
        );
      })}
      <Waypoint onEnter={scrollGetData} />
    </>
  );
};

export default ArticleItem;
