import React from "react";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";
import ArticleItem from "./ArticleItem";
import { useGetPost } from "../../../../hooks/useGetPost";

const Content = () => {
  const [content, setContent] = useState([]);
  const { posts } = useGetPost();
  console.log(posts);
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
      <ArticleItem articleContent={posts} />
    </li>
  );
};

export default Content;
