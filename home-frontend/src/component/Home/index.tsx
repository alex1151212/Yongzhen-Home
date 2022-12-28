import axios from "axios";
import { useRef } from "react";
import {
  IoLockOpen,
  IoChatbubbleOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../enviroment/api";

function Home() {
  const navigate = useNavigate();

  const doorOpenMessageHandler = (status: string) => {
    switch (status) {
      case "success":
        toast.success("🦄 Open Success!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;
      case "error":
        toast.error("🦄 Open Error!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;
    }
  };

  const navRef = useRef<HTMLDivElement>(null);
  const mouseOverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.currentTarget.getAttribute("id")) {
      case "home":
        navRef.current?.style.setProperty("--trasition", "-140px");
        navRef.current?.style.setProperty("--marker-color", "#5da6ff");
        break;
      case "profile":
        navRef.current?.style.setProperty("--trasition", "-70px");
        navRef.current?.style.setProperty("--marker-color", "#ff0");
        break;
      case "open":
        navRef.current?.style.setProperty("--trasition", "0px");
        navRef.current?.style.setProperty("--marker-color", "#0f0");
        break;
      case "setting":
        navRef.current?.style.setProperty("--trasition", "70px");
        navRef.current?.style.setProperty("--marker-color", "#df2fff");
        break;
      case "message":
        navRef.current?.style.setProperty("--trasition", "140px");
        navRef.current?.style.setProperty("--marker-color", "#ff308f");
        break;
    }
  };
  const mouseClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.currentTarget.getAttribute("id")) {
      case "home":
        break;
      case "profile":
        navigate("/member");
        break;
      case "open":
        axios
          .get(api.doorOpen.url())
          .then(() => {
            doorOpenMessageHandler("success");
          })
          .catch(() => {
            doorOpenMessageHandler("error");
          });
        break;
      case "setting":
        break;
      case "message":
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
              id={"home"}
            >
              <IoHomeOutline />
            </div>
          </li>
          <li>
            <div
              className="icon"
              onMouseOver={mouseOverHandler}
              onClick={mouseClickHandler}
              id={"profile"}
            >
              <IoPersonOutline />
            </div>
          </li>
          <li>
            <div
              className="icon"
              onMouseOver={mouseOverHandler}
              onClick={mouseClickHandler}
              id={"open"}
            >
              <IoLockOpen />
            </div>
          </li>
          <li>
            <div
              className="icon"
              onMouseOver={mouseOverHandler}
              onClick={mouseClickHandler}
              id={"setting"}
            >
              <IoSettingsOutline />
            </div>
          </li>
          <li>
            <div
              className="icon"
              onMouseOver={mouseOverHandler}
              onClick={mouseClickHandler}
              id={"message"}
            >
              <IoChatbubbleOutline />
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

export default Home;
