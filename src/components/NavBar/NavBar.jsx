import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "../NavLink/NavLink";
import { MdLogout } from "react-icons/md";

function NavBar() {
  const [user, setUser] = useState(null);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false); // State for showing logout toast
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user token exists in localStorage
    const token = localStorage.getItem("userToken");

    if (token) {
      // Decode token to get user information (Assuming JWT format)
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser(userData);

      // Redirect based on user type
      if (userData.type === "admin") {
        navigate("/admin"); // Redirect admin to admin panel
      } else {
        navigate("/"); // Redirect customer to home page
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    // Ask for logout confirmation
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      localStorage.removeItem("userToken"); // Remove token on logout
      setUser(null);
      setShowLogoutMessage(true); // Show the logout message
      navigate("/"); // Redirect to home after logout

      // Hide the message after 3 seconds
      setTimeout(() => {
        setShowLogoutMessage(false);
      }, 3000);
    }
    // If the user cancels, do nothing and stay on the same page
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
          <NavLinks link_url="/contact" link_name="Contact" />
          <NavLinks link_url="/about-us" link_name="About Us" />
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            // Show user info if logged in
            <>
              <img
                src={user.image}
                alt="User Image"
                className="w-[45px] h-[45px] rounded-full cursor-pointer object-cover object-center "
              />
              <span className="text-[#607D8B] text-lg font-medium cursor-pointer hover:text-[#FF6F61] delay-75 capitalize">
                {user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 font-medium ml-4 hover:underline text-xl"
              >
                <MdLogout />
              </button>
            </>
          ) : (
            // Show Login/Sign Up if not logged in
            <>
              <Link
                to="/login"
                className="text-[#607D8B] text-lg font-medium cursor-pointer hover:text-[#FF6F61] delay-75"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#607D8B] text-lg font-medium cursor-pointer hover:text-[#FF6F61] delay-75"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Toast notification for logout */}
      {showLogoutMessage && (
        <div className="fixed bottom-10 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg z-[100]">
          You have been logged out successfully.
        </div>
      )}
    </div>
  );
}

export default NavBar;
