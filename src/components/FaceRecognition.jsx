import React from "react";
import "../styles/FaceRecognition.scss";
import "../styles/tachyons.scss";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="input-image"
          src={imageUrl}
          width="500px"
          height="auto"
          alt="asd"
        />
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
    </div>
  );
};

export default FaceRecognition;
