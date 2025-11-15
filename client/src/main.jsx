import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import MainRouter from "./MainRouter.jsx";
import "./index.css"; // ok if you don't have this; remove the line if not

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <MainRouter />
    </HashRouter>
  </React.StrictMode>
);
