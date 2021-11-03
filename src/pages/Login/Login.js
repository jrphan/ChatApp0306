import React, { useContext, useRef } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Spin from "react-cssfx-loading/lib/Spin";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { isFecthing, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    const formData = {
      email: email.current.value,
      password: password.current.value,
    };

    const login = async (formData, dispatch) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", formData);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        alert("User not found or Wrong password");
      }
    };

    login(formData, dispatch);
  };
  return (
    <div className="LoginPage">
      <div className="LoginPageWrapper">
        <div className="LoginPageWrapper__box">
          <form className="loginBox" onSubmit={handleClick}>
            <h1 style={{ color: "rgb(242, 24, 79)" }}>Login</h1>
            <div className="form-group">
              <input
                type="email"
                placeholder=" "
                className="loginInput"
                required
                ref={email}
              />
              <label htmlFor="email">Email:</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder=" "
                className="loginInput"
                required
                minLength="6"
                ref={password}
              />
              <label htmlFor="email">Password:</label>
            </div>
            <button
              className={isFecthing ? "LoginBtn fecthing" : "LoginBtn"}
              type="submit"
            >
              {isFecthing ? (
                <Spin
                  color="#ffffff"
                  width="10px"
                  height="10px"
                  duration="0.5s"
                />
              ) : (
                "Login"
              )}
            </button>

            <div className="link">
              <Link to="/changepass">
                <span className="loginForgot">Change password</span>
              </Link>
              <Link to="/register">
                <span className="RegisterBtn">Create a New Account</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
