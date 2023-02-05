import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import checkLoginToken from "./hooks/checkLoginToken";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    loggedIn: false,
  });

  checkLoginToken(user, setUser);

  return (
    <main className="routes-main">
      <Routes>
        <Route
          path="/"
          element={
            user.loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            user.loggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login user={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user.loggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Register user={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/home"
          element={
            user.loggedIn ? (
              <Home user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route />
      </Routes>
    </main>
  );
}

export default App;
