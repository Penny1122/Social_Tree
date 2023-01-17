import React from "react";
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  const handleSubmit = e => {
    e.preventDefault();
    register(email, password, userName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div></div>
      <label>
        <span>name:</span>
        <input
          type="text"
          onChange={e => setUserName(e.target.value)}
          value={userName}
        />
      </label>
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
      {!isLoading && <button>Register</button>}
      {isLoading && <button disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
