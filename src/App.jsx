import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <>
      <Routes path="/*">
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default App;
