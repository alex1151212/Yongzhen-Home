import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  user: string | null;
  //   login: boolean;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext({
  user: null,
  //   login: false,
  setUser: () => {},
} as IAuthContext);

export interface IAuthResponse {
  user: string;
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  //   const login = async (data) => {
  //     setUser(data);
  //     navigate("/profile");
  //   };

  //   // call this function to sign out logged in user
  //   const logout = () => {
  //     setUser(null);
  //     navigate("/", { replace: true });
  //   };

  const value = useMemo(
    () => ({
      user,
      setUser,
      //   login,
      //   logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
