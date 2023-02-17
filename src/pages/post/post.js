import React from "react";
import { useState } from "react";
import "./post.css";
import { GetSinglePost } from "../../hooks/useGetPost";
import PostItem from "./components/postItem";

const Post = () => {
  const { post, isLoading } = GetSinglePost();

  return <>{!isLoading && post && <PostItem post={post} />}</>;
};

export default Post;
