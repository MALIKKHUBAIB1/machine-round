import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/store/usercontext";

function LocalStorage() {
  const getTheme = localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme"))
    : "white";
  const [theme, setTheme] = useState(getTheme);
  const { token } = useContext(AuthContext);
  console.log(token);
  const toogleHandler = () => {
    const newTheme = theme === "black" ? "white" : "black";
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme;
    document.body.style.color = theme === "black" ? "white" : "black";
  }, [theme]);

  return (
    <div>
      <h1 className="text-4xl">Toogle/Dark/Light</h1>
      <button
        className={` p-2 m-2 border border-${
          theme === "white" ? "black" : "white"
        }  w-24 rounded-md my-7`}
        onClick={toogleHandler}
      >
        {theme ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default LocalStorage;
