import React from "react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email);
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div></div>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button>Login</button>
    </form>
  );
};

export default Login;
