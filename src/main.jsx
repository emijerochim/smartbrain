import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <App />
  </HashRouter>
);
