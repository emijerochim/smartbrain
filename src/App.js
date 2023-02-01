import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import apiUrl from "./apiUrl";
import bcrypt from "bcryptjs";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    loggedIn: false,
  });

  const loadUser = (data) => {
    setUser({
      id: data.user.id,
      username: data.user.name,
      email: data.user.email,
      password: data.user.password,
      loggedIn: true,
    });
    localStorage.setItem("token", data.token);
  };

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token) {
      fetch(`${apiUrl}/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user.id) {
            loadUser(data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
              <Login setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user.loggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Register setUser={setUser} />
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
