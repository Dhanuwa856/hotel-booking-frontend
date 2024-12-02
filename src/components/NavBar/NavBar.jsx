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
import Swal from "sweetalert2";
import { RiMenu2Fill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";

function NavBar() {
  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setLoading(true);

    if (token) {
      try {
        const userData = decodeToken(token);
        setUser(userData);
        if (userData.type === "admin") {
          navigate("/admin");
          return;
        }
        setLoading(false);
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("userToken");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRating");
        localStorage.removeItem("userComment");
        setUser(null);
        toast.success("You have been logged out successfully.", {
          duration: 3000,
          position: "top-right",
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="md:sticky md:top-0 z-[100] md:w-full">
      <div className="flex items-center justify-between  bg-[#E3F2FD] px-5 py-2 shadow-xl">
        <div>
          <Link to="/">
            <img
              src="https://placehold.co/60x60"
              alt="Hotel Logo"
              className="w-[60px] h-[60px] cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            showMobileMenu
              ? "fixed top-0 right-0 w-[70%] h-full bg-white z-50 shadow-lg transition-transform transform translate-x-0 md:border-0"
              : "fixed top-0 right-0 w-[70%] h-full  z-50 transition-transform transform translate-x-full"
          } md:static md:flex md:w-auto md:h-auto md:translate-x-0 items-center gap-4 text-[#607D8B]`}
        >
          <button
            className="absolute top-5 right-5 md:hidden text-2xl text-red-600"
            onClick={toggleMobileMenu}
          >
            <IoClose />
          </button>
          <div className="flex flex-col md:flex-row gap-6 p-6 mt-10 md:mt-0 md:p-0">
            <NavLinks link_url="/" link_name="Home" />
            <NavLinks link_url="/rooms" link_name="Rooms" />
            <NavLinks link_url="/category" link_name="Category" />
            <NavLinks link_url="/gallery" link_name="Gallery" />
            <NavLinks link_url="/contact" link_name="Contact Us" />
          </div>
        </nav>

        <div className="flex items-center gap-3 ">
          {user ? (
            <div className="relative">
              <button onClick={() => setShowUserInfo(!showUserInfo)}>
                <img
                  src={user.image}
                  alt="User Image"
                  className="w-[50px] h-[50px] rounded-[50%] cursor-pointer object-cover object-top"
                />
              </button>
              {showUserInfo && (
                <div className="bg-[#021c2e] w-[250px] md:w-[350px] h-[400px] absolute z-[100] md:right-0 left-1/2 md:left-0 md:-translate-x-[90%] -translate-x-[45%] rounded-md shadow-xl flex flex-col items-center">
                  <button
                    className="absolute text-white text-2xl right-3 top-2 hover:text-white/80 delay-75 w-[40px] h-[40px] rounded-[50%] hover:bg-gray-600 flex items-center justify-center"
                    onClick={() => setShowUserInfo(false)}
                  >
                    <IoClose />
                  </button>
                  <h4
                    name="email"
                    className="text-center md:mt-5 mt-10 text-sm md:text-base text-white font-medium flex items-center gap-1 justify-center"
                  >
                    {user.email}
                    {user.emailVerified ? (
                      <MdVerified
                        className="text-blue-500 hover:text-blue-600 cursor-pointer"
                        title="A verified email."
                      />
                    ) : (
                      ""
                    )}
                  </h4>
                  <img
                    src={user.image}
                    alt={`${user.firstName} Profile Image`}
                    className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] object-cover object-top rounded-full mx-auto mt-5"
                  />
                  <h2 className="text-white text-center text-sm md:text-xl mt-2 font-medium">
                    Hi, {user.firstName}!
                  </h2>
                  <Link
                    to={"/user-update"}
                    state={user}
                    className="px-10 py-2 border border-gray-400 rounded-[70px] text-white mt-3 w-[80%] md:text-sm capitalize hover:bg-white/5 transition delay-75 flex items-center justify-center gap-2 text-[12px] whitespace-nowrap "
                  >
                    <FaUserEdit /> Manage User Account
                  </Link>
                  <Link
                    to={"/customer-booking"}
                    className="px-10 py-2 border border-gray-400 rounded-[70px] text-white mt-3 w-[80%] md:text-sm capitalize hover:bg-white/5 transition delay-75 flex items-center justify-center gap-2 text-[12px]"
                  >
                    <CgLoadbarDoc /> your bookings
                  </Link>
                  <button className="px-10 py-2 border border-gray-400 rounded-[70px] text-white mt-3 w-[80%] md:text-sm capitalize hover:bg-white/5 transition delay-75 flex items-center gap-2 justify-center text-[12px]">
                    <IoMdSettings /> settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 rounded-[70px] px-4 py-1 items-center text-white gap-1 uppercase font-medium text-[12px] shadow-md absolute bottom-2 right-2 flex "
                  >
                    Log Out <MdLogout />
                  </button>
                </div>
              )}
            </div>
          ) : (
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
                <button className="bg-blue-500 text-white px-5 py-2 rounded-[70px] hover:bg-blue-400 shadow-md delay-75 md:flex hidden items-center gap-1 uppercase text-sm">
                  <ImUserPlus /> Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
        {/* Mobile Menu Toggle Button */}
        <button
          className="block md:hidden text-[#607D8B]"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? (
            <IoClose size={28} />
          ) : (
            <RiMenu2Fill size={30} fill="#ca5146" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
