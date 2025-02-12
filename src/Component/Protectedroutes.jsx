import { useContext } from "react";
import { AuthContext } from "../utils/store/usercontext";
import { Navigate } from "react-router-dom";

function Protectedroutes({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default Protectedroutes;
