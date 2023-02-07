import React, { useState } from "react";
import FaceRecognition from "./FaceRecognition";
import InputForm from "./InputForm";
import NavBar from "./NavBar";
import apiUrl from "../apiUrl";

function Home({ user, setUser }) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({
    leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
  });

  const fetchBox = async (input) => {
    await fetch(`${apiUrl}/image`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        input: input,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          calculateBoundingBox(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const calculateBoundingBox = async (data) => {
    const box = await data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("box: ", box);
    console.log("width: ", width, "height: ", height);
    setBox({
      leftCol: box.left_col * width,
      topRow: box.top_row * height,
      rightCol: width - box.right_col * width,
      bottomRow: height - box.bottom_row * height,
    });
  };

  const onInputChange = (event) => {
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
