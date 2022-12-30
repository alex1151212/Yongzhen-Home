import { useRef } from "react";
import {
  IoArrowUndoOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Member() {
  const navigate = useNavigate();

  const navRef = useRef<HTMLDivElement>(null);
  const mouseOverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.currentTarget.getAttribute("id")) {
      case "back":
        navRef.current?.style.setProperty("--trasition", `${-350 / 3}px`);
        navRef.current?.style.setProperty("--marker-color", "#5da6ff");
        break;
      case "login":
        navRef.current?.style.setProperty("--trasition", "0px");
        navRef.current?.style.setProperty("--marker-color", "#ff0");
        break;
      case "logout":
        navRef.current?.style.setProperty("--trasition", `${350 / 3}px`);
        navRef.current?.style.setProperty("--marker-color", "#0f0");
        break;
      // case "setting":
      //   navRef.current?.style.setProperty("--trasition", "70px");
      //   navRef.current?.style.setProperty("--marker-color", "#df2fff");
      //   break;
      // case "message":
      //   navRef.current?.style.setProperty("--trasition", "140px");
      //   navRef.current?.style.setProperty("--marker-color", "#ff308f");
      //   break;
    }
  };

  const mouseClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.currentTarget.getAttribute("id")) {
      case "back":
        navigate("/");
        break;
      case "login":
        navigate("/login");
        break;
      case "logout":
        toast.success("🦄 Login Success!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
        break;
    }
  };

  return (
    <div className="home">
      <div id="marker" className="home-nav-bar-wrapper" ref={navRef}>
        <ul>
          <li>
            <div
              className={`icon`}
              onMouseOver={mouseOverHandler}
              onClick={mouseClickHandler}
              id={"back"}
            >
              <IoArrowUndoOutline />
            </div>
          </li>
          <li>
            <div
              className={`icon`}
              onMouseOver={mouseOverHandler}
              onClick={mouseClickHandler}
              id={"login"}
            >
              <IoPersonOutline />
            </div>
          </li>
          <li>
            <div
              className="icon"
              onMouseOver={mouseOverHandler}
              onClick={mouseClickHandler}
              id={"logout"}
            >
              <IoLogOutOutline />
            </div>
          </li>
        </ul>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Member;
