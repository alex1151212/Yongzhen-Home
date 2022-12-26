import React, { useState } from "react";

interface LoginProps {
  // 在這裡定義您的 props 的型別
}

const Login: React.FC<LoginProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 在這裡放置您的登入邏輯
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        用戶名：
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        密碼：
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">登入</button>
    </form>
  );
};

export default Login;
