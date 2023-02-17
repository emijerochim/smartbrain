import React from "react";
import { Link } from "react-router-dom";
import apiUrl from "../apiUrl";
import NavBar from "./NavBar";
import "../styles/UserForm.scss";

const Register = ({ user, setUser }) => {
  const onUsernameChange = (event) => {
    setUser({ ...user, username: event.target.value });
  };
  const onEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const onPasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const onSubmitRegister = () => {
    fetch(`${apiUrl}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            password: data.user.password,
            loggedIn: true,
          });
          localStorage.setItem("user", data.user);
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      });
  };

  return (
    <div className="register">
      <NavBar user={user} setUser={setUser} />
      <article className="main-content">
        <main className="form-container register-container">
          <div className="form-content">
            <fieldset id="sign_up" className="form-fieldset">
              <legend className="form-legend">Register</legend>
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  onChange={onUsernameChange}
                  className="form-input"
                  type="text"
                  username="username"
                  id="username"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="form-input"
                  type="email"
                  username="email-address"
                  id="email-address"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  onChange={onPasswordChange}
                  className="form-input"
                  type="password"
                  username="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="form-button-container">
              <button
                onClick={onSubmitRegister}
                className="form-submit-button"
                type="submit"
                value="Register"
              >
                Submit
              </button>
            </div>

            <div className="link-container">
              <Link to="/login" className="link">
                Log In
              </Link>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Register;
