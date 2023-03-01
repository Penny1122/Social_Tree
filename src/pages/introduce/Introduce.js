import React from "react";
import introduce from "../../images/introduce.jpg";
import report2 from "../../images/report2.svg";
import report3 from "../../images/report3.svg";
import "./Introduce.css";

const Introduce = () => {
  return (
    <div className="introduce">
      <div className="introduce-slogan">
        <div className="introduce-text">
          <div>Share Your Life with the World.</div>
          <li>User registration and login functionality.</li>
          <li>Set personal information.</li>
          <li>Friend system and contact list.</li>
          <li>Share your life with text, image and tag-friends.</li>
          <li>Comment and like other users' content.</li>
        </div>
        <img src={introduce} alt={introduce} />
      </div>
    </div>
  );
};

export default Introduce;
