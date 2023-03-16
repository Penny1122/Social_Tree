import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, isLoading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  const testAccount = (e) => {
    e.preventDefault();
    setEmail("penny@gmail.com");
    setPassword(123456);
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Social Tree</h1>
          <p>享受人與人之間無距離的互動</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>註冊 / Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
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
            {!isLoading && <button onClick={handleSubmit}>登入 / Login</button>}
            <button onClick={testAccount}>使用測試帳號</button>
            {isLoading && <button disabled>Loading</button>}
            {error && <p className="error">{error}</p>}
            <p className="to-register">
              還沒有帳戶嗎？
              <Link to="/register" className="to-register-link">
                點此
              </Link>
              註冊
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
