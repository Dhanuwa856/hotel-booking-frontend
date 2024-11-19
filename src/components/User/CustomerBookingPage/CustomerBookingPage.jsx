import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../NavBar/NavBar";
import toast from "react-hot-toast";

const CustomerBookingPage = () => {
  const [bookings, setBookings] = useState(null);
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

    const confirmCancel = window.confirm(
      `Are you sure you want to cancel the booking "${bookingId}"?`
    );

    if (confirmCancel) {
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
          toast.success("Booking Canceld successfully");
          setBookingIsLoaded(false);
        })
        .catch((err) => {
          toast.error("Failed to cancel the booking. Please try again.");
        });
    }
  }

  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-gray-100">
  //       <div className="flex items-center space-x-2">
  //         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  //         <p className="text-lg font-semibold text-gray-700">Loading...</p>
  //       </div>
  //     </div>
  //   );

  if (!bookings || bookings.length === 0) {
    return (
      <>
        <NavBar />
        <div className="text-red-500 mt-5 text-lg max-w-5xl mx-auto">
          You have not booked a room yet.
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Booking Details
        </h2>
        <div className="overflow-x-auto w-full max-w-[90%]">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Booking ID</th>
                <th className="py-3 px-6 text-left">Room ID</th>
                <th className="py-3 px-6 text-left">Check-in Date</th>
                <th className="py-3 px-6 text-left">Check-out Date</th>
                <th className="py-3 px-6 text-left">guests</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Timestamp</th>
                <th className="py-3 px-6 text-left">Notes</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={idx}
                >
                  <td className="py-3 px-6 text-left">{booking.booking_id}</td>
                  <td className="py-3 px-6 text-left">{booking.room_id}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">{booking.guests}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`font-semibold text-sm  ${
                        booking.status === "cancelled"
                          ? "text-red-500 bg-red-100 p-1 rounded-lg"
                          : booking.status === "confirmed"
                          ? "text-green-500 bg-green-100 p-1 rounded-lg"
                          : "text-yellow-500 bg-yellow-100 p-1 rounded-lg"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(booking.timeStamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-left">{booking.notes}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => {
                        handleCancel(booking.booking_id);
                      }}
                      className={`font-bold py-2 px-4 rounded ${
                        booking.status === "pending"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white`}
                      disabled={booking.status !== "pending"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerBookingPage;
