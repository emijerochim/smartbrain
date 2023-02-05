import React from "react";
import Logo from "../styles/brain.png";

function NavBar({ user, setUser }) {
  const onSignOut = () => {
    localStorage.removeItem("token");
    setUser({
      loggedIn: false,
    });
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
              <p>{user.loggedIn ? `Hi ${user.username}` : ""} </p>
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
