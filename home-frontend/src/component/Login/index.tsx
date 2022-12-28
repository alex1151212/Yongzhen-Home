import { config } from "process";
import React, { useState } from "react";
import { api } from "../../enviroment/api";
import { instance } from "../../enviroment/axios";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface LoginProps {
  // 在這裡定義您的 props 的型別
}

const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 在這裡放置您的登入邏輯
    Axios({
      url: "http://localhost:8000" + api.login.url(),
      method: api.login.method,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        grant_type: "",
        username: username,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      },
    })
      .then((res) => {
        const { access_token } = res.data;
        localStorage.setItem("token", access_token);

        instance.defaults.headers.common["Authorization"] =
          "Bearer " + access_token || "";

        navigate("/");

        toast.success("🦄 Login Success!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch(() => {
        toast.error("🦄 Login Error!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          <p>Username：</p>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          <p>Password：</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div className="login-button-submit-wrapper">
          <button type="submit" className="login-button-submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
