import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import UserGallery from "./components/User/UserGallery/UserGallery";
import UserInfoUpdate from "./components/User/UserInfoUpdate/UserInfoUpdate";
import UserGalleryItem from "./components/User/UserGalleryItem/UserGalleryItem";
import UserRooms from "./components/User/UserRooms/UserRooms";
import UserBookingPage from "./components/User/UserBookingPage/UserBookingPage";
import CustomerBookingPage from "./components/User/CustomerBookingPage/CustomerBookingPage";
import UserRoomPage from "./components/User/UserRoomPage/UserRoomPage";
import VerifyEmail from "./components/VerificationPage/VerificationPage";
import CategoryPage from "./components/User/CategoryPage/CategoryPage";

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" />
      <Routes path="/*">
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verify" element={<VerifyEmail />} />
        <Route path="/gallery" element={<UserGallery />} />
        <Route path="/gallery/gallery-item" element={<UserGalleryItem />} />
        <Route path="/rooms" element={<UserRoomPage />} />
        <Route path="/rooms/booking" element={<UserBookingPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/customer-booking" element={<CustomerBookingPage />} />
        <Route path="/user-update" element={<UserInfoUpdate />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default App;
