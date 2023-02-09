import React from "react";
import "../styles/InputForm.scss";

const InputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="text-input-container">
      <input onChange={onInputChange} type="text" className="text-input" />
      <button onClick={onButtonSubmit} className="text-button">
        Detect URL
      </button>
    </div>
  );
};

export default InputForm;
