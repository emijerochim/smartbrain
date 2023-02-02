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
          <img src={Logo} alt="logo" className="logo" />
        </li>
        <li className="nav__item">
          <ul className="nav__item logged_nav">
            <li className="nav__item">
              <p>Hi {user ? user.username : ""}, </p>
            </li>
            <li className="nav__item">
              <button className="nav_link" onClick={onSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
          :
          <ul className="nav__item logged_nav">
            <li className="nav__item">Login</li>
            <li className="nav__item">Register</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
