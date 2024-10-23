import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  // Sample booking data
  const [bookings, setBookings] = useState();
  const [editBooking, setEditBooking] = useState(null);

  // Update the API URLs
  const apiGetAllUrl = `${import.meta.env.VITE_API_URL}/booking/all`;
  const apiPutAdmin = (booking_id) =>
    `${import.meta.env.VITE_API_URL}/change/${booking_id}`;

  useEffect(() => {
    axios
      .get(apiGetAllUrl)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  // Handle update booking
  const handleUpdate = (booking_id, updatedData) => {
    console.log(booking_id, updatedData);
    axios
      .put(apiPutAdmin(booking_id), updatedData)
      .then((res) => {
        console.log("Booking updated:", res.data);
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === booking_id ? res.data : booking
          )
        );
        setEditBooking(null); // Exit edit mode after save
      })
      .catch((err) => {
        console.error("Error updating booking:", err);
      });
  };

  if (!bookings) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Admin Bookings
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Booking ID</th>
              <th className="py-3 px-6 text-left">Room ID</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Check-in Date</th>
              <th className="py-3 px-6 text-left">Check-out Date</th>
              <th className="py-3 px-6 text-left">Guests</th>
              <th className="py-3 px-6 text-left">Reason</th>
              <th className="py-3 px-6 text-left">Notes</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <td className="py-3 px-6 text-left">{booking.booking_id}</td>
                <td className="py-3 px-6 text-left">{booking.room_id}</td>
                <td className="py-3 px-6 text-left">{booking.email}</td>
                <td className="py-3 px-6 text-left">
                  {editBooking === booking._id ? (
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        setBookings((prev) =>
                          prev.map((b) =>
                            b._id === booking._id
                              ? { ...b, status: e.target.value }
                              : b
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`py-1 px-2 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">{booking.guests}</td>
                <td className="py-3 px-6 text-left">
                  {editBooking === booking._id ? (
                    <input
                      type="text"
                      value={booking.reason}
                      onChange={(e) =>
                        setBookings((prev) =>
                          prev.map((b) =>
                            b._id === booking._id
                              ? { ...b, reason: e.target.value }
                              : b
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    booking.reason || "N/A"
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editBooking === booking._id ? (
                    <input
                      type="text"
                      value={booking.notes}
                      onChange={(e) =>
                        setBookings((prev) =>
                          prev.map((b) =>
                            b._id === booking._id
                              ? { ...b, notes: e.target.value }
                              : b
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    booking.notes || "N/A"
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {editBooking === booking._id ? (
                    <button
                      onClick={() => handleUpdate(booking._id, booking)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditBooking(booking._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
