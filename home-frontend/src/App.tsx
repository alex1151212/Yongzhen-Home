import React from "react";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import Member from "./component/Member";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/member" element={<Member />} />
    </Routes>
  );
}

export default App;
