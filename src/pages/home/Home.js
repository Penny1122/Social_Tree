import React from "react";
import Content from "./components/content/content";
import Friend from "./components/friend/Friend";
import "./Home.css";
import User from "./components/profile/user";

const Home = () => {
  return (
    <div className="home">
      <ul>
        <User />
        <Content />
        <Friend />
      </ul>
    </div>
  );
};

export default Home;
