import React, { useContext, useLayoutEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { AppContext } from "../context/ParentContext";
import { ToastContainer, toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  useLayoutEffect(() => {
    const UserData = localStorage.getItem("UserData");
    if (UserData) {
      setIsLoggedIn(true);
    }
  }, []);

  const logOutHandle = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("UserData");
    toast.success("Log out Successful!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="navbar">
        <Link className="navbar-link" to={"/"}>
          <h1 className="logo">
            <img
              src="https://kalvium.community/images/sidebar-3d-logo.svg"
              alt="Kalvium Books Logo"
            />
            KALVIUM BOOKS
          </h1>
        </Link>

        <div id="registration-div">
          {isLoggedIn ? (
            <button id="log-out-btn" onClick={logOutHandle}>
              Log Out
            </button>
          ) : (
            <Link to={"/SignUp"}>
              <button id="registration-btn">Register</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
