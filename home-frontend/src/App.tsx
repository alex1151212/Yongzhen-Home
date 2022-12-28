import React from "react";
import "./App.css";
import GlassmorphismHoverEffectsNavbar from "./component/GlassmorphismHoverEffectsNavbar";
import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<GlassmorphismHoverEffectsNavbar />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
