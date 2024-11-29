import React from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import UserFeedbackPage from "../components/User/UserFeedback/UserFeedbackPage";
import Footer from "../components/Footer/Footer";
import CategoryCard from "../components/User/CategoryCard/CategoryCard";
import AboutUs from "../components/User/AboutUs/AboutUs";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <Header />
      <AboutUs />
      <CategoryCard />
      <UserFeedbackPage />
      <Footer />
    </>
  );
};
