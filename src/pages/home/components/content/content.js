import React from "react";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";
import ArticleItem from "./ArticleItem";

const Content = () => {
  const [content, setContent] = useState([]);
  // useEffect(() => {
  //   getContent();
  // }, []);
  // const getContent = () => {
  //   setContent(function (prevContent) {
  //     return [
  //       ...prevContent,
  //       {
  //         id: "test",
  //         note: "test",
  //       },
  //     ];
  //   });
  // };
  return (
    <li className="content">
      <AddPost add={setContent} />
      <ArticleItem articleContent={content} />
    </li>
  );
};

export default Content;
