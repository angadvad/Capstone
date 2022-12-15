import React from "react";
import { AppRoutes } from "./routes/routes";
import Navbar from "./components/Navbar";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const App = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar></Navbar>
      <AppRoutes navigate={navigate}></AppRoutes>
    </div>
  );
};

export default App;

