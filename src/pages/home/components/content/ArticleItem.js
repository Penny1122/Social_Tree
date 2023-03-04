import React from "react";
import "./ArticleItem.css";
import Item from "./Item";
import { Waypoint } from "react-waypoint";
import { useGetPost } from "../../../../hooks/useGetPost";

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
