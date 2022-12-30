import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import Member from "./component/Member";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hook/useAuth";
import { AuthLayout } from "./component/Layout/AuthLayout";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/member" element={<Member />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
