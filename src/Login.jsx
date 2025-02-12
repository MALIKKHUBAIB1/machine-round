import { useContext, useEffect } from "react";
import { AuthContext } from "./utils/store/usercontext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();
  function loginHandler() {
    const value = "white";

    if (!value) return;

    //make and api call for the username and password and then it will give you the token and stor it
    const expirationDate = Date.now();
    localStorage.setItem("expirationtime", JSON.stringify(expirationDate));
    login(value);
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <div>
      <input type="text" className="border border-black" />
      <h1 className="text-black">Hello thsf sd fmds</h1>
      <button type="button" onClick={loginHandler}>
        Login
      </button>
    </div>
  );
}

export default Login;
