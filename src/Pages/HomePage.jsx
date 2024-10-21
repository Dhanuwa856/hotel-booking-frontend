import React from "react";
import Header from "../components/Header/Header";
import ExploreRooms from "../components/ExploreRooms/ExploreRooms";
import NavBar from "../components/NavBar/NavBar";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <Header />
      <ExploreRooms />
    </>
  );
};
