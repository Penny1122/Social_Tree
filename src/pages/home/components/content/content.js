import React from "react";
import AddPost from "./AddPost";
import ArticleItem from "./ArticleItem";

const Content = () => {
  return (
    <li className="content">
      <AddPost />
      <ArticleItem />
    </li>
  );
};

export default Content;
