import React from "react";
import Content from "./components/content/content";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <ul>
        <li className="profile">
          <div></div>
        </li>
        <Content />
        <li className="friend">
          <div></div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
