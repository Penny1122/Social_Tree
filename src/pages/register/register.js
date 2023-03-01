import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password, userName);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <span>姓名：</span>
              <input
                required
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </label>
            <label>
              <span>信箱：</span>
              <input
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label>
              <span>密碼：</span>
              <input
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            {!isLoading && <button>註冊 / Register</button>}
            {isLoading && <button disabled>Loading</button>}
            {error && <p>{error}</p>}
            <p className="to-login">
              已經有帳戶了？
              <Link to="/login" className="to-login-link">
                點此
              </Link>
              登入
            </p>
          </form>
        </div>
        <div className="right">
          <h1>Social Tree</h1>
          <p>享受人與人之間無距離的互動</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>登入 / Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
