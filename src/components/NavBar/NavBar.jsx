import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "../NavLink/NavLink";
import { MdLogout } from "react-icons/md";
import decodeToken from "../decodeToken";
import { LuLogIn } from "react-icons/lu";
import { ImUserPlus } from "react-icons/im";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CgLoadbarDoc } from "react-icons/cg";

function NavBar() {
  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user token exists in localStorage
    const token = localStorage.getItem("userToken");
    setLoading(true);

    if (token) {
      try {
        // Decode token to get user information (Assuming JWT format)
        const userData = decodeToken(token);
        setUser(userData);
        if (userData.type === "admin") {
          navigate("/admin");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Error decoding token:", err);
        // Remove the invalid token from storage and redirect to login if needed
        localStorage.removeItem("userToken");
        navigate("/login"); // Redirect to login page
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    // Ask for logout confirmation
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      localStorage.removeItem("userToken"); // Remove token on logout
      setUser(null);
      toast.success("You have been logged out successfully.");
      navigate("/"); // Redirect to home after logout
    }
    // If the user cancels, do nothing and stay on the same page
  };

  const handleUserInfo = () => {
    if (!showUserInfo) {
      setShowUserInfo(true);
    } else {
      setShowUserInfo(false);
    }
  };
  const handleCloseUserInfo = () => {
    setShowUserInfo(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-[#E3F2FD] px-5 py-4 shadow-xl">
        <div>
          <Link to="/">
            <img
              src="https://placehold.co/200x50"
              alt="Hotel Logo"
              className="w-[200px] h-[50px] cursor-pointer"
            />
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-[#607D8B]">
          <NavLinks link_url="/" link_name="Home" />
          <NavLinks link_url="/rooms" link_name="Rooms" />
          <NavLinks link_url="/offers" link_name="Offers" />
          <NavLinks link_url="/gallery" link_name="Gallery" />
          <NavLinks link_url="/about-us" link_name="About Us" />
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            // Show user info if logged in
            <div className="relative ">
              <button onClick={handleUserInfo}>
                <img
                  src={user.image}
                  alt="User Image"
                  className="w-[50px] h-[50px] rounded-[50%] cursor-pointer object-cover object-top"
                />
              </button>

              {/* <span className="text-[#607D8B] text-lg font-bold cursor-pointer hover:text-[#FF6F61] delay-75 capitalize">
                  {user.firstName}
                </span> */}

              {showUserInfo ? (
                <div className="bg-[#021c2e]  w-[350px] h-[400px] absolute z-[100] right-0 rounded-md shadow-xl flex flex-col items-center">
                  <button
                    className="absolute text-white text-2xl right-3 top-2 hover:text-white/80 delay-75 w-[40px] h-[40px] rounded-[50%] hover:bg-gray-600 flex items-center justify-center"
                    onClick={handleCloseUserInfo}
                  >
                    <IoClose />
                  </button>
                  <h4
                    name="email"
                    className="text-center mt-5 text-white font-medium"
                  >
                    {user.email}
                  </h4>
                  <img
                    src={user.image}
                    alt={`${user.firstName} Profile Image`}
                    className="w-[100px] h-[100px] object-cover object-top rounded-full mx-auto mt-5"
                  />
                  <h2 className="text-white text-center text-xl mt-2 font-medium">
                    Hi, {user.firstName}!
                  </h2>
                  <button className="px-10 py-2 border border-gray-400 rounded-[70px] text-white mt-3 w-[80%] text-sm capitalize hover:bg-white/5 transition delay-75 flex items-center justify-center gap-2 ">
                    <FaUserEdit /> Manage User Account
                  </button>
                  <button className="px-10 py-2 border border-gray-400 rounded-[70px] text-white mt-3 w-[80%] text-sm capitalize hover:bg-white/5 transition delay-75 flex items-center justify-center gap-2">
                    <CgLoadbarDoc /> your bookings
                  </button>
                  <button className="px-10 py-2 border border-gray-400 rounded-[70px] text-white mt-3 w-[80%] text-sm capitalize hover:bg-white/5 transition delay-75 flex items-center gap-2 justify-center">
                    <IoMdSettings /> settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 rounded-[70px] px-4 py-1 flex items-center text-white gap-1 uppercase font-medium text-[12px] shadow-md absolute bottom-2 right-2"
                  >
                    Log Out <MdLogout />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            // Show Login/Sign Up if not logged in
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="font-semibold cursor-pointer"
                title="Login"
              >
                <button className="bg-blue-500 text-white px-5 py-2 rounded-[70px] hover:bg-blue-400 shadow-md delay-75 flex items-center gap-1 uppercase text-sm">
                  <LuLogIn /> Login
                </button>
              </Link>
              <Link to="/signup" className="font-medium cursor-pointer">
                <button className="bg-blue-500 text-white px-5 py-2 rounded-[70px] hover:bg-blue-400 shadow-md delay-75 flex items-center gap-1 uppercase text-sm">
                  <ImUserPlus /> Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
