import React from "react";
import FaceRecognition from "./FaceRecognition";
import ImageLinkForm from "./ImageLinkForm";
import NavBar from "./NavBar";

function Home({ user, setUser }) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

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

    fetch(`${apiUrl}/image`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        displayFaceBox(calculateFaceLocation(res));
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="home_main">
      <NavBar user={user} setUser={setUser} />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition
        imageUrl={imageUrl}
        box={box}
        setBox={setBox}
        setImageUrl={setImageUrl}
      />
    </main>
  );
}

export default Home;
