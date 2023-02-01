import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "./Logo";

function Navigation({ user }) {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Navigate to="/" className="nav_link">
            <Logo />
          </Navigate>
        </li>
        <li className="nav__item">
          user.loggedIn ?
          <ul className="nav__item logged_nav">
            <li className="nav__item">
              <p>Hi {user.username}, </p>
            </li>
            <li className="nav__item">
              <Navigate to="/signout" className="nav_link">
                Sign Out
              </Navigate>
            </li>
          </ul>
          :
          <ul className="nav__item logged_nav">
            <li className="nav__item">
              <Navigate to="/login" className="nav_link">
                Login
              </Navigate>
            </li>
            <li className="nav__item">
              <Navigate to="/register" className="nav_link">
                Register
              </Navigate>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
