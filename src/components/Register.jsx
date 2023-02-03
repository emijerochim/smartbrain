import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiUrl from "../apiUrl";
import NavBar from "./NavBar";

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
        if (data.user.id) {
          setUser({
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            password: data.user.password,
            loggedIn: true,
          });
        }
      });
  };

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="username">
                  username
                </label>
                <input
                  onChange={onUsernameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  username="username"
                  id="username"
                />
              </div>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  username="email-address"
                  id="email-address"
                />
              </div>

              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  username="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div>
              <input
                onClick={onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer"
                type="submit"
                value="Register"
              />
            </div>
          </div>

          <div className="login-link-container">
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Register;
