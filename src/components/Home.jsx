import React, { useState } from "react";
import FaceRecognition from "./FaceRecognition";
import InputForm from "./InputForm";
import NavBar from "./NavBar";
import apiUrl from "../apiUrl";

function Home({ user, setUser }) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

  const fetchBox = async (input) => {
    fetch(`${apiUrl}/image`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        input: input,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setBox(calculateBoundingBox({ res }));
        }
      })
      .catch((err) => console.log(err));
  };

  const calculateBoundingBox = async (data) => {
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

  const onInputChange = async (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = async () => {
    setImageUrl(input);
    await fetchBox(input);
  };

  return (
    <main className="home_main">
      <NavBar user={user} setUser={setUser} />
      <InputForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {imageUrl ? (
        <FaceRecognition imageUrl={imageUrl} box={box} setBox={setBox} />
      ) : (
        <div></div>
      )}
    </main>
  );
}

export default Home;
