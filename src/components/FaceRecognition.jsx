import React from "react";
import "../styles/FaceRecognition.scss";
import "../styles/tachyons.scss";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="face-recognition">
      <img id="input-image" src={imageUrl} height="auto" />
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRecognition;
