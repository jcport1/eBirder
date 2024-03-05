import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
