import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStatus } from "./hooks/useAuthStatus";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Introduce from "./pages/introduce/Introduce";
import UserProfile from "./pages/user-profile/userProfile";
import Navbar from "./components/Navbar";
import Post from "./pages/post/post";
import ChatRoom from "./pages/chat/chatRoom";

const App = () => {
  const { authReady, user } = useAuthStatus();

  return (
    <div>
      {authReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user && <Route path="/" element={<Home />} />}
            {!user && <Route path="/" element={<Introduce />} />}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
