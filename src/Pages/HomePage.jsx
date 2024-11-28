import React from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import UserFeedbackPage from "../components/User/UserFeedback/UserFeedbackPage";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <Header />
      <UserFeedbackPage />
    </>
  );
};
