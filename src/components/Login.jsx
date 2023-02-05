import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import apiUrl from "../apiUrl";
import "../styles/Login.scss";

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
    <div>
      <NavBar user={user} setUser={setUser} />
      <article className="">
        <main className="">
          <div className="">
            <fieldset id="sign_up" className="">
              <legend className="">Log In</legend>
              <div className="">
                <label className="" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className=""
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="">
                <label className="" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  className=""
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div>
              <button
                onClick={onSubmitLogin}
                className=""
                type="submit"
                value="Log In"
              />
            </div>
            <div className="">
              <div className="register-link-container">
                <Link to="/register" className="register-link">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Login;
