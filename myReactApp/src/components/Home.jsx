import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// import MyImage from "../images/PKT_8373.JPG"

export default function Home() {
  return (
    <div>
      <div className="container  text-center mt-5 p-5">
        <h1 className="mt-5 text-bg-success radiusMode ">
          Welcome To The Film World
        </h1>
        <br></br>
        <p className="text-primary font-weight-bold">
          Got an account with us?
          <Link to="/login"> Please Login</Link>
        </p>

        <p className="text-danger font-weight-bold">
          Don't have an account yet?<Link to="/register"> Please Register</Link>
        </p>
      </div>
    </div>
  );
}
