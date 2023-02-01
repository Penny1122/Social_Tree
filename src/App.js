import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStatus } from "./hooks/useAuthStatus";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Introduce from "./pages/introduce/Introduce";
import Navbar from "./components/Navbar";

const App = () => {
  const { authReady, user } = useAuthStatus();

  return (
    <div>
      {authReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
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
