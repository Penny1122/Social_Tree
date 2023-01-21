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
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </label>
            <label>
              <span>信箱：</span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label>
              <span>密碼：</span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            {!isLoading && <button>Register</button>}
            {isLoading && <button disabled>Loading</button>}
            {error && <p>{error}</p>}
          </form>
        </div>
        <div className="right">
          <h1>Social Tree</h1>
          <p>享受人與人之間無距離的互動</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
