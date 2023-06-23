import React, { Fragment, useState } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login";
import Crud from "./CRUD.jsx";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./Helper/Context.jsx";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import About from "./components/About.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState("");
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Fragment>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>

            <Route path="register" element={<Register />}></Route>
            <Route path="actors" element={<Crud />}></Route>
          </Route>
        </Routes>
      </Fragment>
    </LoginContext.Provider>
  );
}
