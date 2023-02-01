import React from "react";
import "../styles/ImageLinkForm.scss";
import "../styles/tachyons.scss";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {
          "This Magic Brain 🧠 will detect faces in your pictures. Give it a try!"
        }
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            onChange={onInputChange}
            type="text"
            className="f4 pa2 w-70 center"
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
