import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/style.css";
import App from "./App";



// ReactDOM.render(<MainProfiles />, document.getElementById("root"));

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
 

// console.log("HI)
