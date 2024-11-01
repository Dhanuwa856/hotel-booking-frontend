import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import decodeToken from "../../decodeToken";

export const AdminHeader = () => {
  const [admin, setAdmin] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      try {
        const decodedToken = decodeToken(token); // Decoding base64 payload
        setAdmin(decodedToken); // Save decoded user info in state
        console.log(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
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
      setAdmin(null);
      setLogoutMessage(true); // Show the logout message
      navigate("/"); // Redirect to home after logout

      // Hide the message after 3 seconds
      setTimeout(() => {
        setLogoutMessage(false);
      }, 3000);
    }
    // If the user cancels, do nothing and stay on the same page
  };

  return (
    <header className="bg-[#E3F2FD] flex items-center justify-between px-10 py-3 shadow-xl">
      <div className="flex items-center gap-5">
        <img src="https://placehold.co/50x50" alt="Hotel Logo" />
        <h2 className="text-2xl capitalize font-bold text-[#607D8B]">
          Admin Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-5">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search..."
          className="bg-transparent w-64 p-1 rounded-md  border-solid border-[#607D8B] border-2  outline-none	"
        />
        <button className="h-10 w-10 hover:bg-[#ddd] flex items-center justify-center rounded-lg hover:text-white">
          <FaRegBell />
        </button>
        {admin && (
          <>
            {" "}
            <img
              src={admin.image}
              alt="admin image"
              className="w-[45px] h-[45px] rounded-full cursor-pointer object-cover object-center"
            />
            <button
              onClick={handleLogout}
              className="text-red-600 font-medium ml-4 hover:underline text-xl"
            >
              <MdLogout />
            </button>
          </>
        )}
        {logoutMessage && (
          <div className="fixed bottom-10 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg z-[100]">
            You have been logged out successfully.
          </div>
        )}
      </div>
    </header>
  );
};
