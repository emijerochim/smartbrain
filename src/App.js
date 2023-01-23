import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import apiUrl from "./apiUrl";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    loggedIn: false,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [input, setInput] = useState("");

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox({ box });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch(`http://www.${apiUrl}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          fetch(`http:www.//${apiUrl}/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .catch((err) => console.log(err));
        }
        displayFaceBox(calculateFaceLocation(res));
      })
      .catch((err) => console.log(err));
  };

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
              <Home
                user={user}
                setUser={setUser}
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                box={box}
                setBox={setBox}
              />
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
