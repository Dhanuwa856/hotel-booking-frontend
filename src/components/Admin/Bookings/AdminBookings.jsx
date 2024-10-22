import React, { useState } from "react";

const AdminBookings = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      _id: "1",
      booking_id: 2003,
      room_id: "Room101",
      email: "john@example.com",
      status: "confirmed",
      checkInDate: "2024-10-25",
      checkOutDate: "2024-10-30",
      guests: 2,
      reason: "Vacation",
      notes: "Prefer upper floor",
    },
    {
      _id: "2",
      booking_id: 2004,
      room_id: "Room102",
      email: "jane@example.com",
      status: "pending",
      checkInDate: "2024-11-01",
      checkOutDate: "2024-11-05",
      guests: 3,
      reason: "",
      notes: "",
    },
    {
      _id: "3",
      booking_id: 2005,
      room_id: "Room103",
      email: "mike@example.com",
      status: "cancelled",
      checkInDate: "2024-12-12",
      checkOutDate: "2024-12-15",
      guests: 1,
      reason: "Change of plans",
      notes: "Will book later",
    },
  ]);

  const [editBooking, setEditBooking] = useState(null);

  // Handle update booking (for now, we'll just update the local state)
  const handleUpdate = (id, updatedData) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === id ? updatedData : booking
      )
    );
    setEditBooking(null); // Exit edit mode
  };

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
