import { Outlet } from "react-router-dom";
import Header from "./Header";
import Protectedroutes from "./Component/Protectedroutes";

function Root() {
  return (
    <div>
      <Header />
      <Protectedroutes>
        <Outlet />
      </Protectedroutes>
      {/* Only render Outlet if the token is present */}
    </div>
  );
}

export default Root;
