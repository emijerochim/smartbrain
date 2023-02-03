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
      <div className="nav__divst">
        <div className="nav__item">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div className="nav__item">
          <div className="nav__item logged_nav">
            <div className="nav__item">
              <p>{user ? `Hi ${user.username}` : ""}, </p>
            </div>
            <div className="nav__item">
              <button className="nav_divnk" onCdivck={onSignOut}>
                Sign Out
              </button>
            </div>
          </div>
          <div className="nav__item logged_nav">
            <div className="nav__item">Login</div>
            <div className="nav__item">Register</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
