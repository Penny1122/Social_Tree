import React, { useContext } from "react";
import { useState } from "react";
import AddPost from "./AddPost";
import ArticleItem from "./ArticleItem";
import { useGetPost } from "../../../../hooks/useGetPost";
import { usePostContext } from "../../../../hooks/useGetPost";
import { ShowAddPost } from "../../../../context/ShowAddPostContext";

const Content = () => {
  const { showAddPost } = useContext(ShowAddPost);
  const [content, setContent] = useState([]);
  const { posts } = usePostContext();
  const { isLoading } = useGetPost();

  return (
    <li className="content">
      {showAddPost && <AddPost add={setContent} />}
      {!isLoading && <ArticleItem posts={posts} />}
    </li>
  );
};

export default Content;
