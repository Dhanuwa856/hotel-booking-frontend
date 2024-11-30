import React from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import UserFeedbackPage from "../components/User/UserFeedback/UserFeedbackPage";
import Footer from "../components/Footer/Footer";
import CategoryCard from "../components/User/CategoryCard/CategoryCard";
import AboutUs from "../components/User/AboutUs/AboutUs";
import RoomCard from "../components/User/RoomCard/RoomCard";
import RoomCard2 from "../components/User/RoomCard/RoomCard2";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <Header />
      <AboutUs />
      <CategoryCard />
      <h2 className="text-4xl font-bold text-center text-[#021c2e] mb-2 mt-10">
        Explore Our Rooms
      </h2>
      <RoomCard2 />
      <Link to={"/rooms"}>
        <button className="bg-[#FF6F61] text-white mt-10 mb-4 py-4 px-5 font-bold capitalize rounded-md left-1/2 relative -translate-x-1/2 hover:bg-[#FF5E54]">
          Explore more
        </button>
      </Link>

      <UserFeedbackPage />
      <Footer />
    </>
  );
};
