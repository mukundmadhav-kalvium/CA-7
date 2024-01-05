import React, { useContext, useLayoutEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { AppContext } from "../context/ParentContext";
import { ToastContainer, toast } from "react-toastify";

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
      <div
        className="navbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "10vh",
          background: "#F1F0CC",
          padding: "10px 20px",
        }}
      >
        <Link
          to={"/"}
          style={{ color: "black", textDecoration: "none", fontWeight: "900" }}
        >
          <h1
            className="logo"
            style={{
              textAlign: "center",
              color: "#EF3837",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://kalvium.community/images/sidebar-3d-logo.svg"
              alt="Kalvium Books Logo"
            />
            KALVIUM BOOKS
          </h1>
        </Link>

        <div
          id="registration-div"
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "10px",
          }}
        >
          {isLoggedIn ? (
            <button id="log-out-btn" onClick={logOutHandle}>
              Log Out
            </button>
          ) : (
            <Link to={"/SignUp"}>
              <button
                id="registration-btn"
                style={{
                  padding: "10px",
                  width: "150px",
                  border: "3px solid black",
                  color: "red",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
