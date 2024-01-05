import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ParentContext";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const passwordValue = watch("password", "");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AppContext);

  const passwordShow = () => {
    setShowPassword(!showPassword);
  };

  const formSubmitHandler = (data) => {
    toast.success("Registration Complete", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setIsLoggedIn(true);

    const UserData = {
      Name: getValues("Name"),
      Email: getValues("email"),
      Password: getValues("password"),
      ConfirmPassword: getValues("confirmPassword"),
    };

    localStorage.setItem("UserData", JSON.stringify(UserData));

    setTimeout(() => {
      navigate("/");
    }, 2000);
    // console.log("data:", data);
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <video
        autoPlay
        loop
        muted
        src="https://media.istockphoto.com/id/474982168/video/magic-book-with-animation-glowing-letters.mp4?s=mp4-640x640-is&k=20&c=-KvJwp-O1Rj2un3R2cBc5qevpvCXTjqcvtT-lApqjdg="
      ></video>
      <fieldset>
        <div className="form">
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <label>
              Name
              <input
                className="form-input"
                type="text"
                name="Name"
                autoComplete="none"
                {...register("Name", {
                  required: "Please enter Name",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name should not exceed 30 characters",
                  },
                })}
              />
            </label>
            {<p className="err">{errors.Name?.message}</p>}

            <label>
              Email Address
              <input
                className="form-input"
                type="text"
                name="email"
                autoComplete="none"
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </label>
            {<p className="err">{errors.email?.message}</p>}
            <label>
              Password
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: "Please enter Password",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters required",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character ",
                  },
                })}
              />
            </label>
            {<p className="err">{errors.password?.message}</p>}

            <label>
              Confirm Password
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please Confirm your Password",
                  validate: (value) =>
                    value === passwordValue || "Password doesn't match",
                })}
              />
            </label>
            {<p className="err">{errors.confirmPassword?.message}</p>}

            <label style={{ display: "flex" }}>
              <input
                type="checkbox"
                style={{ width: "0.85rem", margin: "0 1rem" }}
                onClick={passwordShow}
              />
              <h2>Show Password</h2>
            </label>

            <div className="button">
              <input type="submit" value="Sign Up" />
              <button
                id="reset-btn"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default RegistrationForm;
