import React, { useRef } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

export default function Login() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const againPassword = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    if (password.current.value !== againPassword.current.value) {
      alert("Password don't match! please enter again password.");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        alert("Sign Up Success");
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="RegisterPage">
      <div className="RegisterPageWrapper">
        <div className="RegisterPageWrapper__box">
          <form className="loginBox" onSubmit={handleClick}>
            <h1 style={{ color: "rgb(242, 24, 79)" }}>Register</h1>
            <div className="form-group">
              <input
                type="text"
                placeholder=" "
                className="loginInput"
                ref={username}
                required
              />
              <label htmlFor="email">Username:</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder=" "
                className="loginInput"
                ref={email}
                required
              />
              <label htmlFor="email">Email:</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder=" "
                className="loginInput"
                ref={password}
                required
                minLength="6"
              />
              <label htmlFor="email">Password:</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder=" "
                className="loginInput"
                ref={againPassword}
                required
              />
              <label htmlFor="email">Password Again:</label>
            </div>
            <button className="LoginBtn" type="submit">
              Register
            </button>

            <div className="link">
              <Link to="/changepass">
                <span className="loginForgot">Change password</span>
              </Link>
              <Link to="/login">
                <span className="RegisterBtn">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
