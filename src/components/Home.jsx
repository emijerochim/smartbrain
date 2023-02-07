import React, { useState } from "react";
import FaceRecognition from "./FaceRecognition";
import InputForm from "./InputForm";
import NavBar from "./NavBar";
import apiUrl from "../apiUrl";

function Home({ user, setUser }) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);

  const fetchBoxes = async (input) => {
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
          calculateBoundingBoxes(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const calculateBoundingBoxes = async (data) => {
    const boxes = data.outputs[0].data.regions;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    const boundingBoxes = boxes.map((box) => {
      const boundingBox = box.region_info.bounding_box;
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - boundingBox.right_col * width,
        bottomRow: height - boundingBox.bottom_row * height,
      };
    });
    setBoxes(boundingBoxes);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = async () => {
    setImageUrl(input);
    await fetchBoxes(input);
  };

  return (
    <main className="home_main">
      <NavBar user={user} setUser={setUser} />
      <InputForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
    </main>
  );
}

export default Home;
