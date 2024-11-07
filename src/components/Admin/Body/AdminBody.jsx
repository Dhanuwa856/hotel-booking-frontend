import React from "react";
import {
  FaHome,
  FaClipboardList,
  FaThList,
  FaBed,
  FaUser,
  FaCommentDots,
  FaImages,
} from "react-icons/fa"; // Import relevant icons
import AdminLink from "../Link/AdminLink";
import { Route, Routes } from "react-router-dom";
import { AdminHome } from "../Home/AdminHome";
import AdminBookings from "../Bookings/AdminBookings";
import AdminFeedback from "../Feedback/AdminFeedback";
import AdminCategories from "../Categories/AdminCategories";
import AdminUsers from "../Users/AdminUsers";
import AdminRooms from "../Rooms/AdminRooms";
import AddCategories from "../AddCategories/AddCategories";
import AdminGallery from "../Gallery/AdminGallery";
import UpdateCategories from "../UpdateCategories/UpdateCategories";
import AddGallery from "../AddGallery/AddGallery";

function AdminBody() {
  return (
    <div className="w-full flex max-h-screen">
      {/* Sidebar */}
      <div className="w-[20%] flex flex-col gap-8 bg-[#607D8B] h-full p-6">
        <AdminLink link_name="Home" link_url="/admin/" icon={<FaHome />} />
        <AdminLink
          link_name="Bookings"
          link_url="/admin/bookings"
          icon={<FaClipboardList />}
        />
        <AdminLink
          link_name="Categories"
          link_url="/admin/categories"
          icon={<FaThList />}
        />
        <AdminLink link_name="Rooms" link_url="/admin/rooms" icon={<FaBed />} />
        <AdminLink
          link_name="Users"
          link_url="/admin/users"
          icon={<FaUser />}
        />
        <AdminLink
          link_name="Feedback"
          link_url="/admin/feedback"
          icon={<FaCommentDots />}
        />
        <AdminLink
          link_name="Gallery Item"
          link_url="/admin/gallery"
          icon={<FaImages />}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#F1F5F9] p-6 overflow-scroll w-[75%] ">
        <Routes path="/*">
          <Route path="/" element={<AdminHome />} />
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/feedback" element={<AdminFeedback />} />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/rooms" element={<AdminRooms />} />
          <Route path="/gallery" element={<AdminGallery />} />
          <Route path="/add-gallery" element={<AddGallery />} />
          <Route path="/add-categories" element={<AddCategories />} />
          <Route path="/update-categories" element={<UpdateCategories />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminBody;
