import React from "react";
import { Link } from "react-router-dom";
import apiUrl from "../apiUrl";
import NavBar from "./NavBar";
import "../styles/UserForm.scss";

const Login = ({ user, setUser }) => {
  const onEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const onPasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const onSubmitLogin = () => {
    fetch(`${apiUrl}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="wrapper">
      <NavBar user={user} setUser={setUser} />
      <article className="main-content">
        <main className="form-container">
          <div className="form-content">
            <fieldset className="form-fieldset" id="sign_up">
              <legend className="form-legend">Log In</legend>
              <div className="form-group">
                <label className="form-label" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="form-input"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  className="form-input"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="form-button-container">
              <button
                onClick={onSubmitLogin}
                className="form-submit-button"
                type="submit"
                value="Log In"
              >
                Enter
              </button>
            </div>
            <div className="link-container">
              <Link to="/register" className="link">
                Register
              </Link>
            </div>
          </div>
        </main>
        <div className="test-login-data-container">
          <p className="test-login-data">
            If you want to test the app use these credentials
          </p>
          <p className="test-login-data">Email: test@gmail.com</p>
          <p className="test-login-data">Password: Test1234</p>
        </div>
      </article>
    </div>
  );
};

export default Login;
