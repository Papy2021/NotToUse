import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav container">
      <NavLink to="/">
        <img src="/src/images/PKT_8373.JPG" className="img" />
      </NavLink>

      <div className="nav-items">
        <NavLink
          to="."
          className={({ isActive }) => (isActive ? "navItemActive" : "link")}
        >
          Home
        </NavLink>
        <NavLink to="about" className={({ isActive }) => (isActive ? "navItemActive" : "link")}>
          About
        </NavLink>
        <NavLink to="register"     className={({ isActive }) => (isActive ? "navItemActive" : "link")}>
          Register
        </NavLink>
      </div>
    </nav>
  );
}
