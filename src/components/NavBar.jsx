import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "../styles/brain.png";

function NavBar({ user, setUser }) {
  const onSignOut = () => {
    localStorage.removeItem("token");
    setUser({});
  };

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
              <button className="nav_link" onClick={onSignOut}>
                Sign Out
              </button>
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

export default NavBar;
