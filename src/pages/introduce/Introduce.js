import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import introduce from "../../images/introduce.jpg";
import chatDemo from "../../images/chatDemo.gif";
import chatSearch from "../../images/chatSearch.gif";
import readPost from "../../images/readPost.gif";
import login from "../../images/loginDemo.gif";
import AddPost from "../../images/AddPostDemo.gif";
import LikeAndComment from "../../images/LikeAndComment.gif";
import device from "../../images/device.jpg";
import Sign from "../../images/sign.jpg";
import Post from "../../images/post.jpg";
import Chat from "../../images/chat.jpg";
import "./Introduce.css";

const Introduce = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="introduce">
      <div className="introduce-slogan">
        <div className="introduce-text">
          <div>Enjoy Sharing and Chatting with the World.</div>
          <li>Share interesting life.</li>
          <li>Chat with people.</li>
          <li>Get more friends.</li>
          <li>Comment and like friends' content.</li>
          <button
            className="button-89"
            role="button"
            onClick={() => navigate("/login")}
          >
            Click to Start!
          </button>
        </div>
        <img src={introduce} alt={introduce} />
      </div>
      <div className="function">
        <div className="login-function">
          <img src={Sign} className="login-function-img" />
          <div>Easy to Use</div>
          <button
            className="button-52"
            role="button"
            onClick={() => setShow(true)}
          >
            Registration system
          </button>
          <button
            className="button-52"
            role="button"
            onClick={() => setShow(false)}
          >
            Reading posts
          </button>
        </div>
        {show && <img src={login} className="img"></img>}
        {!show && <img src={readPost} className="img"></img>}
      </div>
      <div className="function2">
        <div>
          <img src={Post} className="slogan-img" />
          <div>Share with Click</div>
        </div>
        <div>
          <img src={AddPost} className="img"></img>
          <span>Choose a photo, write something and tag your friends.</span>
        </div>
        <div>
          <img src={LikeAndComment} className="img" />
          <span>Give a like and leave a comment.</span>
        </div>
      </div>
      <div className="function2">
        <div>
          <img src={Chat} className="slogan-img" />
          <div>Chat with Friends</div>
        </div>
        <div>
          <img src={chatSearch} className="img"></img>
          <span>Search anybody to join the chat.</span>
        </div>
        <div>
          <img src={chatDemo} className="img" />
          <span>Enjoy chatting!</span>
        </div>
      </div>
      <div className="device">
        <img src={device}></img>
        <div className="device-text">Supported on computer and mobile.</div>
        <div className="device-button">
          <button
            className="button-89"
            role="button"
            onClick={() => navigate("/login")}
          >
            Click to Start!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
