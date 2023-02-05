import React from "react";
import "../styles/InputForm.scss";
import "../styles/tachyons.scss";

const InputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="">
      <div className="">
        <input onChange={onInputChange} type="text" className="" />
        <button onClick={onButtonSubmit} className="">
          Detect
        </button>
      </div>
    </div>
  );
};

export default InputForm;
