import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";



export default function Layout(){
    return (
        <Fragment>
          <Navbar/>
               <Outlet></Outlet>
        </Fragment>
     
    )
}