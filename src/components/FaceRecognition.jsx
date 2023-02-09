import React from "react";
import "../styles/FaceRecognition.scss";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="face-recognition">
      <img
        id="input-image"
        src={imageUrl}
        height="auto"
        className="input-image"
      />
      {boxes.map((box, index) => {
        return (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default FaceRecognition;
