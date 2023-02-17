import React from "react";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";
import ArticleItem from "./ArticleItem";
import { useGetPost } from "../../../../hooks/useGetPost";

const Content = () => {
  const [content, setContent] = useState([]);
  const { posts, isLoading } = useGetPost();

  return (
    <li className="content">
      <AddPost add={setContent} />
      {!isLoading && <ArticleItem posts={posts} />}
    </li>
  );
};

export default Content;
