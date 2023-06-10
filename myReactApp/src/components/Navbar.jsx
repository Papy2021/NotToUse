import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav container">
        <img src="/src/images/PKT_8373.JPG" className="img"></img>
   <div className="nav-items">
        <Link to="/" className="link">Home</Link>
      <Link to="/" className="link">About</Link>
      <Link to="/register" className="link">Register</Link>
   </div>
    </nav>
  );
}
