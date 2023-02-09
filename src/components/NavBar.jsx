import React from "react";
import Logo from "../styles/brain.png";
import "../styles/NavBar.scss";

const NavBar = ({ user, setUser }) => {
  const onSignOut = () => {
    localStorage.removeItem("token");
    setUser({
      loggedIn: false,
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div className="navbar-username">
          {user.loggedIn ? (
            <p className="username-text">
              Hi {user.username}👋 paste your URL and detect faces 🧠
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="navbar-sign-out">
          {user.loggedIn ? (
            <button onClick={onSignOut} className="sign-out-button">
              Sign Out
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
