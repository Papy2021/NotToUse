import React, { Fragment, useState } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login";
import Crud from "./CRUD.jsx";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./Helper/Context.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState("Hi Papy");
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/actor" element={<Crud></Crud>}></Route>
        </Routes>
      </Fragment>
    </LoginContext.Provider>
  );
}
