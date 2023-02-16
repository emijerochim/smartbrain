import React from "react";
import "../styles/InputForm.scss";

const InputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="input-form-container">
      <div className="input-form-header">
        <h1 className="input-form-title">Smart Brain 🧠</h1>
        <p className="input-form-description">
          Enter a URL of an image and an AI 🤖
          <br></br> will detect the faces in it
        </p>
      </div>
      <div className="input-form-body">
        <input onChange={onInputChange} type="text" className="input-form" />
        <button onClick={onButtonSubmit} className="text-button">
          Detect URL
        </button>
      </div>
    </div>
  );
};

export default InputForm;
