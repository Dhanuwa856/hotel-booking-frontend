import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes path="/*">
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
