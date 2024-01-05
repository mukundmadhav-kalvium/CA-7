import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ParentContext from "./context/ParentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ParentContext>
      <App />
    </ParentContext>
  </BrowserRouter>
);
