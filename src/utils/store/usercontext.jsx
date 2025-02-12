import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const getToken = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  console.log(getToken, "token");
  const [token, setToken] = useState(getToken);
  function loginHandler(userToken) {
    setToken(userToken);
    localStorage.setItem("token", JSON.stringify(userToken));
  }

  function logoutHandler() {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationtime");
  }
  let value = {
    login: loginHandler,
    logout: logoutHandler,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
