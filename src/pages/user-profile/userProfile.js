import React from "react";
import "./userProfile.css";
import Background from "./components/background";
import AddPost from "../home/components/content/AddPost";
import ArticleItem from "../home/components/content/ArticleItem";
import AlbumAndFriend from "./components/albumAndFriend";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import User from "./components/user";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useGetMyPost } from "../../hooks/useGetPost";

const UserProfile = () => {
  const { userId } = useParams();
  const [content, setContent] = useState([]);
  const [load, setLoad] = useState(false);
  const [self, setSelf] = useState(false);
  const { user } = useAuthStatus();
  const { posts, isLoading } = useGetMyPost();

  useEffect(() => {
    if (userId === user.uid) {
      setSelf(true);
      setLoad(true);
    } else {
      setSelf(false);
      setLoad(true);
    }
  }, [userId]);

  return (
    <div className="user-profile">
      {load && !isLoading && (
        <ul className="user-profile-ul">
          <li className="profile">
            <ul className="profile-container">
              <Background self={self} />
              <User self={self} />
              <ul className="document-container">
                <li>{!isLoading && <AlbumAndFriend posts={posts} />}</li>
                <li className="article">
                  {self && <AddPost add={setContent} />}
                  {!isLoading && <ArticleItem posts={posts} />}
                </li>
              </ul>
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
