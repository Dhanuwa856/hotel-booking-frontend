import React, { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./UserBookingPage.css";

function UserBookingPage() {
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState(location.state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const apiURL = `${import.meta.env.VITE_API_URL}/booking/`;

  const [formData, setFormData] = useState({
    room_id: roomDetails.roomNumber,
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(apiURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Handle success response
      if (response.status === 201) {
        setFormData({
          checkInDate: "", // Clear fields as needed
          checkOutDate: "",
          guests: 1,
        });
        toast.success("Booking confirmed successfully!");
        navigate("/rooms");
      }
    } catch (err) {
      // Capture and show the error message from backend
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar />
      <div className="book-bg w-full h-[125px] bg-cover bg-center relative flex items-center justify-center">
        <div className="header-bg-filter w-full h-full absolute bg-[#469ad6] opacity-[50%] left-0 top-0"></div>
        <h1 className="text-4xl text-white z-10 font-bold whitespace-pre-line tracking-[.2rem] capitalize">
          {roomDetails.category} Room
        </h1>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Room Details Section */}
          <div className="lg:w-1/2">
            {/* Room Photos */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {roomDetails.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Room ${index + 1}`}
                  className="rounded-lg shadow-lg w-full"
                />
              ))}
            </div>
            {/* Room Information */}
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                {roomDetails.category} Room
              </h2>
              <p className="text-gray-600">{roomDetails.description}</p>
              <p className="text-xl font-medium text-blue-500">
                Price: ${roomDetails.price} / night
              </p>
              <p className="text-sm text-gray-600">
                Max Guests: {roomDetails.maxGuests}
              </p>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:w-1/2">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Book This Room
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Check-in Date */}
              <div>
                <label
                  htmlFor="checkInDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Check-In Date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  onChange={handleChange}
                  value={formData.checkInDate}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label
                  htmlFor="checkOutDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Check-Out Date
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  onChange={handleChange}
                  value={formData.checkOutDate}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  placeholder="Number of Guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max={roomDetails.maxGuests}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Confirm Booking Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserBookingPage;
