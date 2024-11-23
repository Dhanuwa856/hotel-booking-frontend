import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../NavBar/NavBar";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CustomerBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingIsLoaded, setBookingIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiURL = `${import.meta.env.VITE_API_URL}/booking/`;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setLoading(true);
    axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data.bookings);
        setBookingIsLoaded(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, [bookingIsLoaded]);

  function handleCancel(bookingId) {
    const token = localStorage.getItem("userToken");

    if (!token) {
      toast.error("You need to log in to cancel the booking.");
      return;
    }

    Swal.fire({
      title: `Are you sure you want to cancel this booking?`,
      text: `Booking ID: ${bookingId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${apiURL}cancel/${bookingId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            toast.success("Booking canceled successfully.");
            setBookingIsLoaded(false);
          })
          .catch((err) => {
            toast.error("Failed to cancel the booking. Please try again.");
          });
      }
    });
  }
  const sortedBookings = bookings.sort(
    (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <>
        <NavBar />
        <div className="mt-20 text-center">
          <p className="text-gray-600 text-xl font-semibold">
            You have not booked any rooms yet.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-gray-800 capitalize text-2xl tracking-wide font-bold text-left">
          My Bookings
        </h1>
        {sortedBookings.map((booking, idx) => (
          <div
            className="bg-white shadow-xl rounded-lg mt-8 w-[90%] lg:w-[70%] mx-auto p-6"
            key={idx}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center px-5 py-2 text-base font-semibold border-b border-gray-300">
              <span className="text-gray-700">
                <span className="font-medium">Booking ID:</span>{" "}
                {String(booking.booking_id).padStart(8, "0")}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                  booking.status === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : booking.status === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {booking.status}
              </span>
            </div>

            {/* Booking Details */}
            <div className="mt-4 px-5 flex flex-col lg:flex-row lg:justify-between lg:items-center">
              {/* Table with Responsive Wrapper */}
              <div className="w-full lg:w-[50%] overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                        Room Number
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                        Check-in
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                        Check-out
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                        Guests
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 transition duration-200 text-sm">
                      <td className="px-4 py-2 border border-gray-300 text-gray-700 whitespace-nowrap">
                        {booking.room_id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-gray-700 whitespace-nowrap">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-gray-700 whitespace-nowrap">
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-gray-700 whitespace-nowrap">
                        {booking.guests}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Special Notes */}
              <div className="mt-4 lg:mt-0 lg:ml-6 w-full lg:w-[30%]">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Special Notes
                </label>
                <p className="text-gray-500 text-[11px] bg-gray-50 rounded-lg shadow-inner p-3">
                  {booking.reason || "No special notes provided"}
                </p>
              </div>

              {/* Cancel Button */}
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <button
                  title="Cancel button"
                  onClick={() => handleCancel(booking.booking_id)}
                  className={`py-1 px-3 rounded-lg font-semibold text-sm shadow-md ${
                    booking.status === "pending"
                      ? "bg-red-500 text-white hover:bg-red-600 transition duration-200"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={booking.status !== "pending"}
                >
                  Cancel Booking
                </button>
              </div>
            </div>

            {/* Timestamp */}
            <div className="mt-4 text-right text-sm text-gray-600">
              <span>
                <strong>Booked On:</strong>{" "}
                {new Date(booking.timeStamp).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomerBookingPage;
