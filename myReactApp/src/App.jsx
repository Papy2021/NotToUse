import React, { Fragment, useState } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login";
import Crud from "./CRUD.jsx";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./Helper/Context.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState("");
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/actors" element={<Crud></Crud>}></Route>
        </Routes>
      </Fragment>
    </LoginContext.Provider>
  );
}
