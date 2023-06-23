import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <BrowserRouter>
        <div className="bGroundColor">
          <App />
        </div>
    </BrowserRouter>
  </StrictMode>
);

