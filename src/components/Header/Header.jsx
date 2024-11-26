import React, { useState } from "react";
import "../Header/Header.css";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Header = () => {
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    category: "Standard",
    guests: 1,
  });

  const token = localStorage.getItem("userToken");
  const apiURL = `${import.meta.env.VITE_API_URL}/booking/`;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!token) {
      toast.error("You need to log in to make a booking.", {
        duration: 3000,
        position: "top-right",
      });
      return; // Stop further execution if not logged in
    }

    // Show SweetAlert2 confirmation popup
    const result = await Swal.fire({
      title: "Confirm Booking",
      text: "Are you sure you want to proceed with this booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return; // User canceled the action
    }

    // Proceed with booking
    try {
      const response = await axios.post(`${apiURL}quick-booking`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.data) {
        toast.success("🎉 Booking successfully created!", {
          duration: 3000,
          position: "top-right",
        });
      } else {
        toast.error(
          response.data.message ||
            "No rooms available for the selected dates and criteria.",
          {
            duration: 3000,
            position: "top-right",
          }
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No rooms available for the selected dates and criteria.", {
          duration: 3000,
          position: "top-right",
        });
      } else {
        console.error("Booking failed:", error);
        toast.error("An error occurred while booking. Please try again.", {
          duration: 3000,
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="bg-[#E3F2FD] w-full h-screen">
      <div className="header w-full h-full bg-no-repeat bg-cover relative">
        <div className="header-bg-filter w-full h-full absolute bg-[#3278aa] opacity-[30%] left-0 top-0"></div>

        <div className="absolute input-area backdrop-blur-lg w-full sm:w-[50%] md:w-[40%] lg:w-[30%] mt-[25px] left-1/2 -translate-x-1/2 rounded-lg px-[20px] sm:px-[40px] md:px-[50px] py-[30px] shadow-2xl">
          <h2 className="text-3xl font-bold text-[#021c2e] mb-4 capitalize text-center sm:text-left">
            Book Your Stay
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="block mt-5">
              <span className="text-md font-medium text-[#021c2e] capitalize">
                Check-in Date:
              </span>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className="w-full h-[50px] rounded-lg pl-3 pr-3 outline-0 text-[#607D8B] uppercase"
                required
              />
            </div>

            <div className="block mt-5">
              <span className="text-md font-medium text-[#021c2e] capitalize">
                Check-out Date:
              </span>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                className="w-full h-[50px] rounded-lg pl-3 pr-3 outline-0 text-[#607D8B] uppercase"
                required
              />
            </div>

            <div className="block mt-5">
              <span className="text-md font-medium text-[#021c2e] capitalize">
                Room Category:
              </span>
              <select
                name="roomCategory"
                value={formData.roomCategory}
                onChange={handleChange}
                className="w-full h-[50px] rounded-lg pl-3 pr-3 outline-0 text-[#607D8B] uppercase"
              >
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div className="block mt-5">
              <span className="text-md font-medium text-[#021c2e] capitalize">
                Number of Guests:
              </span>
              <input
                type="number"
                name="guests"
                min="1"
                max="4" // Adjust this maximum as per room capacity
                value={formData.guests}
                onChange={handleChange}
                className="w-full h-[50px] rounded-lg pl-3 pr-3 outline-0 text-[#607D8B] uppercase"
                placeholder="Enter number of guests"
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 text-white font-medium text-lg bg-[#FF6F61] w-full h-[50px] justify-center rounded-lg mt-5 hover:bg-[#ca5146] capitalize"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
