import React from "react";
import { Link } from "react-router-dom";
import Logo from "../styles/brain.png";

function NavBar({ user, setUser }) {
  const onSignOut = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  return (
    <nav>
      <div>
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div>
          <div>
            <div>
              <p>{user ? `Hi ${user.username}` : ""}, </p>
            </div>
            <div>
              <button onClick={onSignOut}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
