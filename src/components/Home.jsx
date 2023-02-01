import React from "react";
import FaceRecognition from "./FaceRecognition";
import ImageLinkForm from "./ImageLinkForm";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Home({
  user,
  onInputChange,
  onButtonSubmit,
  imageUrl,
  setImageUrl,
  box,
  setBox,
}) {
  return (
    <main className="home_main">
      <Logo />
      <Navigation user={user} />
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
